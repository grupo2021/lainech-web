import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PreSell } from 'src/app/models/pre-sell.model';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { addPreSell } from 'src/app/state/actions/sell.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent implements OnInit {
  @Input() product!: PromotorProduct;

  cantInput = new FormControl(6, [
    Validators.required,
    Validators.min(1),
    Validators.max(99999),
  ]);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addPreSell() {
    if (this.cantInput.valid) {
      this.store.dispatch(
        addPreSell({
          preSell: PreSell.fromPromotorProduct(
            this.product,
            this.cantInput.value
          ),
        })
      );
    }
  }
}
