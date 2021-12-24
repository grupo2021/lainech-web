import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { Lote } from 'src/app/models/lote.model';
import { Product } from 'src/app/models/product.model';
import { LoteService } from 'src/app/services/lote.service';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-lotes-edit',
  templateUrl: './product-lotes-edit.component.html',
  styleUrls: ['./product-lotes-edit.component.scss'],
})
export class ProductLotesEditComponent implements OnInit, OnDestroy {
  public product!: Product | null;
  private productSubs!: Subscription;

  public lote!: Lote;
  private loteSubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private loteService: LoteService
  ) {}

  ngOnInit(): void {
    this.productSubs = this.store.select('product').subscribe(({ product }) => {
      this.product = product;
    });
    this.loteSubs = this.route.params
      .pipe(switchMap(({ id }) => this.loteService.getOne(id)))
      .subscribe((res) => {
        this.lote = res;
      });
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
    this.loteSubs?.unsubscribe();
  }
}
