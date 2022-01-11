import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import { Client } from 'src/app/models/client.model';
import { PreSell } from 'src/app/models/pre-sell.model';
import { ClientService } from 'src/app/services/client.service';
import { SaleService } from 'src/app/services/sale.service';
import { cleanPreSell } from 'src/app/state/actions/sell.action';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sell-confirm',
  templateUrl: './sell-confirm.component.html',
  styleUrls: ['./sell-confirm.component.scss'],
})
export class SellConfirmComponent implements OnInit, OnDestroy {
  public preSells: PreSell[] = [];
  public total = 0;
  public cant = 0;
  private preSellsSubs!: Subscription;

  public clients: Client[] = [];
  public clientSubs!: Subscription;

  public clientSelect = new FormControl('', Validators.required);

  constructor(
    private store: Store<AppState>,
    private clientService: ClientService,
    private saleService: SaleService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.preSellsSubs = this.store
      .select('sell')
      .subscribe(({ preSells, cant, total }) => {
        this.preSells = preSells;
        this.cant = cant;
        this.total = total;
      });

    this.clientSubs = this.clientService
      .findAllWithoutPagination()
      .subscribe((res) => {
        this.store.dispatch(stopLoading());
        this.clients = res;
      });
  }

  ngOnDestroy(): void {
    this.preSellsSubs?.unsubscribe();
  }

  confirm() {
    if (this.clientSelect.invalid) {
      this.clientSelect.markAllAsTouched();
      return;
    }
    const details = this.preSells.map((p) => ({
      promotorProductId: p.id,
      unitPrice: p.price,
      cant: p.cant,
      subtotal: p.subtotal,
    }));

    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { content: 'Usted esta generando una venta, esta seguro?' },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(initLoading());
        this.saleService
          .create(this.total, this.clientSelect.value, JSON.stringify(details))
          .subscribe({
            next: (res) => this.handledSuccess(res),
            error: (e) => this.handledError(e),
          });
      }
    });
  }

  private handledSuccess(res: any) {
    this.store.dispatch(stopLoading());
    this.store.dispatch(cleanPreSell());
    this.router.navigate(['/sales']);
  }

  private handledError(e: any) {
    this.store.dispatch(stopLoading());
    this.matDialog.open(AlertComponent, {
      data: { title: 'Error', content: 'Intente de nuevo' },
    });
  }
}
