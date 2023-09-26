import { AuthStore } from './../auth/auth.store';
import { NotificationsService } from './../notifications/notifications.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IPConfig } from 'src/IPConfig';
import { CommonHandlerService } from '../handlers/CommonHandler.service';
import { LanguageService } from '../language/language.service';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  Lang = {};
  constructor(
    private http: HttpClient,
    private notification: NotificationsService,
    private authStore: AuthStore,
    private router: Router,
    private CommonHandler:CommonHandlerService,
    private languageService: LanguageService
  ) {}

  post(url, funcID?, datas?) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    const _headers = {
      "HRM-Api-Url": url,
      "HRM-Function-ID": funcID,
      "HRM-Request-Url": "HrmMobileApp",
      "HRM-Api-Type": "HrmMobileApp",
      "HRM-Application-ID": "HrmMobileApp",
    };
    const loginInfo = this.authStore.get();
    if (loginInfo) {
      _headers["HRM-Session-ID"] = loginInfo.SessionID;
      _headers["HRM-Token-ID"] = loginInfo.TokenID;
      _headers["HRM-JWT-ID"] = loginInfo.Jwt;
    }
    let _payload = datas;
    let urlencoded = "headers=" + window.encodeURIComponent(JSON.stringify(_headers));
    if (_payload) {
      urlencoded += "&payload=" + window.encodeURIComponent(JSON.stringify(_payload));
    }
    return this.http.post<any>(IPConfig.IP + 'ApiHandler/Call', urlencoded, { headers: headers }).pipe(map((res) => {
      if (res && !res.ErrorCode && !res.ErrorLogin && !res.Error) {
        res.Data = JSON.parse(res?.Data)
        return res;
      }
      else{
        const error = res ? res.ErrorCode || res.ErrorLogin || res.Error : "Error";
        const objError = this.CommonHandler.GetErrorMessage(error);
        res.IsError = true;
        res.Error = objError.message;
        this.InitValidateAlert(objError);
      }

    }),catchError(err => {
      this.notification.alert('Error',err.statusText)
      return of();
    }));
  }
  async InitValidateAlert(error){
    const Lang = await this.languageService.getLanguage();
    const { message, isTranslate } = error;
    if (typeof message === 'string' && (message.includes("405 (Method Not Allowed)") || message.includes('Session ID of user not logged in'))){
      this.authStore.remove();
      localStorage.clear();
      this.router.navigate(['']);
      return;
    }
    if (isTranslate) {
      this.notification.alert(Lang['COMMON'].Error,message);
    }
  }
}

