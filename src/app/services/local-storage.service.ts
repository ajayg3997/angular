import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public profileDataChanges$ = new BehaviorSubject<any>(null);

  constructor() { }

  setItem(key:any, value:any) {
    localStorage.setItem(key, value);
  }

  getItem(key:any) {
    return localStorage.getItem(key);
  }

  remove(key:any) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
