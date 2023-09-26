/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';

import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import CommonConst from '../../../../libs/constants/CommonConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';

import MissingInOutConst from '../../../shared/constants/MissingInOutConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { AlertController } from '@ionic/angular';

const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;

@Component({
  selector: 'app-lateearlyrequestdetail',
  templateUrl: './MissingInOutRequestDetail.component.html',
  styleUrls: ['./MissingInOutRequestDetail.component.scss']
})
export class MissingInOutRequestDetailComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  RemainLeaveNumber= [];
  IsActivePleaseCancel= false;
  IsModalLoading= false;
  txtReason= '';
  showAlertDialog= false;
  NguoiThayThe = '';
  IsShow= false;
  IsRequireChoose= false;
  Lang: any;
  user: any;
  LoginInfo: any;
  ApproveLevelList = [];
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  handlerMessage = '';
  IsVisibleRoot1 = false;IsVisibleRoot2= false; IsVisibleNew2 = false; IsVisibleNew1= false;
  itemFunction;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore, private languageService: LanguageService,
    public commonHandler: CommonHandlerService,
    public notification: NotificationsService,
    private router: Router,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }


  initItemLeaveDetail = async () => {
    const requestData = this.RequestData;
    if (requestData) {
        requestData.WorkDateView = FormatHandler.formatDate(requestData.WorkDate, this.user);
        this.RequestData =requestData;
    }
  };
  initButtonPleaseCancel = () => {
    const leaveRequest = this.RequestData;
    if (leaveRequest && leaveRequest[MissingInOutConst.KEY.Status]) {
        const status = leaveRequest[MissingInOutConst.KEY.Status];
        const isUsedRejectProcess = leaveRequest[MissingInOutConst.KEY.IsUsedRejectProcess] || false;
        this.IsActivePleaseCancel= !MissingInOutConst.ListActivePleaseCancel.includes(status) && !isUsedRejectProcess;
    }
  };


  ngOnInit() {
    this.LoginInfo = this.auth.get();
    this.RequestData = this.router.getCurrentNavigation().extras.state ?this.router.getCurrentNavigation().extras.state.RequestData : {};
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state.itemFunction;
    this.getLanguage();

  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.initItemLeaveDetail();
    this.initButtonPleaseCancel();
  };
   presentAlert = async () => {
    this.notification.alertInput(this.Lang.LEAVE_REQUEST.Reason,this.Lang.COMMON.Cancel,this.Lang.COMMON.OK,(data)=>{
      if(!data.txtReason || data.txtReason=== '')
          {
              this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason);
              return false;
          }
          else
          {
              this.txtReason=data.txtReason;
              this.RequestData.txtReason = data.txtReason;
              this.eventOnPleaseReject();
          }
    });
  };

  handleOnPleaseReject = () => {
    if (this.RequestData?.IsRequireWhenCancel) {
        this.presentAlert();
    }
    else {
        this.eventOnPleaseReject();
    }
  };

  eventOnPleaseReject() {
    if (!this.RequestData || !this.RequestData.RecordID) {
      this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
      return;
    }

  if (this.RequestData.IsRequireWhenCancel &&
      (this.txtReason === null || this.txtReason.trim() === '')) {
      this.notification.alert( this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason);
      return;
   }
  this.api.post(API_MISSINGINOUT.Alias_RejectRequestScanTimeRequest, API_MISSINGINOUT.RejectRequestScanTimeRequest,
    {
      RecordID: this.RequestData.RecordID,
      ReasonDetroy: this.RequestData.txtReason || ''
    })
    .subscribe(result => {
        if (result && !result.IsError) {
          const requestData = this.RequestData || {};
          requestData.StatusName = this.Lang.LEAVE_REQUEST.PleaseCancel;
          requestData.Status = MissingInOutConst.STATUS.E_Wait;
          requestData.ReasonDetroy = this.txtReason || '';
          this.RequestData= requestData;
          this.IsActivePleaseCancel= false;
          this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
      }
    });
  };

}
