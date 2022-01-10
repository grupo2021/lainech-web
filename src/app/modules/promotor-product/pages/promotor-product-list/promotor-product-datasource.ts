import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { PromotorProduct } from 'src/app/models/promotor-product.model';
import { PromotorProductService } from 'src/app/services/promotor-product.service';

export class PromotorProductDataSource implements DataSource<PromotorProduct> {
  private promotorProductSubject = new BehaviorSubject<PromotorProduct[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private promotorProductService: PromotorProductService) {}

  loadExpenses(
    keyword: string,
    sort: string,
    page: number,
    take: number,
    column: string
  ) {
    this.loadingSubject.next(true);
    this.promotorProductService
      .getAll(keyword, sort, page, take, column)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.promotorProductSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<PromotorProduct[]> {
    console.log('Connecting data source');
    return this.promotorProductSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.promotorProductSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
