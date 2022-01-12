import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataReport } from '../models/data-report.model';

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
    userId: number
  ) {
    return this.http
      .post<{ data: any; count: number }>(this.url, {
        type,
        initDate,
        endDate,
        userId,
      })
      .pipe(
        map(({ data, count }) => ({ data: DataReport.fromJson(data), count }))
      );
  }
}
