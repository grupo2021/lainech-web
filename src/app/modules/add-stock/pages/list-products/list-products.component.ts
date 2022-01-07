import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  private productsSubs!: Subscription;

  public cant = 0;
  private productsStockSubs!: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.productsSubs = this.productService
      .getAllWithoutPagination()
      .subscribe((res) => {
        this.products = res;
        this.store.dispatch(stopLoading());
      });

    this.productsStockSubs = this.store
      .select('productStock')
      .subscribe(({ cant }) => (this.cant = cant));
  }

  ngOnDestroy(): void {
    this.productsSubs?.unsubscribe();
    this.productsStockSubs?.unsubscribe();
  }
}
