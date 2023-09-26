/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
import { AuthStore } from './../../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { NotificationsService } from './../../../../../projects/hrm-core/src/lib/services/notifications/notifications.service';
import { AESCryptoService, ApiHttpService } from 'projects/hrm-core/src/lib/services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import HrmStorageConst from '../../../../libs/constants/HrmStorageConst';
import HrmStorage from '../../../../libs/core/HrmStorage';
import { IPConfig } from 'src/IPConfig';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { App } from '@capacitor/app';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[InAppBrowser]
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
  });
  user: any;
  isActiveToggleTextPasswordConfirm: any = true;
  iconEyeConfirm  = 'eye';
  activeVN = '';
  activeEN = '';
  lang ='vn';
  langSource;
  IsLoginByQRCode  = false;
  IsLoginGoogle = false;
  IsLoginAzure = false;
  VersionBuild;
  VersionBuildIOS;
  urlAppStore='';
  urlCHPlay='';;
  IsAutoLogin = false;
  BasicProfile;
  CompanyKey;
  GSuiteInfo = null;
  IsHideSettings = true;
  IsHideLogin = false;
  IsLoginFinger = false;
  IsDisableBiometrics = false;
  isNB= false;
  DataServices: Array<any> = [];
  serviceSelected: any;
  //isShowLogOutAzure = false;
  codeVerification = '';
  codeChallenge  = '';
  isModalOpen = false;
  isShowLogOutAzure = new BehaviorSubject<boolean>(false);
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
    private notification: NotificationsService,
    private router: Router,
    private platform: Platform,
    private authStore: AuthStore,private encode: AESCryptoService,
    private translate: TranslateService,private languageService: LanguageService,
    private iab: InAppBrowser
    ){
        //init language
      const browserLang = this.translate.getBrowserLang();
      this.lang = this.authStore.getLanguage() || browserLang;
      this.translate.setDefaultLang(this.lang);
      this.authStore.SetLanguage(this.lang);
      this.translate.use(this.lang ? this.lang : (browserLang.match(/en|fr/) && browserLang));
      if(this.platform.is('ios')){
        const optionsios: InAppBrowserOptions = {
          toolbarposition:'top',
          lefttoright:'yes',
          hidenavigationbuttons:'yes',
          location : 'no'
        };
        this.options = {...this.options,...optionsios};
      }
      App.addListener('appStateChange', (state) => {
        if(state.isActive){
          this.doValidateVersion();
        }
      });
    }

  ngOnInit() {
    // const configApp = HrmStorage.getData('ConfigApp');
    // if(!configApp){
    // }
    // else{
    //   this.excuteDataService(configApp);
    // }'
    this.getConfigApp();
  }

  ionViewWillEnter() {
    this.form = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
  });
  }
  getConfigApp = async () => {
    const loading = await this.notification.showLoading();
    this.api.post('HrmMobileApp/ConfigMobile/GetConfigApp').subscribe(res =>{
      loading.dismiss();
      if(res && !res.Error){
          HrmStorage.setData('ConfigApp',res.Data);
          this.excuteDataService(res.Data);
      }
      else{
        this.IsHideSettings = true;
      }
    },err => {
      this.IsHideSettings = true;
      loading.dismiss();
    });
  };

  ClearCache(){
    HrmStorage.deleteData(HrmStorageConst.FunctionList);
    HrmStorage.deleteData(HrmStorageConst.LoginInfo);
    HrmStorage.deleteData(HrmStorageConst.MessageError);
    HrmStorage.deleteData(HrmStorageConst.VALUE_LIST.LeavePeriod);
    HrmStorage.deleteData(HrmStorageConst.ConfigWithUser);
    HrmStorage.deleteData(HrmStorageConst.BasicProfile);
    HrmStorage.deleteData(CommonConst.SecureStore.UserPassword);
  }

  excuteDataService(data){
    this.serviceSelected = HrmStorage.getData('serviceApp');
    let linkIPInternal = '';
    try {
      linkIPInternal = atob(data.IPInternal);
    } catch{
      linkIPInternal = data.IPInternal;
    }
    this.DataServices = [
      {
        ID:1,
        IPName:'Mặc định',
        IPName2:'Default',
        IPUrl:IPConfig.IP,
        IsDefault:true
      }
    ];
    if(data.IPInternal){
      if(this.serviceSelected && !this.serviceSelected.IsDefault && this.serviceSelected.IPUrl !== linkIPInternal){
        this.serviceSelected.IPUrl =  linkIPInternal;
        HrmStorage.setData('serviceApp',this.serviceSelected);
      }
      const mainSite =  {
        ID:2,
        IPName:'Site Chính',
        IPName2:'Main Site',
        IPUrl:linkIPInternal,
        IsDefault:false
      };
      this.DataServices.push(mainSite);
    }
    else{
      if(this.serviceSelected && !this.serviceSelected.IsDefault){
        this.serviceSelected = this.DataServices[0];
      }
    }
    if(this.DataServices.length < 2){
      this.DataServices[0].IPName = 'Demo';
      this.DataServices[0].IPName2 = 'Demo';
      this.IsHideSettings = true;
    }
    else{
      this.IsHideSettings = false;
    }

    if(this.serviceSelected && this.serviceSelected.IPUrl){
      if(!this.serviceSelected.IsDefault){
        IPConfig.IP = this.serviceSelected.IPUrl;
      }
      else{
        if(this.serviceSelected.IPUrl !== IPConfig.IP){
          this.serviceSelected.IPUrl = IPConfig.IP;
          this.ClearCache();
        }
      }
    }
    else{
      this.serviceSelected = this.DataServices?.length > 0 ? this.DataServices[0] : null;
      if(!this.serviceSelected.IsDefault){
        IPConfig.IP = this.serviceSelected.IPUrl;
      }
    }
    HrmStorage.setData('serviceApp',this.serviceSelected);
    this.GetLanguage();
    this.loadConfig();
    this.getConfigLogin();
  }
  changeLanguage(lang) {
      this.authStore.SetLanguage(lang);
      this.translate.use(lang);
      this.lang = lang;
      this.GetLanguage();
  }
  async GetLanguage(){
    this.langSource = await this.languageService.getLanguage();
  }

  getConfigLogin = () => {
    this.api.post(HrmAPIConst.LOGIN.Alias_GetConfigLogin, HrmAPIConst.LOGIN.GetConfigLogin).subscribe(res => {
      if (res && res.Data && res.Data.length > 0) {
        this.IsHideLogin = res.Data[0].IsHideLogin;
        this.IsLoginFinger = res.Data[0].IsLoginFinger;
        if(!this.IsLoginFinger){
          this.getUserName();
        }
      }
      this.initLogin();
    });
  };

  initLogin = async () => {
    const basicProfile = this.BasicProfile;
    if (basicProfile && typeof basicProfile === 'object' && Object.keys(basicProfile).length > 0) {
      try {
        const result = await NativeBiometric.isAvailable();
        if (result) {
          this.isEnrolledBiometrics();
        }
        else{
          this.eventDisableBiometrics();
        }
      } catch (error) {
        this.eventDisableBiometrics();
      }
    }
    else{
      this.eventDisableBiometrics();
    }
  };


  isEnrolledBiometrics = () => {
    this.eventGetSecureAndLogin();
    this.eventOpenFormBiometrics();
  };

  eventOpenFormBiometrics = async () => {
    if (this.IsLoginFinger) {
       NativeBiometric.verifyIdentity({
          title:this.langSource.LOGIN.Login,
          subtitle: this.langSource.BIOMETRICS.AlertBiometrics,
          maxAttempts:2,
          reason:this.langSource.LOGIN.Login,
          negativeButtonText:this.langSource.COMMON.Cancel,
          useFallback:true
        }).then(() => this.eventGetSecureAndLogin(true))
        .catch(() => this.notification.alert(this.langSource.COMMON.Warning,this.langSource.ERROR.ErrorBiometrics));
      }
  };

  eventGetSecureAndLogin = (isLogin = false) => {
    const secureStore = HrmStorage.getData(CommonConst.SecureStore.UserPassword);
    let secUsername = '';
    let secPassword = '';
    if(secureStore){
      secUsername = this.encode.decrypt(secureStore?.username);
      secPassword = this.encode.decrypt(secureStore?.password);
      if (isLogin) {
          if (secUsername && secPassword) {
              this.form.controls.UserName.setValue(secUsername);
              this.form.controls.Password.setValue(secPassword);
              this.eventLoginBiometrics();
          } else {
              this.notification.alert(this.langSource.ERROR.Please_Login_Again,this.langSource.COMMON.Warning);
          }
      }
      else{
        this.form.controls.UserName.setValue(secUsername);
      }
    }
  };

  signIn = async ()=> {
    const _loginInfo = this.form.value;
    const token = HrmStorage.getData('TokenFireBase');
    const loading = await this.notification.showLoading();
    this.api.post(HrmAPIConst.LOGIN.Login,'', {..._loginInfo,ExpoToken:token}).subscribe(res => {
        loading.dismiss();
        if(!res){return;}
        if(res.Error)
        {
          this.notification.alert(this.langSource.COMMON.Alert, res.Error,null,null,['btnalert']);
          return false;
        }
        const data = res?.Data;
        const user = data?.Data;
        this.handleLogin(data, _loginInfo,false);
        this.authStore.set(user);
        this.authStore.SetLanguage(this.lang);
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
          if (userData.IsFirstChange && !userData.FirstChange) {
              this.router.navigate(['./changepassword']);
          } else {
            this.router.navigate(['Main-App']);
              this.checkSecureStoreLogin(formData.UserName, formData.Password);
          }
        }
    }
  }

  eventLoginDefault = () => {
    // const info = await Device.getInfo();
    // if(info.platform === 'android'){
      //this.doValidateBeforeLogin();
    // }
    // else{
    //   this.doValidateBeforeLoginIOS();
    // }
    this.signIn();
  };

  eventDisableBiometrics = () => {
    this.IsLoginFinger = false;
    this.BasicProfile = null;
  };


  // doValidateBeforeLogin = async () =>{
  //   const NewVersion = this.VersionBuild;
  //   if (NewVersion != null && NewVersion !== '') {
  //       const version = await App.getInfo();
  //       if (NewVersion !== version.version) {
  //         return this.notification.alert(this.langSource.COMMON.Alert,this.langSource.COMMON.MsgNewApp
  //                   + '\n' + this.langSource.COMMON.MsgCurVersion + ':' + version.version
  //                   + '\n' + this.langSource.COMMON.MsgNewVersion + ':' + NewVersion,()=>{
  //                   const urlStore = this.urlCHPlay;
  //                   if(urlStore){
  //                     Browser.open({url:urlStore});
  //                   }
  //                   });
  //       }
  //       else {
  //           return this.signIn();
  //       }
  //   }
  //   else {

  //   }
  // };
  doValidateVersion = async () =>{
    const info = await Device.getInfo();
    const NewVersion = info.platform === 'android' ? this.VersionBuild : this.VersionBuildIOS;
    if (NewVersion != null && NewVersion !== '') {
        const version = await App.getInfo();
        if (NewVersion !== version.version) {
          return this.notification.alert(this.langSource.COMMON.Alert,this.langSource.COMMON.MsgNewApp
                    + '\n' + this.langSource.COMMON.MsgCurVersion + ':' + version.version
                    + '\n' + this.langSource.COMMON.MsgNewVersion + ':' + NewVersion,()=>{
                    const urlStore = info.platform === 'android' ? this.urlCHPlay : this.urlAppStore;
                    if(urlStore){
                      Browser.open({url:urlStore});
                    }
                    },[this.langSource.COMMON.OK]);
        }
    }
  };


  eventLoginBiometrics = () => {
    this.signIn();
  };

  signOutGoogleAsync = async () => {
    this.GSuiteInfo = null;
    HrmStorage.deleteData(HrmStorageConst.GSuiteInfo);
  };

  getUserName = () => {
    const secureStore = HrmStorage.getData(CommonConst.SecureStore.UserPassword);
    let secUsername = '';
    let secPassword = '';
    if(secureStore){
      secUsername = this.encode.decrypt(secureStore?.username);
      secPassword = this.encode.decrypt(secureStore?.password);
      const IsAutoLogin = secureStore.IsAutoLogin;
      if (IsAutoLogin|| IsAutoLogin === 'true' || IsAutoLogin === 1) {
        if (secUsername !== '') {
          this.form.controls.UserName.setValue(secUsername);
          if(secPassword !== ''){
            this.form.controls.Password.setValue(secPassword);
          }
          this.eventLoginBiometrics();
        }
      }
      else {
          if (secUsername !== '') {
            this.form.controls.UserName.setValue(secUsername);
          }
      }
    }
  };

  // eventClearBasicProfile = () => {
  //   this.BasicProfile = null;
  // };


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
      IsAutoLogin: this.IsAutoLogin
    };
    HrmStorage.setData(CommonConst.SecureStore.UserPassword,obj);
  };

  toggleTextPasswordConfirm(): void{
    this.isActiveToggleTextPasswordConfirm = (this.isActiveToggleTextPasswordConfirm === true)?false:true;
    this.iconEyeConfirm = (this.isActiveToggleTextPasswordConfirm === true)?'eye':'eye-off';
  }
  getTypeConfirm() {
    return this.isActiveToggleTextPasswordConfirm ? 'password' : 'text';
  }


  loadConfig = () => {
        const basicProfile = HrmStorage.getData(HrmStorageConst.BasicProfile);
        if (basicProfile) {
            this.BasicProfile = basicProfile;
        }
        this.getConfig();
        const companyKey = IPConfig.SceneKey;
        if (companyKey) {
            this.CompanyKey = companyKey;
        }else {
            this.notification.alert(this.langSource.ERROR.CompanyKeyNotFound,this.langSource.COMMON.Warning);
        }
  };


  initCommonConst(userData) {
    const formatDDMM = userData && userData[CommonConst.KEY.PRDateFormat] || CommonConst.FormatDDMM;
    CommonConst.FormatDDMM = formatDDMM.replace('/yyyy', '').replace('yyyy/', '')
        .replace('-yyyy', '').replace('yyyy-', '').toLocaleUpperCase();
  }


  getConfig() {
    this.api.post(HrmAPIConst.LOGIN.GetConfigMobile).subscribe((result) => {
        if (!result.Error && result.Data) {
            const data = result.Data || [];
            const currentData = data[0] || {};
            this.IsLoginByQRCode = currentData.IsLoginByQRCode;
            this.IsLoginGoogle = currentData.IsLoginGoogle;
            this.IsLoginAzure = currentData.IsLoginAzure;
            this.VersionBuild = currentData.VersionBuild;
            this.VersionBuildIOS = currentData.VersionBuildIOS;
            this.urlAppStore=currentData.UrlAppStore;
            this.urlCHPlay=currentData.UrlCHPlay;
            this.IsAutoLogin = currentData.IsAutoLogin;
            HrmStorage.setData(HrmStorageConst.ConfigMobile,currentData);
            this.doValidateVersion();
        }
    });
  }


  ChangeService(item: any){
    this.serviceSelected = item;
    IPConfig.IP = item.IPUrl;
    HrmStorage.setData('serviceApp',this.serviceSelected);
    this.setOpen(false);
    this.ClearCache();
    this.loadConfig();
    this.getConfigLogin();
  }

  LoginAzure = async () => {
    this.codeVerification = this.generateCodeVerifier();
    const me = this;
    this.codeChallenge = await this.generateCodeChallengeFromVerifier(this.codeVerification);
    const nonce =  Array.from(window.crypto.getRandomValues(new Uint32Array(16)), this.dec2hex).join('');
    const url = `https://login.microsoftonline.com/${HrmStorage.getData('ConfigApp')?.TenantID}/oauth2/v2.0/authorize?client_id=${HrmStorage.getData('ConfigApp')?.ClientID}&scope=user.read%20openid%20profile%20offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&client-request-id=d171626a-e02a-4700-bfa0-a9ccd603b33c&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.38.0&client_info=1&code_challenge=${this.codeChallenge}&code_challenge_method=S256&nonce=${nonce}&state=eyJpZCI6ImRkNzdlMzI5LTllN2MtNDdlOS04NTQwLTUwNzI4ZTFmNWQwMyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D`;
    const browser = this.iab.create(url,'_blank',this.options);
    browser.on('loadstart').subscribe(event => {
      if(event.url.includes('http://localhost:4200/')){
        const paramsUrl = event.url.split('#') ? event.url.split('#')[1] : '';
        const urlParams = JSON.parse('{"' + decodeURI(paramsUrl.replace(/&/g, '\",\"').replace(/=/g,'\":\"')) + '"}');
        me.isShowLogOutAzure.next(true);
        browser.close();
        this.TriggerWhenLoginLogOUtAzure();
        this.getAccessToken(urlParams);
      }
    });
  };



  dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }
  generateCodeVerifier() {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, this.dec2hex).join('');
  }


   sha256(plain) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }
  base64urlencode(a) {
    let str = '';
    const bytes = new Uint8Array(a);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  generateCodeChallengeFromVerifier = async (v: any) =>{
    const hashed = await this.sha256(v);
    const base64encoded = this.base64urlencode(hashed);
    return base64encoded;
  };

  TriggerWhenLoginLogOUtAzure(){
    if(this.lang?.toLowerCase() === 'vn'){
      document.getElementById('LangVN').click();
    }else{
      document.getElementById('LangEN').click();
    }
  }
  getAccessToken = (code) =>{
    if(code && code.code){
      this.api.post(HrmAPIConst.LOGIN.LoginAzure,null,
      {
        codeVerification:this.codeVerification,
        code:code.code,
        TenantID:HrmStorage.getData('ConfigApp')?.TenantID,
        ClientID:HrmStorage.getData('ConfigApp')?.ClientID
      }).subscribe(res => {
        if(res && !res.Error){
          const dataFromToken = this.parseJwt(res.Data.id_token);
          if(!!dataFromToken && (dataFromToken?.email || dataFromToken?.preferred_username)){
            this.LoginSocial(dataFromToken?.email || dataFromToken?.preferred_username);
          }
          else{
            this.notification.alert(this.langSource.COMMON.Alert,'Login Failed',()=>{
              this.isShowLogOutAzure.next(true);
            });
          }
        }
        else{
          this.notification.alert(this.langSource.COMMON.Alert,'Login Failed',()=>{
            this.isShowLogOutAzure.next(true);
          });
        }
      });
    }
    else{
      this.notification.alert(this.langSource.COMMON.Alert,'Login Failed',()=>{
        this.isShowLogOutAzure.next(true);
      });
    }
  };


  LoginSocial = async (email: string) => {
    const loading = await this.notification.showLoading();
    const _loginInfo = this.form.value;
    this.api.post(HrmAPIConst.LOGIN.SubmitSocialData,null,
    {
      login_type : 'azure',
      id :'',
      first_name : '',
      last_name : '',
      email,
      picture : ''
    }).subscribe(res => {
      loading.dismiss();
      if(!res){return;}
      if(res.Error)
      {
        this.notification.alert(this.langSource.COMMON.Alert, res.Error);
        return;
      }
      const data = res?.Data?.LoginResponse;
      const user = data?.Data;
      this.authStore.set(user);
      this.authStore.SetLanguage(this.lang);
      this.handleLogin(data, _loginInfo,true);
      },err => loading.dismiss());
  };

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) =>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }

  LogOutAzure(){
    const urlLogout = `https://login.microsoftonline.com/${HrmStorage.getData('ConfigApp')?.TenantID}/oauth2/v2.0/logout`;
    const browser = this.iab.create(urlLogout,'_blank',this.options);
    const me = this;
    browser.on('loadstop').subscribe(event => {
    if(event.url.includes('logoutsession')){
      browser.close();
      me.isShowLogOutAzure.next(false);
      this.TriggerWhenLoginLogOUtAzure();
    }});
  }

  setOpen(isOpen){
    this.isModalOpen = isOpen;
  }


  SimulationLogin(){
    this.router.navigate(['auth/login/login-simulation']);
  }
}
