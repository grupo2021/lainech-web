import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedData } from '../models/paginatedData.interface';
import { Returns } from '../models/returns.model';

@Injectable({
  providedIn: 'root',
})
export class ReturnsService {
  private url = `${environment.apiUrl}/returns`;

  constructor(private http: HttpClient) {}

  create(cant: number, promotorProductId: number, description: string) {
    const date = new Date().toISOString();

    return this.http
      .post(this.url, { date, cant, promotorProductId, description })
      .pipe(map((res) => Returns.fromJson(res)));
  }

  getAll(
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

    return this.http.get<PaginatedData>(this.url, { params }).pipe(
      map(({ data, count }) => ({
        data: data.map((r) => Returns.fromJson(r)),
        count,
      }))
    );
  }

  findOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Returns.fromJson(res)));
  }

  changeStatus(id: number, status: string, description: string) {
    return this.http
      .put(`${this.url}/${id}`, {
        status,
        description: description.toUpperCase(),
      })
      .pipe(map((res) => Returns.fromJson(res)));
  }

  public getPendings() {
    return this.http.get<number>(`${this.url}/pending-count`);
  }
}
