import { AuthStore } from './../services/auth/auth.store';
import { Injectable, Optional } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentConfig } from '../models/env.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private env: any;

  constructor(private readonly authStore: AuthStore,
    @Optional() config?: EnvironmentConfig) {
    this.env = config?.environment;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const user = this.authStore.get();
    // const isLoggedIn = user && user.TokenID;

    // if (isLoggedIn) {
    //   request = request.clone({
    //     withCredentials: true,
    //     setHeaders: {
    //       "HRM-Request-Url": "HrmMobileApp",
    //       "HRM-Api-Type": "HrmMobileApp",
    //       "HRM-Application-ID": "HrmMobileApp",
    //       "HRM-Session-ID": user.SessionID,
    //       "HRM-Token-ID": user.TokenID,
    //       "HRM-JWT-ID": user.Jwt
    //     }
    //   });
    // } else {
    //   request = request.clone({
    //     withCredentials: true,
    //     setHeaders: {
    //       "HRM-Request-Url": "HrmMobileApp",
    //       "HRM-Api-Type": "HrmMobileApp",
    //       "HRM-Application-ID": "HrmMobileApp",
    //     }
    //   });
    // }

    return next.handle(request);
  }
}
