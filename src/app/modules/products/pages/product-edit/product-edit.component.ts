import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  public product!: Product;
  public categories: Category[] = [];

  private productSubs!: Subscription;
  private categorySubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.productSubs = this.route.params
      .pipe(
        switchMap(({ id }) => this.productService.getOne(id)),
        switchMap((res) => {
          this.product = res;
          return this.categoryService.getAllWithoutPagination();
        })
      )
      .subscribe((res) => {
        this.categories = res;
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy(): void {
    this.productSubs?.unsubscribe();
    this.categorySubs?.unsubscribe();
  }
}
