import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Reload } from 'src/app/models/reload.model';
import { ReloadService } from 'src/app/services/reload.service';

export class ReloadDataSource implements DataSource<Reload> {
  private reloadsSubject = new BehaviorSubject<Reload[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private reloadService: ReloadService) {}

  loadExpenses(
    keyword: string,
    sort: string,
    page: number,
    take: number,
    column: string,
    userId?: number
  ) {
    this.loadingSubject.next(true);
    if (userId) {
      this.reloadService
        .getAllByUser(keyword, sort, page, take, column)
        .pipe(
          catchError(() => of({ count: 0, data: [] })),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(({ count, data }) => {
          this.sizeSubject.next(count);
          this.reloadsSubject.next(data);
        });
    } else {
      this.reloadService
        .getAll(keyword, sort, page, take, column)
        .pipe(
          catchError(() => of({ count: 0, data: [] })),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(({ count, data }) => {
          this.sizeSubject.next(count);
          this.reloadsSubject.next(data);
        });
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<Reload[]> {
    console.log('Connecting data source');
    return this.reloadsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.reloadsSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
