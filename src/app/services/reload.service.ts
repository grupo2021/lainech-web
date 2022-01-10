import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reload } from '../models/reload.model';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  private url = `${environment.apiUrl}/reload`;

  constructor(private http: HttpClient) {}

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
          data: data.map((r) => Reload.fromJson(r)),
          count,
        }))
      );
  }

  public getAllByUser(
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
      .get<{ data: []; count: number }>(`${this.url}/byuser`, { params })
      .pipe(
        map(({ data, count }) => ({
          data: data.map((r) => Reload.fromJson(r)),
          count,
        }))
      );
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Reload.fromJson(res)));
  }

  public changeStatus(id: number, status: string) {
    return this.http
      .put(`${this.url}/${id}`, { status })
      .pipe(map((res) => Reload.fromJson(res)));
  }

  public create(total: number, details: string) {
    const date = new Date().toISOString();

    return this.http
      .post(this.url, { date, total, details })
      .pipe(map((res) => Reload.fromJson(res)));
  }

  public approve(id: number) {
    return this.http
      .post(`${this.url}/change/approve/${id}`, {})
      .pipe(map((res) => Reload.fromJson(res)));
  }

  public cancelled(id: number) {
    return this.http
      .post(`${this.url}/change/cancelled/${id}`, {})
      .pipe(map((res) => Reload.fromJson(res)));
  }
}
