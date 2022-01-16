import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { ReturnsService } from 'src/app/services/returns.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-returns-product',
  templateUrl: './returns-product.component.html',
  styleUrls: ['./returns-product.component.scss'],
})
export class ReturnsProductComponent implements OnInit {
  @Input() product!: PromotorProduct;

  descriptionInput = new FormControl('', Validators.required);

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog,
    private returnsService: ReturnsService
  ) {}

  ngOnInit(): void {}

  public returns() {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { content: '¿Está seguro de devolver este producto?' },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(initLoading());
        const cant = this.product.cant - this.product.cant_out;
        this.returnsService
          .create(cant, this.product.id, this.descriptionInput.value)
          .subscribe({
            next: (res) => {
              this.product = res.promotorProduct;
              this.store.dispatch(stopLoading());
            },
            error: (e) => {
              this.store.dispatch(stopLoading());
              this.matDialog.open(AlertComponent, {
                data: { title: 'Oops', content: 'Por favor intente de nuevo!' },
              });
            },
          });
      }
    });
  }
}
