import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { Lote } from 'src/app/models/lote.model';
import { Product } from 'src/app/models/product.model';
import { LoteService } from 'src/app/services/lote.service';
import { addLote, updateLote } from 'src/app/state/actions/product.action';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-lote-form',
  templateUrl: './product-lote-form.component.html',
  styleUrls: ['./product-lote-form.component.scss'],
})
export class ProductLoteFormComponent implements OnInit, OnDestroy {
  @Input() lote!: Lote;

  public form!: FormGroup;

  private product!: Product | null;
  private productSubs!: Subscription;

  get isEditing() {
    return !!this.lote;
  }

  constructor(
    private fb: FormBuilder,
    private loteService: LoteService,
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.productSubs = this.store.select('product').subscribe(({ product }) => {
      this.product = product;
    });
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
    if (this.isEditing) this.update();
    else this.create();
  }

  private create() {
    const { code, cant, price, register, expiry } = this.form.value;
    this.loteService
      .create(this.product!.id, code, cant, price, register, expiry)
      .subscribe({
        next: (lote) => this.handledSaveSuccess(lote),
        error: (e) => this.handledError(e),
      });
  }

  private update() {
    const { code, cant, price, register, expiry } = this.form.value;
    this.loteService
      .update(this.lote.id, code, cant, price, register, expiry)
      .subscribe({
        next: (lote) => this.handledSaveSuccess(lote),
        error: (e) => this.handledError(e),
      });
  }

  private handledSaveSuccess(lote: Lote) {
    this.store.dispatch(stopLoading());
    if (this.isEditing) this.store.dispatch(updateLote({ lote }));
    else this.store.dispatch(addLote({ lote }));

    this.router.navigate(['/products', this.product!.id, 'view']);
  }

  private handledError(e: any) {
    this.store.dispatch(stopLoading());
    this.matDialog.open(AlertComponent, {
      data: {
        title: 'Error al guardar el registro',
        content:
          'Intentelo de nuevo, si el problema persiste contacte con el administrador',
      },
    });
  }

  private createForm() {
    this.form = this.fb.group({
      code: [this.lote ? this.lote.code : '', [Validators.required]],
      cant: [
        this.lote ? this.lote.cant : '',
        [Validators.required, Validators.min(1), Validators.max(999999)],
      ],
      price: [
        this.lote ? this.lote.price : 1,
        [Validators.required, Validators.min(1), Validators.max(9999999)],
      ],
      register: [
        this.lote ? this.lote.register : new Date(),
        [Validators.required],
      ],
      expiry: [
        this.lote ? this.lote.expiry : new Date(),
        [Validators.required],
      ],
    });
  }
}
