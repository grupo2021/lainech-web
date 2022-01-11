import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedData } from '../models/paginatedData.interface';
import { PromotorProduct } from '../models/promotor-product.model';

@Injectable({
  providedIn: 'root',
})
export class PromotorProductService {
  private url = `${environment.apiUrl}/promotor-product`;

  constructor(private http: HttpClient) {}

  public getAll(
    keyword: string = '',
    sort: string = 'ASC',
    page: number = 0,
    take: number = 10,
    column: string = 'name'
  ) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('sort', sort.toUpperCase())
      .set('keyword', keyword.toUpperCase())
      .set('name', column);

    return this.http.get<PaginatedData>(this.url, { params }).pipe(
      map(({ data, count }) => ({
        data: data.map((d) => PromotorProduct.fromJson(d)),
        count,
      }))
    );
  }

  public getAllWithoutPagination() {
    return this.http
      .get<[]>(`${this.url}/sell`)
      .pipe(map((res) => res.map((r) => PromotorProduct.fromJson(r))));
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => PromotorProduct.fromJson(res)));
  }
}
