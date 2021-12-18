import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataLocalService } from '../services/data-local.service';

@Injectable({
  providedIn: 'root',
})
export class HttpHeadersService implements HttpInterceptor {
  constructor(private dataLocalService: DataLocalService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = this.dataLocalService.getItem('access_token');
    if (!access_token) {
      console.warn('Access token not found!');
      return next.handle(req);
    }
    const headers = new HttpHeaders({
      Authorization: access_token,
    });
    const reqClone = req.clone({ headers });
    return next.handle(reqClone);
  }
}
