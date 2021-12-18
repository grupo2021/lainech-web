import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  constructor() {}

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string) {
    const res = localStorage.getItem(key);
    return res ? JSON.parse(res) : null;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
