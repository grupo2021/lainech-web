import { Component, Input, OnInit } from '@angular/core';
import { BestProductReport } from 'src/app/models/best-product-report.model';

@Component({
  selector: 'app-report-best-product',
  templateUrl: './report-best-product.component.html',
  styleUrls: ['./report-best-product.component.scss'],
})
export class ReportBestProductComponent implements OnInit {
  @Input() bestProducts!: BestProductReport[];
  public totalAcum!: number;

  public displayedColumns = [
    'product',
    'cant_acum',
    'total_acum',
    'percentage',
  ];

  constructor() {}

  ngOnInit(): void {
    this.totalAcum = this.bestProducts.reduce((a, i) => a + i.cant_acum, 0);
  }
}
