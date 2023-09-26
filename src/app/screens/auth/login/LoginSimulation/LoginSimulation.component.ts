/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { AESCryptoService, ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { AuthService } from 'projects/hrm-core/src/lib/services/auth/auth.service';
import HrmStorage from '../../../../../libs/core/HrmStorage';
import HrmStorageConst from '../../../../../libs/constants/HrmStorageConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import  CommonConst from 'src/libs/constants/CommonConst.js';

@Component({
  selector: 'app-login-simulation',
  templateUrl: './LoginSimulation.component.html',
  styleUrls: ['./LoginSimulation.component.scss'],
})
export class LoginSimulationComponent implements OnInit {
  //#region Constructor
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isActiveToggleTextPasswordOld = true;
  iconEyeOld  = 'eye';
  isActiveToggleTextPasswordNew: any = true;
  iconEyeNew  = 'eye';
  langSource: any;
  constructor(
    private authStore: AuthStore,
    private translate: TranslateService,
    private notification: NotificationsService,
    private api: ApiHttpService,
    private languageService: LanguageService,
    private router: Router,
    private encode: AESCryptoService,
    private authService: AuthService) {
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }
  //#endregion

  //#region  Init
  ngOnInit() {
  }

  async GetLanguage(){
    this.langSource = await this.languageService.getLanguage();
  }

  submit = async () => {
    const loginInfo = this.form.value;
    const token = HrmStorage.getData('TokenFireBase');
    const loading = await this.notification.showLoading();
    this.api.post(HrmAPIConst.LOGIN.Login,'', {...loginInfo,ExpoToken:token}).subscribe(res => {
        loading.dismiss();
        if(!res){return;}
        if(res.Error)
        {
          this.notification.alert(this.langSource.COMMON.Alert, res.Error,null,null,['btnalert']);
          return false;
        }
        const data = res?.Data;
        const user = data?.Data;
        this.handleLogin(data,loginInfo,false);
        this.authStore.set(user);
    },err => loading.dismiss());
  };


  handleLogin(data, formData, isSocialLogin) {
    const userData = data.Data || {};
    if (data.IsMaintenance === 1 && userData.NeverExpire === false) {
        this.notification.alert(this.langSource.COMMON.Alert, this.langSource.LOGIN.IsMaintenance);
    }else {
        this.initCommonConst(userData);
        HrmStorage.setData(HrmStorageConst.LoginInfo, userData);
        if (data.IsSuccessOTP || isSocialLogin) {
          // if (userData.IsFirstChange && !userData.FirstChange) {
          //     this.router.navigate(['./changepassword']);
          // } else {
              this.router.navigate(['Main-App']);
              //this.checkSecureStoreLogin(formData.UserName, formData.Password);
          //}
        }
    }
  }

  initCommonConst(userData) {
    const formatDDMM = userData && userData[CommonConst.KEY.PRDateFormat] || CommonConst.FormatDDMM;
    CommonConst.FormatDDMM = formatDDMM.replace('/yyyy', '').replace('yyyy/', '')
        .replace('-yyyy', '').replace('yyyy-', '').toLocaleUpperCase();
  }

  //#endregion
  toggleTextPassword(): void{
      this.isActiveToggleTextPasswordOld = (this.isActiveToggleTextPasswordOld === true)?false:true;
      this.iconEyeOld = (this.isActiveToggleTextPasswordOld === true)?'eye':'eye-off';
  }
  getType() {
      return this.isActiveToggleTextPasswordOld ? 'password' : 'text';
  }


  checkSecureStoreLogin = (username, password) => {
    const secureStore = HrmStorage.getData(CommonConst.SecureStore.UserPassword);
    let secUsername = '';
    let secPassword = '';
    if(secureStore){
      secUsername = this.encode.decrypt(secureStore?.username);
      secPassword = this.encode.decrypt(secureStore?.password);
    }
    const secUsernameNew = this.encode.encrypt(username);
    const secPasswordNew = this.encode.encrypt(password);
    const obj = {
      username:secUsernameNew,
      password:secPasswordNew,
      IsAutoLogin:false
    };
    HrmStorage.setData(CommonConst.SecureStore.UserPassword,obj);
  };

}
