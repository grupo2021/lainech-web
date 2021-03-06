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
import { SaleService } from 'src/app/services/sale.service';
import { SalesDataSource } from './sales-datasource';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent implements OnInit {
  dataSource!: SalesDataSource;
  displayedColumns = ['date', 'promotor', 'total', 'status'];

  page = 0;
  take = 5;
  sortTable = 'DESC';
  column = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('keyword') keyword!: ElementRef;

  public size!: number;

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.dataSource = new SalesDataSource(this.saleService);
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

  private loadExpensesPage() {
    this.dataSource.loadExpenses(
      this.keyword.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active
    );
  }

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
}
