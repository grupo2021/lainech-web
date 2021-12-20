import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  @Input() category!: Category;

  public form!: FormGroup;

  get isEditing() {
    return !!this.category;
  }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(initLoading());

    if (this.isEditing) this.update();
    else this.create();
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.category ? this.category.name : '', Validators.required],
      code: [this.category ? this.category.code : '', Validators.required],
      description: [
        this.category ? this.category.description : '',
        Validators.required,
      ],
    });
  }

  private create() {
    const { name, code, description } = this.form.value;
    this.categoryService.create(name, code, description).subscribe({
      next: (category) => {
        this.router.navigate(['categories', category.id, 'view']);
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
    const { name, code, description } = this.form.value;
    this.categoryService
      .update(this.category.id, name, code, description)
      .subscribe({
        next: (category) => {
          this.router.navigate(['categories', category.id, 'view']);
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
