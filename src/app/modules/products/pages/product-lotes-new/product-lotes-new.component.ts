import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-lotes-new',
  templateUrl: './product-lotes-new.component.html',
  styleUrls: ['./product-lotes-new.component.scss'],
})
export class ProductLotesNewComponent implements OnInit, OnDestroy {
  public product!: Product | null;
  private productSubs!: Subscription;

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
