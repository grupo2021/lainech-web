import { Component, Input, OnInit } from '@angular/core';
import { ReturnsReport } from 'src/app/models/returns-report.model';

@Component({
  selector: 'app-report-returns',
  templateUrl: './report-returns.component.html',
  styleUrls: ['./report-returns.component.scss'],
})
export class ReportReturnsComponent implements OnInit {
  @Input() returnsReports!: ReturnsReport[];
  public displayedColumns = [
    'code',
    'date',
    'almacenero',
    'promotor',
    'state',
    'details',
  ];

  constructor() {}

  ngOnInit(): void {}
}
