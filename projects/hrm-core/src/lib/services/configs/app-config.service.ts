import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppConfig } from './app-config';
import { IPConfig } from 'src/IPConfig';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends AppConfig {

  constructor(private http: HttpClient) {
    super();
  }

  init() {
    return this.http.get<AppConfig>('assets/configs/appconfig.json').pipe(map(res => {
      //IPConfig.IP = res.apiUrl;
      //IPConfig.SceneKey = res.CompanyKey;
      //IPConfig.GoogleMapsApiKey = res.GoogleMapsApiKey;
      document.querySelector('body').classList.add(res.CompanyKey);
    }));
  }
}
