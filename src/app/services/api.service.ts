import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConfigFactoryService } from '../global-config.factory.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any | undefined;
  baseUrl2:any |undefined;
  
  constructor(private http: HttpClient, private gcf: GlobalConfigFactoryService,
    private _snackBar: MatSnackBar) {
    this.baseUrl = this.gcf.url_server;
    this.baseUrl2 = this.gcf.url_server2;
  }


  public getProduct(): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + `/product/getProduct/`;
    this.http.get(url).subscribe(
      (data: any) => {
        let value = data as any;
        observer.next(value);
      },
      (error: any) => {
        if (error) {
          this._snackBar.open(`${error.error.message}`, "close", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['danger-snackbar']
          });
        }
        observer.next(null!);
      });

    return observer;
  }

  public getRestaurant(): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl2 + `/resturant/getRestaurant/`;
    this.http.get(url).subscribe(
      (data: any) => {
        let value = data as any;
        observer.next(value);
      },
      (error: any) => {
        if (error) {
          this._snackBar.open(`${error.error.message}`, "close", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['danger-snackbar']
          });
        }
        observer.next(null!);
      });

    return observer;
  }

}
