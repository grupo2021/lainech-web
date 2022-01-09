import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  tap,
} from 'rxjs';
import { ReloadService } from 'src/app/services/reload.service';
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

  constructor(private reloadService: ReloadService) {}

  ngOnInit(): void {
    this.dataSource = new ReloadDataSource(this.reloadService);
    this.dataSource.loadExpenses(
      '',
      this.sortTable,
      this.page,
      this.take,
      this.column
    );
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

  ngOnDestroy(): void {}

  private loadExpensesPage() {
    this.dataSource.loadExpenses(
      this.keyword.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active
    );
  }
}
