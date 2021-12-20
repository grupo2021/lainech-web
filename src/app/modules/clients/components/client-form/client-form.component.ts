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
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() client!: Client;

  public phonePattern = '';

  public form!: FormGroup;

  newPhone: FormControl;

  get phones() {
    return this.form.get('phones') as FormArray;
  }

  get isEditing() {
    return !!this.client;
  }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private clientService: ClientService,
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
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(initLoading());

    if (this.isEditing) this.update();
    else this.create();
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
      name: [this.client ? this.client.name : '', Validators.required],
      surname: [this.client ? this.client.surname : '', Validators.required],
      address: [this.client ? this.client.address : '', Validators.required],
      phones: this.fb.array(
        this.client
          ? this.createFormControls(JSON.parse(this.client.phones))
          : [],
        Validators.required
      ),
    });
  }

  private createFormControls(phones: number[]) {
    return phones.map((p) => [p, [Validators.pattern(this.phonePattern)]]);
  }

  private create() {
    const { name, surname, address, phones } = this.form.value;
    this.clientService.create(name, surname, address, phones).subscribe({
      next: (client) => {
        this.router.navigate(['clients', client.id, 'view']);
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
  private update() {
    const { name, surname, address, phones } = this.form.value;
    this.clientService
      .update(this.client.id, name, surname, address, phones)
      .subscribe({
        next: (client) => {
          this.router.navigate(['clients', client.id, 'view']);
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
}
