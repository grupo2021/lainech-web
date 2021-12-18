import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/authResponse.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private dataLocalService: DataLocalService
  ) {}

  public signin(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password }).pipe(
      map((res) => AuthResponse.fromJson(res)),
      tap((res) => this.saveAccessToken(res.accessToken))
    );
  }

  public signout() {
    return of(this.dataLocalService.removeItem('access_token'));
  }

  public renew() {
    return this.http.get(`${this.url}/renew`).pipe(
      map((res) => AuthResponse.fromJson(res)),
      tap((res) => this.saveAccessToken(res.accessToken))
    );
  }

  private saveAccessToken(access_token: string) {
    this.dataLocalService.setItem('access_token', `Bearer ${access_token}`);
  }
}
