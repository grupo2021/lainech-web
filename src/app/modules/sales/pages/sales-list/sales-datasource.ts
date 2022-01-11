import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Sale } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale.service';

export class SalesDataSource implements DataSource<Sale> {
  private salesSubject = new BehaviorSubject<Sale[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private saleService: SaleService) {}

  loadExpenses(
    keyword: string,
    sort: string,
    page: number,
    take: number,
    column: string
  ) {
    this.loadingSubject.next(true);
    this.saleService
      .getAll(keyword, sort, page, take, column)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.salesSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Sale[]> {
    console.log('Connecting data source');
    return this.salesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.salesSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
