import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BestProductReport } from '../models/best-product-report.model';
import { BestSaleReport } from '../models/best-sale-report.model';
import { ReloadReport } from '../models/reaload-report.model';
import { ReturnsReport } from '../models/returns-report.model';
import { SaleReport } from '../models/sale-report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url = `${environment.apiUrl}/report`;

  constructor(private http: HttpClient) {}

  generateReport(
    type: string,
    initDate: string,
    endDate: string,
    userId: number,
    status: string
  ) {
    return this.http
      .post<{ data: any[]; count: number; type: string }>(this.url, {
        type,
        initDate,
        endDate,
        userId,
        status: status ? status : 'ALL',
      })
      .pipe(
        map(({ type, data, count }) => {
          if (type === 'SALES') {
            return {
              type,
              count,
              data: data.map((d) => SaleReport.fromJson(d)),
            };
          } else if (type === 'BEST_SALE') {
            return {
              type,
              count,
              data: data.map((d) => BestSaleReport.fromJson(d)),
            };
          } else if (type === 'RELOADS') {
            return {
              type,
              count,
              data: data.map((d) => ReloadReport.fromJson(d)),
            };
          } else if (type === 'RETURNS') {
            return {
              type,
              count,
              data: data.map((d) => ReturnsReport.fromJson(d)),
            };
          } else if (type === 'BEST-PRODUCT') {
            return {
              type,
              count,
              data: data.map((d) => BestProductReport.fromJson(d)),
            };
          }
          return { type, count, data };
        })
      );
  }
}
