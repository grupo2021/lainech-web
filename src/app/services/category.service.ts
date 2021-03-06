import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { PaginatedData } from '../models/paginatedData.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  public getAll(
    keyword: string = '',
    sort: string = 'ASC',
    page: number = 0,
    take: number = 10
  ) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('sort', sort.toUpperCase())
      .set('keyword', keyword.toUpperCase());
    return this.http.get<PaginatedData>(this.url, { params }).pipe(
      map(({ data, count }) => ({
        data: data.map((d) => Category.fromJson(d)),
        count,
      }))
    );
  }

  public getAllWithoutPagination() {
    return this.http
      .get<[]>(`${this.url}/no-pagination`)
      .pipe(map((res) => res.map((d) => Category.fromJson(d))));
  }

  public findOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Category.fromJson(res)));
  }

  public create(name: string, code: string, description: string) {
    return this.http
      .post(this.url, {
        name: name.toUpperCase(),
        code: code.toUpperCase(),
        description: description.toUpperCase(),
      })
      .pipe(map((res) => Category.fromJson(res)));
  }

  public update(id: number, name: string, code: string, description: string) {
    return this.http
      .put(`${this.url}/${id}`, {
        name: name.toUpperCase(),
        code: code.toUpperCase(),
        description: description.toUpperCase(),
      })
      .pipe(map((res) => Category.fromJson(res)));
  }

  public delete(id: number) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((res) => Category.fromJson(res)));
  }
}
