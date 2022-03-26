import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  tap,
} from 'rxjs';
import { ReturnsService } from 'src/app/services/returns.service';
import { ReturnsDataSource } from './returns-datasource';

@Component({
  selector: 'app-returns-list',
  templateUrl: './returns-list.component.html',
  styleUrls: ['./returns-list.component.scss'],
})
export class ReturnsListComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource!: ReturnsDataSource;
  displayedColumns = ['date', 'promotor', 'product', 'status'];

  page = 0;
  take = 5;
  sortTable = 'DESC';
  column = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('keyword') keyword!: ElementRef;

  public size!: number;

  constructor(private returnsService: ReturnsService) {}

  ngOnInit(): void {
    this.dataSource = new ReturnsDataSource(this.returnsService);
    this.dataSource.loadExpenses(
      '',
      this.sortTable,
      this.page,
      this.take,
      this.column
    );
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

  ngOnDestroy(): void {}

  public getStatusColor(status: string) {
    let color = 'primary';
    switch (status) {
      case 'PENDIENTE':
        color = 'accent';
        break;
      case 'APROBADO':
        color = 'primary';
        break;
      case 'ANULADO':
        color = 'warn';
        break;
    }
    return color;
  }

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
