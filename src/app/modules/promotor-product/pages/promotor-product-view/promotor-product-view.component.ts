import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { PromotorProductService } from 'src/app/services/promotor-product.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-promotor-product-view',
  templateUrl: './promotor-product-view.component.html',
  styleUrls: ['./promotor-product-view.component.scss'],
})
export class PromotorProductViewComponent implements OnInit, OnDestroy {
  public promotorProduct!: PromotorProduct;
  private ppSubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private promotorProductService: PromotorProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.ppSubs = this.route.params
      .pipe(switchMap(({ id }) => this.promotorProductService.getOne(id)))
      .subscribe((res) => {
        this.store.dispatch(stopLoading());
        this.promotorProduct = res;
      });
  }

  ngOnDestroy(): void {
    this.ppSubs?.unsubscribe();
  }
}
