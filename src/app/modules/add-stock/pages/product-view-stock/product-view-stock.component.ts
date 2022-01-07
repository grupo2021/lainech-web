import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscriber, Subscription, switchMap } from 'rxjs';
import { ProductStock } from 'src/app/models/add-stock';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {
  addProduct,
  removeProduct,
} from 'src/app/state/actions/add-stock.action';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-view-stock',
  templateUrl: './product-view-stock.component.html',
  styleUrls: ['./product-view-stock.component.scss'],
})
export class ProductViewStockComponent implements OnInit, OnDestroy {
  public product!: Product;

  private productSubs!: Subscription;

  public cantInput = new FormControl(3, [
    Validators.required,
    Validators.min(1),
    Validators.max(9999),
  ]);

  public cant = 0;
  private productsStockSubs!: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.route.params
      .pipe(switchMap(({ id }) => this.productService.getOne(id)))
      .subscribe((product) => {
        this.product = product;
        this.store.dispatch(stopLoading());
      });

    this.productsStockSubs = this.store
      .select('productStock')
      .subscribe(({ cant }) => {
        this.cant = cant;
      });
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
    this.productsStockSubs?.unsubscribe();
  }

  public addProduct() {
    this.store.dispatch(
      addProduct({
        productStock: ProductStock.fromProduct(
          this.product,
          this.cantInput.value
        ),
      })
    );
  }

  public removeProduct() {
    console.log('asdfa');
    this.store.dispatch(
      removeProduct({ productStock: ProductStock.fromProduct(this.product, 0) })
    );
  }
}
