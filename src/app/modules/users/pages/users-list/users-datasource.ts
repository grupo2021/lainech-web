import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

export class UsersDataSource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private userService: UserService) {}

  loadExpenses(keyword: string, sort: string, page: number, take: number) {
    this.loadingSubject.next(true);
    this.userService
      .getAll(keyword, sort, page, take)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.usersSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    console.log('Connecting data source');
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
