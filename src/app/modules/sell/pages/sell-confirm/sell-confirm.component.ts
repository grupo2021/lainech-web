import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { PreSell } from 'src/app/models/pre-sell.model';
import { ClientService } from 'src/app/services/client.service';
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
    private clientService: ClientService
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
      precioUnitario: p.price,
      cant: p.cant,
      subtotal: p.subtotal,
    }));

    console.log({
      date: new Date().toISOString(),
      total: this.total,
      clientId: this.clientSelect.value,
      details,
    });
  }
}
