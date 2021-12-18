import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() categories: Category[] = [];
  public form!: FormGroup;
  private productSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private productService: ProductService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(initLoading());

    if (this.product) this.update();
    else this.create();
  }

  private create() {
    const {
      name,
      code,
      description,
      basePrice,
      salePrice,
      stock,
      categoryId,
      image,
    } = this.form.value;

    this.productSubs = this.productService
      .create(
        name,
        code,
        description,
        basePrice,
        salePrice,
        stock,
        categoryId,
        image
      )
      .subscribe({
        next: (res) => {
          this.form.reset();
          this.store.dispatch(stopLoading());
          this.router.navigate(['products', res.id, 'view']);
        },
        error: (error) => {
          this.store.dispatch(stopLoading());
          this.matDialog.open(AlertComponent, {
            data: {
              title: 'No se creo este producto',
              content:
                'Por favor intente de nuevo. Uno de los errores comunes es reptir el codigo de producto, por favor reviselo',
            },
          });
        },
      });
  }
  private update() {
    const {
      name,
      code,
      description,
      basePrice,
      salePrice,
      stock,
      categoryId,
      image,
    } = this.form.value;

    this.productSubs = this.productService
      .update(
        this.product.id,
        name,
        code,
        description,
        basePrice,
        salePrice,
        stock,
        categoryId,
        image
      )
      .subscribe({
        next: (res) => {
          this.form.reset();
          this.store.dispatch(stopLoading());
          this.router.navigate(['products', res.id, 'view']);
        },
        error: (error) => {
          this.store.dispatch(stopLoading());
          this.matDialog.open(AlertComponent, {
            data: {
              title: 'No se creo este producto',
              content:
                'Por favor intente de nuevo. Uno de los errores comunes es reptir el codigo de producto, por favor reviselo',
            },
          });
        },
      });
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.product ? this.product.name : '', [Validators.required]],
      code: [this.product ? this.product.code : '', [Validators.required]],
      description: [
        this.product ? this.product.description : '',
        [Validators.required],
      ],
      basePrice: [
        this.product ? this.product.basePrice : 0,
        [Validators.required],
      ],
      salePrice: [
        this.product ? this.product.salePrice : 0,
        [Validators.required],
      ],
      stock: [this.product ? this.product.stock : 100, [Validators.required]],
      image: [this.product ? this.product.image : null, [Validators.required]],
      categoryId: [
        this.product ? this.product.category.id : this.categories[0].id,
        [Validators.required],
      ],
    });
  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  get imageError(): string {
    const errors = this.form.get('image')!.errors;
    if (errors!['required']) {
      return 'La imagen es obligatoria';
    } else if (errors!['minlength']) {
      return 'Nombre debe tener minimo 2 carateres';
    }
    return '';
  }
}
