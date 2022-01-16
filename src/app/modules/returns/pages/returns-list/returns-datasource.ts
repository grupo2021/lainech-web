import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Returns } from 'src/app/models/returns.model';
import { ReturnsService } from 'src/app/services/returns.service';

export class ReturnsDataSource implements DataSource<Returns> {
  private returnsSubject = new BehaviorSubject<Returns[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private returnsService: ReturnsService) {}

  loadExpenses(
    keyword: string,
    sort: string,
    page: number,
    take: number,
    column: string
  ) {
    this.loadingSubject.next(true);
    this.returnsService
      .getAll(keyword, sort, page, take, column)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.returnsSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Returns[]> {
    console.log('Connecting data source');
    return this.returnsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.returnsSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
