import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthStore } from '../auth/auth.store';
import HrmStorage from  'src/libs/core/HrmStorage.js'
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  Lang = new Subject();
  Language;
  constructor(private authStore: AuthStore,
    private translate: TranslateService) {
  }
  getLocale(){
    return HrmStorage.getData('Language') ? HrmStorage.getData('Language') : 'vn';
  }
  getLanguage():Promise<any>{
    return new Promise((resolve, reject) => {
      const lang = HrmStorage.getData('Language') ? HrmStorage.getData('Language') : 'vn';
      this.translate.getTranslation(lang).subscribe(x => resolve(x));
    })
  }
  getLanguageField = async (filed) =>{
    return new Promise((resolve, reject) => {
      this.translate.get(filed).subscribe(x => resolve(x));
    })
  }
}
