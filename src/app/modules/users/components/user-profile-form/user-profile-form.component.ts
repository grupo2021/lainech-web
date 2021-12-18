import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnInit {
  @Input() user!: User;

  public phonePattern = '';

  public form!: FormGroup;

  newPhone: FormControl;

  get phones() {
    return this.form.get('phones') as FormArray;
  }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private profileService: ProfileService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.phonePattern = this.validatorService.phonePattern;
    this.newPhone = this.fb.control('', [
      Validators.required,
      Validators.pattern(this.phonePattern),
    ]);
  }

  ngOnInit(): void {
    this.createForm();
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { name, surname, address, phones, identificationNumber, photo } =
      this.form.value;
    this.store.dispatch(initLoading());
    this.profileService
      .update(
        this.user.id,
        name,
        surname,
        address,
        identificationNumber,
        phones,
        photo
      )
      .subscribe({
        next: (user) => {
          this.router.navigate(['users', user.id, 'view']);
          this.store.dispatch(stopLoading());
        },
        error: (error) => {
          this.store.dispatch(stopLoading());
          console.warn(error);
          this.matDialog.open(AlertComponent, {
            data: {
              title: 'Error al guardar los datos',
              content:
                'Intente de nuevo, si el problema persiste comuniquese con el administrador',
            },
          });
        },
      });
  }

  public addPhone() {
    if (this.newPhone.invalid) {
      return;
    }
    this.phones.push(
      this.fb.control(this.newPhone.value, [
        Validators.pattern(this.phonePattern),
      ])
    );

    this.newPhone.reset();
  }

  public removePhone(index: number) {
    this.phones.removeAt(index);
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.user.profile.name, Validators.required],
      surname: [this.user.profile.surname],
      address: [this.user.profile.address],
      identificationNumber: [this.user.profile.identificationNumber],
      phones: this.fb.array(
        this.user.profile.phones
          ? this.createFormControls(JSON.parse(this.user.profile.phones))
          : [],
        Validators.required
      ),
      photo: [this.user.profile.photo],
    });
  }

  private createFormControls(phones: number[]) {
    return phones.map((p) => [p, [Validators.pattern(this.phonePattern)]]);
  }
}
