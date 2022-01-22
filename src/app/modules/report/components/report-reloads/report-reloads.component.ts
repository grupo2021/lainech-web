import { Component, Input, OnInit } from '@angular/core';
import { ReloadReport } from 'src/app/models/reaload-report.model';

@Component({
  selector: 'app-report-reloads',
  templateUrl: './report-reloads.component.html',
  styleUrls: ['./report-reloads.component.scss'],
})
export class ReportReloadsComponent implements OnInit {
  @Input() reloadReports!: ReloadReport[];

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
