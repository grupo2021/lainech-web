import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss'],
})
export class UsersNewComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private emailPattern = '';

  public roles: Role[] = [];
  private rolesSubs!: Subscription;
  private userSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private roleService: RoleService,
    private store: Store<AppState>,
    private userService: UserService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.emailPattern = this.validatorService.emailPattern;
  }

  ngOnInit(): void {
    this.createForm();
    this.rolesSubs = this.roleService
      .getAll()
      .subscribe((roles) => (this.roles = roles));
  }

  ngOnDestroy(): void {
    this.rolesSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { name, email, roleId, password } = this.form.value;
    this.store.dispatch(initLoading());
    this.userSubs = this.userService
      .create(name, email, roleId, password)
      .subscribe({
        next: (user) => this.handledSuccess(user),
        error: () => this.handledError(),
      });
  }

  private handledSuccess(user: User) {
    this.form.reset();
    this.store.dispatch(stopLoading());
    this.router.navigate(['users', user.id, 'edit']);
  }

  private handledError() {
    this.store.dispatch(stopLoading());
    this.matDialog.open(AlertComponent, {
      data: {
        title: 'No se creo el registro',
        content:
          'Intente nuevamente, si el error persiste contacte con el administrador. Un error comun es que ya existe el email registrado.',
      },
    });
  }

  private createForm() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        roleId: [this.roles.length ? this.roles[0] : '', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [this.validatorService.sameFields('password', 'password2')],
      }
    );
  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  get nameError(): string {
    const errors = this.form.get('name')!.errors;
    if (errors!['required']) {
      return 'Nombre es obligatorio';
    } else if (errors!['minlength']) {
      return 'Nombre debe tener minimo 2 carateres';
    }
    return '';
  }

  get emailError(): string {
    const errors = this.form.get('email')!.errors;
    if (errors!['required']) {
      return 'Email es obligatorio';
    } else if (errors!['pattern']) {
      return 'Email debe ser valido';
    } else if (errors!['emailTaken']) {
      return 'Email ya esta tomado';
    }
    return '';
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
    const errors = this.form.get('password2')!.errors;
    if (errors!['required']) {
      return 'Contraseña obligatoria';
    } else if (errors!['noSame']) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
