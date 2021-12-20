import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

export class CategoriesDataSource implements DataSource<Category> {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private categoryService: CategoryService) {}

  loadExpenses(keyword: string, sort: string, page: number, take: number) {
    this.loadingSubject.next(true);
    this.categoryService
      .getAll(keyword, sort, page, take)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.categoriesSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Category[]> {
    console.log('Connecting data source');
    return this.categoriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categoriesSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
