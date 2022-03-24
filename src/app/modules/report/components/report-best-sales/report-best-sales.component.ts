import { Component, Input, OnInit } from '@angular/core';
import { BestSaleReport } from 'src/app/models/best-sale-report.model';

@Component({
  selector: 'app-report-best-sales',
  templateUrl: './report-best-sales.component.html',
  styleUrls: ['./report-best-sales.component.scss'],
})
export class ReportBestSalesComponent implements OnInit {
  @Input() bestSales!: BestSaleReport[];
  public totalAcum!: number;

  public displayedColumns = [
    'code',
    'client',
    'promotor',
    'total',
    'cant',
    'percentage',
    'product',
  ];

  constructor() {}

  ngOnInit(): void {
    this.totalAcum = this.bestSales.reduce((a, i) => a + i.cant, 0);
  }
}
