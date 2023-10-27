import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConfigFactoryService } from '../global-config.factory.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  baseUrl: any | undefined;

  constructor(private http: HttpClient, private gcf: GlobalConfigFactoryService,
    private _snackBar: MatSnackBar) {
    this.baseUrl = this.gcf.url_server;
  }

  public signUp(userDetail: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + "/user/signup";
    let headers: HttpHeaders = new HttpHeaders({})
      .set('Content-Type', 'application/json')
    let body = new HttpParams()
    body = userDetail;
    this.http.post(url, body, { headers: headers, observe: 'response' }).subscribe(
      (data: any) => {
        let value = data.body as any;
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

  public signIn(userDetail: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + "/user/login";
    let headers: HttpHeaders = new HttpHeaders({})
      .set('Content-Type', 'application/json')
    let body = new HttpParams()
    body = userDetail;
    this.http.post(url, body, { headers: headers, observe: 'response' }).subscribe(
      (data: any) => {
        let value = data.body as any;
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
