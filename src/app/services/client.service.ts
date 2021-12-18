import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { PaginatedData } from '../models/paginatedData.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url = `${environment.apiUrl}/clients`;
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
        data: data.map((d) => Client.fromJson(d)),
        count,
      }))
    );
  }

  public create(
    name: string,
    surname: string,
    address: string,
    phones: string[]
  ) {
    return this.http
      .post(this.url, {
        name,
        surname,
        address,
        phones: JSON.stringify(phones),
      })
      .pipe(map((res) => Client.fromJson(res)));
  }

  public update(
    clientId: number,
    name: string,
    surname: string,
    address: string,
    phones: string[]
  ) {
    return this.http
      .put(`${this.url}/${clientId}`, {
        name,
        surname,
        address,
        phones: JSON.stringify(phones),
      })
      .pipe(map((res) => Client.fromJson(res)));
  }

  public findOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Client.fromJson(res)));
  }
}
