import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConfigFactoryService } from 'src/app/global-config.factory.service';
import { Restaurant } from '../interface/restaurant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: any | undefined;
  baseUrl2:any |undefined;

  constructor(private http: HttpClient, private gcf: GlobalConfigFactoryService,
    private _snackBar: MatSnackBar) {
    this.baseUrl = this.gcf.url_server;
    this.baseUrl2 = this.gcf.url_server2;
  }

  public addRestaurant(resDetail: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl2 + "/resturant/add-restaurant";
    let headers: HttpHeaders = new HttpHeaders({})
      .set('Content-Type', 'application/json')
    let body = new HttpParams()
    body = resDetail;
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

  public getRestaurant(userId: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl2 + `/resturant/getrestaurantByUser/${userId}`;
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

  public deleteRestaurant(id: string): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl2 + `/resturant/delete-restaurant/${id}`;
    let headers: HttpHeaders = new HttpHeaders({})
      .set('Content-Type', 'application/json')
    this.http.delete(url).subscribe(
      (data: any) => {
        let value = data;
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

  public getRestaurantById(id: string): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl2 + `/resturant/get-restaurant/${id}`;
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

  public editRestaurantById(id: string, restaurant: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl2 + `/resturant/update-restaurant/${id}`;
    this.http.put(url, restaurant).subscribe(
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


  public addProduct(product: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + "/product/add-product";
    const body = new FormData();
    body.set('file', product.imageBlob);
    body.set('userId', product.userId);
    body.set('restaurantId', product.restaurantId);
    body.set('productName', product.productName);
    body.set('productPrice', product.productPrice);
    body.set('productDec', product.productDec);

    this.http.post(url, body, { responseType: 'json' }).subscribe(
      (data: any) => {
        let value = data;
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

  public getProductByUserId(id: string): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + `/product/getProductByUser/${id}`;
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

  public deleteProduct(id: string): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + `/product/delete-product/${id}`;
    let headers: HttpHeaders = new HttpHeaders({})
      .set('Content-Type', 'application/json')
    this.http.delete(url).subscribe(
      (data: any) => {
        let value = data;
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

  public getProductByProductId(id: string): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + `/product/getProductByProduct/${id}`;
    let headers: HttpHeaders = new HttpHeaders({})
      .set('Content-Type', 'application/json')
    this.http.get(url).subscribe(
      (data: any) => {
        let value = data;
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

  public editProductById(id: string, product: any): Observable<any> {
    let observer = new BehaviorSubject<any>(undefined!);
    let url = this.baseUrl + `/product/update-product/${id}`;
    
    const body = new FormData();
    body.set('file', product.imageBlob);
    body.set('userId', product.userId);
    body.set('restaurantId', product.restaurantId);
    body.set('productName', product.productName);
    body.set('productPrice', product.productPrice);
    body.set('productDec', product.productDec);

    this.http.put(url, body, { responseType: 'json' }).subscribe(
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
