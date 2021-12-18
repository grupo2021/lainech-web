import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = `${environment.apiUrl}/profiles`;

  constructor(private http: HttpClient) {}

  public update(
    userId: number,
    name: string,
    surname: string,
    address: string,
    identificationNumber: string,
    phones: string[],
    photo: File
  ) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('name', name.toUpperCase());
    if (surname) formData.append('surname', surname.toUpperCase());

    if (address) formData.append('address', address.toUpperCase());

    if (identificationNumber)
      formData.append(
        'identificationNumber',
        identificationNumber.toUpperCase()
      );
    formData.append('phones', JSON.stringify(phones));
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http
      .put(this.url, formData)
      .pipe(map((res) => User.fromJson(res)));
  }
}
