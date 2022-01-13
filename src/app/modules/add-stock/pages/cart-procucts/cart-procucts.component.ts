import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { ProductStock } from 'src/app/models/add-stock';
import { Reload } from 'src/app/models/reload.model';
import { ReloadService } from 'src/app/services/reload.service';
import { cleanstock } from 'src/app/state/actions/add-stock.action';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-cart-procucts',
  templateUrl: './cart-procucts.component.html',
  styleUrls: ['./cart-procucts.component.scss'],
})
export class CartProcuctsComponent implements OnInit, OnDestroy {
  public productsStock: ProductStock[] = [];
  public cant = 0;
  public total = 0;

  private productStockSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private reloadService: ReloadService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productStockSubs = this.store
      .select('productStock')
      .subscribe(({ products, cant, total }) => {
        this.productsStock = products;
        this.cant = cant;
        this.total = total;
      });
  }

  ngOnDestroy(): void {
    this.productStockSubs?.unsubscribe();
  }

  public sendRequest() {
    if (!this.productsStock.length) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Oops',
          content:
            'Tienes que tener al menos 1 producto en tu lista de recargas...',
        },
      });
      return;
    }
    const confirm = this.matDialog.open(ConfirmDialogComponent, {
      data: { content: '¿Está seguro de hacer esta recarga?' },
    });

    confirm.afterClosed().subscribe((res) => {
      if (res) {
        const details = JSON.stringify(
          this.productsStock.map((p) => ({
            productId: p.id,
            cant: p.cant,
            subtotal: p.subtotal,
          }))
        );

        this.store.dispatch(initLoading());
        this.reloadService.create(this.total, details).subscribe({
          next: (res) => this.handledSuccess(res),
          error: (error) => this.handledError(error),
        });
      }
    });
  }

  private handledSuccess(reload: Reload) {
    this.store.dispatch(stopLoading());
    this.store.dispatch(cleanstock());
    this.router.navigate(['/reload']).then(() =>
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Recarga enviada',
          content: 'Espera a que el administrador aprueve tu solicitud',
          icon: 'info',
        },
      })
    );
  }
  private handledError(error: any) {
    console.log(error);
    this.store.dispatch(stopLoading());
    this.matDialog.open(AlertComponent, {
      data: {
        title: 'No se completo la solicitud',
        content:
          'Ocurrio un error al mandar la solicitud de recarga, intente de nuevo.',
      },
    });
  }
}
