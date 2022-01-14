import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private url = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  create(total: number, clientId: number, saleDetails: string) {
    const date = new Date().toISOString();

    if (clientId === 0) {
      return this.http.post(this.url, { date, total, saleDetails });
    }
    return this.http.post(this.url, { date, total, clientId, saleDetails });
  }

  public getAll(
    keyword: string = '',
    sort: string = 'ASC',
    page: number = 0,
    take: number = 10,
    column: string = 'date'
  ) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('sort', sort.toUpperCase())
      .set('keyword', keyword.toUpperCase())
      .set('column', column);

    return this.http
      .get<{ data: []; count: number }>(this.url, { params })
      .pipe(
        map(({ data, count }) => ({
          data: data.map((r) => Sale.fromJson(r)),
          count,
        }))
      );
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Sale.fromJson(res)));
  }

  public approve(id: number) {
    return this.http
      .post(`${this.url}/approve/${id}`, {})
      .pipe(map((res) => Sale.fromJson(res)));
  }

  public cancelled(id: number) {
    return this.http
      .post(`${this.url}/cancelled/${id}`, {})
      .pipe(map((res) => Sale.fromJson(res)));
  }
}
