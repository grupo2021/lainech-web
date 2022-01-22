import { Component, Input, OnInit } from '@angular/core';
import { BestSaleReport } from 'src/app/models/best-sale-report.model';

@Component({
  selector: 'app-report-best-sales',
  templateUrl: './report-best-sales.component.html',
  styleUrls: ['./report-best-sales.component.scss'],
})
export class ReportBestSalesComponent implements OnInit {
  @Input() bestSales!: BestSaleReport[];

  public displayedColumns = [
    'code',
    'client',
    'promotor',
    'total',
    'cant',
    'product',
  ];

  constructor() {}

  ngOnInit(): void {}
}
