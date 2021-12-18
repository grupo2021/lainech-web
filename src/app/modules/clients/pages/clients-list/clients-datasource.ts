import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

export class ClientesDataSouce implements DataSource<Client> {
  private clientsSubject = new BehaviorSubject<Client[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private clientService: ClientService) {}

  loadExpenses(keyword: string, sort: string, page: number, take: number) {
    this.loadingSubject.next(true);
    this.clientService
      .getAll(keyword, sort, page, take)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.clientsSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Client[]> {
    console.log('Connecting data source');
    return this.clientsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.clientsSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
