import { Component, Input, OnInit } from '@angular/core';
import { SaleReport } from 'src/app/models/sale-report.model';

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.scss'],
})
export class ReportSalesComponent implements OnInit {
  @Input() saleReports!: SaleReport[];

  public displayedColumns = [
    'code',
    'date',
    'promotor',
    'details',
    'total',
    'status',
  ];

  constructor() {}

  ngOnInit(): void {}
}
