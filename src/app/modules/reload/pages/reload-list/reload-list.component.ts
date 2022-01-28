import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  Subscription,
  tap,
} from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ReloadService } from 'src/app/services/reload.service';
import { AppState } from 'src/app/state/app.reducer';
import { ReloadDataSource } from './reload-datasource';

@Component({
  selector: 'app-reload-list',
  templateUrl: './reload-list.component.html',
  styleUrls: ['./reload-list.component.scss'],
})
export class ReloadListComponent implements OnInit {
  dataSource!: ReloadDataSource;
  displayedColumns = ['date', 'promotor', 'total', 'status'];

  page = 0;
  take = 5;
  sortTable = 'ASC';
  column = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('keyword') keyword!: ElementRef;

  public size!: number;

  private auth!: User | null;
  private authSubs!: Subscription;

  constructor(
    private reloadService: ReloadService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.dataSource = new ReloadDataSource(this.reloadService);

    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
      if (user?.role === 'PROMOTOR') {
        this.dataSource.loadExpenses(
          '',
          this.sortTable,
          this.page,
          this.take,
          this.column,
          this.auth?.id
        );
      } else {
        this.dataSource.loadExpenses(
          '',
          this.sortTable,
          this.page,
          this.take,
          this.column
        );
      }
    });

    this.dataSource.size$.subscribe((res) => (this.size = res));
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    fromEvent(this.keyword.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadExpensesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadExpensesPage()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
  }

  private loadExpensesPage() {
    if (this.auth?.role === 'PROMOTOR') {
      this.dataSource.loadExpenses(
        this.keyword.nativeElement.value,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.auth.id
      );
    } else {
      this.dataSource.loadExpenses(
        this.keyword.nativeElement.value,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active
      );
    }
  }
}
