import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductStock } from 'src/app/models/add-stock';
import { Product } from 'src/app/models/product.model';
import { addProduct } from 'src/app/state/actions/add-stock.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss'],
})
export class OneProductComponent implements OnInit {
  @Input() product!: Product;

  cantInput = new FormControl(3, [Validators.required]);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addProduct() {
    this.store.dispatch(
      addProduct({
        productStock: ProductStock.fromProduct(
          this.product,
          this.cantInput.value
        ),
      })
    );
  }
}
