import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PreSell } from 'src/app/models/pre-sell.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sell-cart',
  templateUrl: './sell-cart.component.html',
  styleUrls: ['./sell-cart.component.scss'],
})
export class SellCartComponent implements OnInit, OnDestroy {
  public products: PreSell[] = [];
  private productSubs!: Subscription;
  public total = 0;
  public cant = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productSubs = this.store
      .select('sell')
      .subscribe(({ preSells, total, cant }) => {
        this.products = preSells;
        this.total = total;
        this.cant = cant;
      });
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
  }
}
