import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../auth/auth.service';
import { STORAGE_NAME } from '../config/config';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService,
    private storageService: LocalStorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = this.storageService.getItem(STORAGE_NAME.TOKEN);
    console.log(accessToken);
    let req = request.clone();
    if (accessToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
      });
    }
    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    // }
    // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req);
  }
}
