import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductStock } from 'src/app/models/add-stock';
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

  constructor(private store: Store<AppState>) {}

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
    console.log(this.total);
    console.log(new Date().toISOString());
    console.log(
      this.productsStock.map((p) => ({
        productId: p.id,
        cant: p.cant,
        subtotal: p.subtotal,
      }))
    );
  }
}
