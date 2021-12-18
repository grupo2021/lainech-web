import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss'],
})
export class ProductNewComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  private categorySubs!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.categorySubs = this.categoryService
      .getAllWithoutPagination()
      .subscribe((res) => {
        this.categories = res;
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy(): void {
    this.categorySubs?.unsubscribe();
  }
}
