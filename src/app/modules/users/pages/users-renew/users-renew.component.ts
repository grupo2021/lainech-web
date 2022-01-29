import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-users-renew',
  templateUrl: './users-renew.component.html',
  styleUrls: ['./users-renew.component.scss'],
})
export class UsersRenewComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  public user!: User;
  private userSubs!: Subscription;

  public hidePassword = true;
  public hideConfirmation = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private validatorService: ValidatorService,
    private router: Router,
    private store: Store<AppState>,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store.dispatch(initLoading());
    this.route.params
      .pipe(switchMap(({ id }) => this.userService.getOne(id)))
      .subscribe((res) => {
        this.store.dispatch(stopLoading());
        this.user = res;
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { password } = this.form.value;

    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        content: '¿Está seguro de cambiar la contraseña de este usuario?',
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(initLoading());
        this.userService.changePass(password, this.user.id).subscribe({
          next: (res) => {
            this.store.dispatch(stopLoading());
            this.form.reset();
            this.router.navigate(['users', this.user.id, 'view']).then(() => {
              this.matDialog.open(AlertComponent, {
                data: {
                  title: 'Exito!',
                  content: 'Se cambio la contraseña correctamente!',
                },
              });
            });
          },
          error: (e) => {
            this.store.dispatch(stopLoading());
            this.form.reset();
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Oops!',
                content: 'No se pudo cambiar la contraseña...',
              },
            });
          },
        });
      }
    });
  }

  private createForm() {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmation: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [
          this.validatorService.sameFields('password', 'confirmation'),
        ],
      }
    );
  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  get passwordError(): string {
    const errors = this.form.get('password')!.errors;
    if (errors!['required']) {
      return 'Contraseña obligatoria';
    } else if (errors!['minlength']) {
      return 'Contraseña debe tener minimo 6 carateres';
    }
    return '';
  }

  get confirmationError(): string {
    const errors = this.form.get('confirmation')!.errors;
    if (errors!['required']) {
      return 'Contraseña obligatoria';
    } else if (errors!['noSame']) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
