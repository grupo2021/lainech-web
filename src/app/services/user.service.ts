import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedData } from '../models/paginatedData.interface';
import { UserSmall } from '../models/user-small.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;

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
        data: data.map((d) => User.fromJson(d)),
        count,
      }))
    );
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => User.fromJson(res)));
  }

  public create(name: string, email: string, roleId: number, password: string) {
    return this.http
      .post(this.url, { name: name.toUpperCase(), email, roleId, password })
      .pipe(map((res) => User.fromJson(res)));
  }

  public changestatus(id: number) {
    return this.http
      .post(`${this.url}/changestatus/${id}`, {})
      .pipe(map((res) => User.fromJson(res)));
  }

  public getPromotors() {
    return this.http
      .get<[]>(`${this.url}/all/promotors`)
      .pipe(map((res) => res.map((r) => UserSmall.fromJson(r))));
  }
}
