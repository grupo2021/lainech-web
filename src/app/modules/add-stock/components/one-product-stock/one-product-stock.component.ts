import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { min, Subscription } from 'rxjs';
import { ProductStock } from 'src/app/models/add-stock';
import {
  addProduct,
  decrementProduct,
  incrementProduct,
} from 'src/app/state/actions/add-stock.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-one-product-stock',
  templateUrl: './one-product-stock.component.html',
  styleUrls: ['./one-product-stock.component.scss'],
})
export class OneProductStockComponent implements OnInit, OnDestroy {
  @Input() product!: ProductStock;

  public cantInput = new FormControl(3, [
    Validators.required,
    Validators.min(1),
    Validators.max(9999),
  ]);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public increment() {
    this.store.dispatch(incrementProduct({ productStock: this.product }));
  }

  public decrement() {
    this.store.dispatch(decrementProduct({ productStock: this.product }));
  }
}
