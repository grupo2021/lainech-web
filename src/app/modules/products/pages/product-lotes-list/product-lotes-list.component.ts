import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Lote } from 'src/app/models/lote.model';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-lotes-list',
  templateUrl: './product-lotes-list.component.html',
  styleUrls: ['./product-lotes-list.component.scss'],
})
export class ProductLotesListComponent implements OnInit, OnDestroy {
  public product!: Product | null;
  private productSubs!: Subscription;
  displayedColumns = ['code', 'cant', 'price', 'register', 'expiry'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productSubs = this.store.select('product').subscribe(({ product }) => {
      this.product = product;
    });
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
  }
}
