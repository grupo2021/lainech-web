import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { PromotorProductService } from 'src/app/services/promotor-product.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-returns-new',
  templateUrl: './returns-new.component.html',
  styleUrls: ['./returns-new.component.scss'],
})
export class ReturnsNewComponent implements OnInit {
  public products: PromotorProduct[] = [];
  private productsSubs!: Subscription;

  constructor(
    private promotorProductService: PromotorProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.productsSubs = this.promotorProductService
      .getAllWithoutPagination()
      .subscribe((res) => {
        this.store.dispatch(stopLoading());
        this.products = res;
      });
  }

  ngOnDestroy(): void {
    this.productsSubs?.unsubscribe();
  }
}
