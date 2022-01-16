import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lote } from '../models/lote.model';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private url = `${environment.apiUrl}/lote`;

  constructor(private http: HttpClient) {}

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Lote.fromJson(res)));
  }

  public create(
    productId: number,
    code: string,
    cant: number,
    cant_out: number,
    price: number,
    register: Date,
    expiry: Date
  ) {
    return this.http
      .post(this.url, {
        productId,
        code,
        cant,
        cant_out,
        price,
        register,
        expiry,
      })
      .pipe(map((res) => Lote.fromJson(res)));
  }

  public update(
    id: number,
    code: string,
    cant: number,
    cant_out: number,
    price: number,
    register: Date,
    expiry: Date
  ) {
    return this.http
      .put(`${this.url}/${id}`, {
        code,
        cant,
        cant_out,
        price,
        register,
        expiry,
      })
      .pipe(map((res) => Lote.fromJson(res)));
  }
}
