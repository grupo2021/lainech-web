import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedData } from '../models/paginatedData.interface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  public create(
    name: string,
    code: string,
    description: string,
    profit: number,
    categoryId: number,
    image: File
  ) {
    const formData = new FormData();
    formData.append('name', name.toUpperCase());
    formData.append('code', code.toUpperCase());
    formData.append('description', description.toUpperCase());
    formData.append('profit', profit.toString());
    formData.append('categoryId', categoryId.toString());
    if (image) {
      formData.append('image', image);
    }
    return this.http
      .post(this.url, formData)
      .pipe(map((res) => Product.fromJson(res)));
  }

  public update(
    productId: number,
    name: string,
    code: string,
    description: string,
    profit: number,
    categoryId: number,
    image: File
  ) {
    const formData = new FormData();
    formData.append('name', name.toUpperCase());
    formData.append('code', code.toUpperCase());
    formData.append('description', description.toUpperCase());
    formData.append('profit', profit.toString());
    formData.append('categoryId', categoryId.toString());
    if (image) {
      formData.append('image', image);
    }
    return this.http
      .put(`${this.url}/${productId}`, formData)
      .pipe(map((res) => Product.fromJson(res)));
  }

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
        data: data.map((d) => Product.fromJson(d)),
        count,
      }))
    );
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Product.fromJson(res)));
  }

  public getAllWithoutPagination() {
    return this.http.get<[]>(`${this.url}/all/get`).pipe(
      map((res) => {
        console.log(res);
        return res.map((r) => Product.fromJson(r));
      })
    );
  }
}
