import { Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { ApiHttpService } from 'projects/hrm-core/src/lib/services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import HrmStorage from 'src/libs/core/HrmStorage';
import HrmStorageConst from 'src/libs/constants/HrmStorageConst';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


options: InAppBrowserOptions = {
  location : 'yes',//Or 'no'
  toolbar:'yes',
  hidden : 'no', //Or  'yes'
  zoom : 'no',//Android only ,shows browser zoom controls
  hardwareback : 'yes',
  closebuttoncaption : 'Đóng', //iOS only
  closebuttoncolor:'#FFFFFF',
  hideurlbar:'yes',//Or 'no',
  toolbarcolor:'#02a0f2',
  navigationbuttoncolor: '#02a0f2',
  fullscreen:'no'
};

  constructor(private api: ApiHttpService,
    private router: Router,
    private iab:InAppBrowser,
    private platform:Platform,
    private authStore: AuthStore) {
      if(this.platform.is('ios')){
        const optionsios: InAppBrowserOptions = {
          toolbarposition:'top',
          lefttoright:'yes',
          hidenavigationbuttons:'yes',
          location : 'no'
        };
        this.options = {...this.options,optionsios};
      }
    }


  login(data: any): Observable<any> {
    return this.api.post('core/authentication/login', '', data)
  }

  logout(url?: string) {
    const configMobile = HrmStorage.getData(HrmStorageConst.ConfigMobile);
    const serviceApp = HrmStorage.getData('serviceApp');
    if(configMobile && configMobile.IsLoginAzure && serviceApp.ID == 2){
      const urlLogout = `https://login.microsoftonline.com/${HrmStorage.getData('ConfigApp')?.TenantID}/oauth2/v2.0/logout`;
      const browser = this.iab.create(urlLogout,'_blank',this.options);
      browser.on('loadstop').subscribe(event => {
      if(event.url.includes('logoutsession')){
        browser.close();
      }});
    }
    this.authStore.remove();
    //localStorage.clear();
    this.router.navigate([''], { queryParams: { returnUrl: url } });
  }

  checkLogin(): Observable<boolean> {
    return new Observable((obs) => {
      let userValue = this.authStore.get();
      if (userValue == null) {
        //this.logout();
        return obs.next(false)
      }
      return obs.next(true)
    })
  }

  checkUserStatus() {
    let userValue = this.authStore.get();
    return userValue != null;
  }
}
