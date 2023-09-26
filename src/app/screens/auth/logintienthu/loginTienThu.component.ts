/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
import { AuthStore } from '../../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { NotificationsService } from '../../../../../projects/hrm-core/src/lib/services/notifications/notifications.service';
import { AESCryptoService, ApiHttpService } from 'projects/hrm-core/src/lib/services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IPConfig } from '../../../../IPConfig';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import HrmStorageConst from '../../../../libs/constants/HrmStorageConst';
import HrmStorage from 'src/libs/core/HrmStorage.js';
import { FcmService } from 'projects/hrm-core/src/lib/services/pushNotifications/fcm.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';


@Component({
  selector: 'app-login',
  templateUrl: './loginTienThu.component.html',
  styleUrls: ['./loginTienThu.component.scss'],
})
export class LoginTienThuComponent implements OnInit {
  form = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
  });
  user: any;
  //CHANGEPASSWORD: any;
  COMMON: any;
  lang ='vn';
  isActiveToggleTextPasswordConfirm: any = true;
  iconEyeConfirm  = 'eye';
  activeVN = '';
  activeEN = '';
  langSource;
  constructor(private api: ApiHttpService,
    private notification: NotificationsService,
    private router: Router,
    private authStore: AuthStore,
    private translate: TranslateService,
    private languageService: LanguageService
   ) {
        //init language
        this.translate.addLangs(['en', 'vn']);
        const browserLang = this.translate.getBrowserLang();
        this.lang = this.authStore.getLanguage() || browserLang;
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang ? this.lang : (browserLang.match(/en|fr/) && browserLang));
        this.authStore.SetLanguage(this.lang);
    }

  ngOnInit() {
    this.getConfig();
  }
  changeLanguage(lang) {
      this.authStore.SetLanguage(lang);
      this.translate.use(lang);
      this.GetActiveLanguage(lang);
      this.lang = lang;
      this.GetLanguage();
  }
  async GetLanguage(){
    this.langSource = await this.languageService.getLanguage();
  }
  signIn() {
    // eslint-disable-next-line no-underscore-dangle
    const _loginInfo = this.form.value;
    const token = HrmStorage.getData('TokenFireBase');
    this.api.post(HrmAPIConst.LOGIN.Login, '', {..._loginInfo,ExpoToken:token}).subscribe(res => {
        if(res.Error && res.Error !== '')
        {
          this.notification.alert(this.langSource.COMMON.Alert, res.Error,null,null,['btnalert']);
          return false;
        }
        const data = res.Data;
        const user = data.Data;
        if (data.IsMaintenance === 1 && user.NeverExpire === false) {
          this.notification.alert(this.langSource.COMMON.Alert, this.langSource.LOGIN.IsMaintenance);
          return false;
        }
        this.authStore.set(user);
        this.authStore.SetLanguage(this.lang);
        if (data.IsSuccessOTP) {
          if (user.IsFirstChange && !user.FirstChange) {
            this.router.navigate(['./changepassword']);
          } else{
              this.router.navigate(['/home']);
          }
        }
      }
    );
  }

  toggleTextPasswordConfirm(): void{
    this.isActiveToggleTextPasswordConfirm = (this.isActiveToggleTextPasswordConfirm === true)?false:true;
    this.iconEyeConfirm = (this.isActiveToggleTextPasswordConfirm === true)?'eye':'eye-off';
  }
  getTypeConfirm() {
    return this.isActiveToggleTextPasswordConfirm ? 'password' : 'text';
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GetActiveLanguage(lang)
  {
     if(this.user && this.user.toLowerCase()===lang.toLowerCase())
     {
       if(this.user.toLowerCase()==='en')
       {
          this.activeVN ='labellang1';
          this.activeEN ='labellang2';
       }
       else
       {
          this.activeVN ='labellang2';
          this.activeEN ='labellang1';
       }
     }
     else
     {
        this.activeVN ='labellang2';
        this.activeEN ='labellang1';
     }
  }

  getConfig() {
    this.api.post(HrmAPIConst.LOGIN.GetConfigMobile).subscribe((result) => {
        if (!result.Error && result.Data) {
            const data = result.Data || [];
            const currentData = data[0] || {};
            // this.setState({
            //     IsLoginByQRCode: currentData.IsLoginByQRCode,
            //     IsLoginGoogle: currentData.IsLoginGoogle,
            //     VersionBuild: currentData.VersionBuild,
            //     IsAutoLogin: currentData.IsAutoLogin
            // });
            const IP = HrmStorage.getData('urlApi');
            if(!IP){
              HrmStorage.setData('urlApi',IPConfig.IP);
            }
            else if((IP && IP !== IPConfig.IP)){
              HrmStorage.clearData();
              HrmStorage.setData('urlApi',IPConfig.IP);
            }
            HrmStorage.setData(HrmStorageConst.ConfigMobile,currentData);
        }
    });
  }
}
