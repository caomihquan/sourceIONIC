import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor} from '@capacitor/core';
import { Router } from '@angular/router';
import HrmStorage from 'src/libs/core/HrmStorage.js';
import { NotificationsService } from '../notifications/notifications.service';
import { LanguageService } from '../language/language.service';
import  HrmStorageConst from 'src/libs/constants/HrmStorageConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FcmService {
  stateApp = true;
  Language : any;
  constructor( private platform: Platform,
    private router: Router,private notification: NotificationsService,private Lang: LanguageService) {
    App.addListener('appStateChange', (state) => {
      this.stateApp = state.isActive;
    });
    this.getLanguage();
  }
  getLanguage = async ()=>{
    this.Language = await this.Lang.getLanguage();
  }

  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush = async () => {
    let permStatus = await PushNotifications.checkPermissions();
    let Language = await this.Lang.getLanguage();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
         this.notification.alert(Language.NOTIFY.GrantedNotifications,Language.COMMON.Warning);
        return;
    }
    await PushNotifications.register();

    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        HrmStorage.setData('TokenFireBase',token.value)
      }
    );
    PushNotifications.addListener('registrationError', (error: any) => {
    });
    PushNotifications.addListener('pushNotificationReceived',this.handleNotification);
    PushNotifications.addListener('pushNotificationActionPerformed',this.handleResponseNotification);
  }


  handleNotification = async (notification :PushNotificationSchema) => {
    const content = notification;
    const { data } = content;
    const isLogin = await this.validationLoginInfo(data);
    if (isLogin) {
        this.onReceivedNotification(content);
    }
    return true;
  };

  handleResponseNotification = async (pushNotification:ActionPerformed) => {
      const request = pushNotification.notification;
      const { data } = request;
      const isLogin = await this.validationLoginInfo(data);
      if (isLogin) {
          this.onSelectedNotification(request);
      }
  };

  onSelectedNotification = content => {
    this.platform.ready().then(() => {
      const { data } = content || {};
      if (data && data[CommonConst.KEY.IsApprove]) {
        this.onCallAPIApprove(data);
      } else {
        this.router.navigate(['ListNotification']);
      }
    })
  }

  onReceivedNotification = content => {
    const { data } = content || {};
    if (this.stateApp && data && data[CommonConst.KEY.IsApprove]) {
        this.onCallAPIApprove(data);
    }
  }

  onCallAPIApprove = (notification) => {
    const title = notification && notification[CommonConst.KEY.title];
    const body = notification && notification[CommonConst.KEY.body] || "";
    const data  = notification || {};
    const params = {
      Data: {
          [CommonConst.KEY.Subject]: title,
          [CommonConst.KEY.Body]: body,
          [CommonConst.KEY.ExpoPushData]: data
      },
    }
    this.notification.alert(title,body,
      () => this.router.navigate([`${CommonConst.SCENE.ListNotification}/${CommonConst.SCENE.NotificationDetails}`], {state:params})
    ,[this.Language.COMMON.OK,this.Language.COMMON.Close]);
  }

  validationLoginInfo = async (dataNotification = {}) => {
      const storageLoginInfo =  HrmStorage.getData(HrmStorageConst.LoginInfo);
      const keyEmployeeCode = CommonConst.KEY.EmployeeCode;
      return storageLoginInfo && storageLoginInfo[keyEmployeeCode] &&
             dataNotification  && dataNotification[keyEmployeeCode] &&
             dataNotification[keyEmployeeCode] === storageLoginInfo[keyEmployeeCode]
  }
}
