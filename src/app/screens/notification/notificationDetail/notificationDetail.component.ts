/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import  {ApproveRegistrationConst} from 'src/app/shared/constants/ApproveRegistrationConst.js';
import {DomSanitizer} from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
@Component({
  selector: 'app-new-details',
  templateUrl: './notificationDetail.component.html',
  styleUrls: ['./notificationDetail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {
  modalAttachment = false;
  listFiles: any;
  SessionID: any;
  loginInfo: any;
  NOTIFY: any;
  IsApproveRegistration = false;
  IsGetRegistration = false;
  DataRegistrationForm: any;
  Lang;
  NotificationDetail;
  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private languageService: LanguageService,
    private notification: NotificationsService,
    private CommonHandler: CommonHandlerService,
    private router: Router,private sanitizer: DomSanitizer) {
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.NotificationDetail = this.router.getCurrentNavigation().extras?.state?.Data;
    this.getLanguage();
    this.initContent();
  }

  initContent = () =>{
    if(this.NotificationDetail && this.NotificationDetail.BodyWithHTML){
      const cssStr='body, p, table{font-family: Arial, Helvetica, sans-serif;font-size: 15px;line-height: 1.5;}';
      let strBody_notHTML = this.NotificationDetail.BodyWithHTML ? this.NotificationDetail.BodyWithHTML: '' ;
      strBody_notHTML=strBody_notHTML.replace(cssStr, '');
    const htmlContent = `
              <style>${this.styleHtml()}</style>
              <div class="container">${strBody_notHTML}</div>
    `;
    this.NotificationDetail.BodyWithHTML = htmlContent;
    }else{
        this.NotificationDetail.BodyWithHTML ='';
    }
  };

  styleHtml(){
    return `
    *{
      overflow-wrap: break-word;
      line-height: 1.6;
      border:none
    }
    body {
      font-size:0.9rem;
    }
    table {
      border-collapse: initial;
      padding: 8px !important;
      font-size:0.9rem;
    }

    img {
      width:98%;
    }
    img {
      width:98%;
      margin:0 auto;
    }
    li {
      list-style-type: none;
    }
    container::-webkit-scrollbar {
      display: block;
    }
    table::-webkit-scrollbar {
      display: block;
    }
  `;
  }

  byPassHtml(htmlContent){
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.getApproveRegistrationForm();
  };

  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  getApproveRegistrationForm() {
    const loginInfo = this.auth.get();
    if (!loginInfo || !loginInfo[CommonConst.KEY.EmployeeCode]) {return;}
    const detail = this.NotificationDetail || {};
    let expoPushData = detail[CommonConst.KEY.ExpoPushData];
    if (this.isJson(expoPushData)) {
        expoPushData = JSON.parse(expoPushData);
    }
    if (expoPushData &&
        expoPushData[ApproveRegistrationConst.RecordID] &&
        expoPushData[CommonConst.KEY.EmployeeCode] === loginInfo[CommonConst.KEY.EmployeeCode]) {
        this.IsApproveRegistration = true;
        this.api.post(HrmAPIConst.NOTIFICATION.Alias_GetDetailRegistrationForm,
           HrmAPIConst.NOTIFICATION.GetDetailRegistrationForm,expoPushData)
            .subscribe(result => {
                this.IsGetRegistration = true;
                if (!result.Error && result.Data && result.Data[0]) {
                    this.DataRegistrationForm = result.Data[0];
                }
            });
    }
  }
  eventOnPushRegistrationForm = () => {
    if (!this.IsGetRegistration) {
        this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.LoadingRegistration);
        return;
    }
    const detail = this.NotificationDetail || {};
    let expoPushData = detail[CommonConst.KEY.ExpoPushData];
    if (typeof expoPushData == 'string' && expoPushData.startsWith('{') && expoPushData.endsWith('}')) {
        expoPushData = JSON.parse(expoPushData);
    }
    const dataRegistrationForm = this.DataRegistrationForm;
    if (!expoPushData || !this.CommonHandler.IsNumber(expoPushData[ApproveRegistrationConst.TypeApprove]) ||
        !expoPushData[ApproveRegistrationConst.RecordID] || !dataRegistrationForm || Object.keys(dataRegistrationForm).length === 0) {
        this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    switch (expoPushData[ApproveRegistrationConst.TypeApprove]) {
        case 0://phep
            this.onPushLeaveApprove(dataRegistrationForm);
            break;
        case 1://Nghi bu
            this.onPushNghiBuApprove(dataRegistrationForm);
            break;
        case 2://OT ca nhan
            this.onPushLOTApprove(dataRegistrationForm);
            break;
        case 3://OT Tap the
            this.onPushLOTGroupApprove(dataRegistrationForm);
            break;
        case 4://cong tac
        case 5://cont tac
            this.onPushCongTacApprove(dataRegistrationForm);
            break;
        case 6://DTVS
            this.onPushDTVSApprove(dataRegistrationForm);
            break;
        case 9://LAM BU
            this.onPushLamBuAprove(dataRegistrationForm);
            break;
        case 14://Missing inout
            this.onPushMissingInOutApprove(dataRegistrationForm);
            break;
        default:
            break;
    }
  };

  onPushLeaveApprove(data) {
    const params = {
        LeaveApproveData: data,
        IsNotification: true
    };
    this.router.navigate([CommonConst.SCENE.DetailLeaveApprove],{state:params});
  }
  onPushNghiBuApprove(data) {
      const params = {
          LeaveApproveData: data,
          IsNotification: true
      };

      this.router.navigate([CommonConst.SCENE.DetailExtraDayOffApprove], {state:params});
  }
  onPushLOTApprove(data) {
      const params = {
          RequestData: data,
          IsNotification: true
      };

      this.router.navigate([CommonConst.SCENE.DetailOTApprove], {state:params});
  }
  onPushLOTGroupApprove(data) {
      const params = {
          RequestData: data,
          IsNotification: true
      };

      this.router.navigate([CommonConst.SCENE.DetailOTGroupApprove], {state:params});
  }
  onPushCongTacApprove(data) {
      const params = {
          ApproveData: data,
          IsNotification: true
      };

      this.router.navigate([CommonConst.SCENE.DetailBusinessTripApprove],{state:params});
  }
  onPushDTVSApprove(data) {
      const params = {
          RequestData: data,
          IsNotification: true
      };

      this.router.navigate([CommonConst.SCENE.LateEarlyApproveDetail],{state:params});
  }

  onPushLamBuAprove(data) {
      const params = {
          ApproveData: data,
          IsNotification: true
      };

      this.router.navigate([CommonConst.SCENE.DetailExtraWorkDayApprove],{state:params});
  }
  onPushMissingInOutApprove(data) {
      const params = {
          RequestData: data,
          IsNotification: true
      };

      this.router.navigate(CommonConst.SCENE.MissingApproveDetail,{state:params});
  }

}
