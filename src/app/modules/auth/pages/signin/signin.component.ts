import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { setUser } from 'src/app/state/actions/auth.action';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;

  private userSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }

  public signin() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.store.dispatch(initLoading());
    this.userSubs = this.authService.signin(email, password).subscribe({
      next: (res) => this.handledSuccess(res.user, res.accessToken),
      error: (error) => this.handledError(error),
    });
  }

  private handledSuccess(user: User, access_token: string) {
    this.store.dispatch(setUser({ user, access_token }));
    this.store.dispatch(stopLoading());
    this.router.navigate(['/products']).then(() => this.form.reset());
  }
  private handledError(error: any) {
    this.form.get('password')?.setValue('');
    this.store.dispatch(stopLoading());
    this.dialog.open(AlertComponent, {
      data: {
        title: 'Error al iniciar sesión',
        content: 'Por favor revisa tus credenciales.',
      },
    });
  }
  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
