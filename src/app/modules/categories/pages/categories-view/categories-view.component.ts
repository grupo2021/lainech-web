import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss'],
})
export class CategoriesViewComponent implements OnInit {
  public category!: Category;
  private categorySubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.categorySubs = this.route.params
      .pipe(switchMap(({ id }) => this.categoryService.findOne(id)))
      .subscribe((res) => {
        this.store.dispatch(stopLoading());
        this.category = res;
      });
  }

  ngOnDestroy(): void {
    this.categorySubs?.unsubscribe();
  }
}
