import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreSell } from 'src/app/models/pre-sell.model';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import {
  decrementPreSell,
  incrementPreSell,
} from 'src/app/state/actions/sell.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sell-cart-product',
  templateUrl: './sell-cart-product.component.html',
  styleUrls: ['./sell-cart-product.component.scss'],
})
export class SellCartProductComponent implements OnInit {
  @Input() product!: PreSell;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  public increment() {
    this.store.dispatch(incrementPreSell({ preSell: this.product }));
  }

  public decrement() {
    this.store.dispatch(decrementPreSell({ preSell: this.product }));
  }
}
