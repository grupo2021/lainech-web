import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { PromotorProductService } from 'src/app/services/promotor-product.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sell-list',
  templateUrl: './sell-list.component.html',
  styleUrls: ['./sell-list.component.scss'],
})
export class SellListComponent implements OnInit, OnDestroy {
  public products: PromotorProduct[] = [];
  private productsSubs!: Subscription;

  public total = 0;
  public cant = 0;
  private sellSubs!: Subscription;

  constructor(
    private promotorProductService: PromotorProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.productsSubs = this.promotorProductService
      .getAllWithoutPagination()
      .subscribe((res) => {
        this.products = res;
        this.store.dispatch(stopLoading());
      });

    this.store.select('sell').subscribe(({ total, cant }) => {
      this.total = total;
      this.cant = cant;
    });
  }

  ngOnDestroy(): void {
    this.productsSubs?.unsubscribe();
    this.sellSubs?.unsubscribe();
  }
}
