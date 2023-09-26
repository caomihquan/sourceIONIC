/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';

import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import CommonConst from '../../../../libs/constants/CommonConst.js'
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';

import LeaveAndOTConst from '../../../shared/constants/LeaveAndOTConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { AlertController } from '@ionic/angular';

const API_LEAVE_REQUEST = HrmAPIConst.EXTRADAYOFF_REQUEST;
const API_LEAVE_REQUEST2 = HrmAPIConst.LEAVE_REQUEST;

@Component({
  selector: 'app-ExtraDayOffRequestDetail',
  templateUrl: './ExtraDayOffRequestDetail.component.html',
  styleUrls: ['./ExtraDayOffRequestDetail.component.scss']
})
export class ExtraDayOffRequestDetailComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  RemainLeaveNumber= [];
  IsActivePleaseCancel= false;
  IsModalLoading= false;
  txtReason= "";
  showAlertDialog= false;
  NguoiThayThe = "";
  IsShow= false;
  IsRequireChoose= false;
  Lang: any;
  user: any;
  LoginInfo: any;
  ApproveLevelList = [];
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  handlerMessage = '';
  itemFunction;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore, private languageService: LanguageService,
    private router: Router,public commonHandler: CommonHandlerService, public notification: NotificationsService,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.Lang ? this.Lang.LEAVE_REQUEST.Reason : '' ,
      cssClass: 'custom-alert-input',
      mode:'ios',
      buttons: [ {
        text: this.Lang ? this.Lang.COMMON.Cancel : 'Cancel' ,
        role: 'cancel',
        handler: () => {
        },
      },
      {
        text: this.Lang ? this.Lang.COMMON.OK : 'OK' ,
        role: 'confirm',
        handler: (data) => {
          if(!data.txtReason || data.txtReason== '')
          {
              this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason,null,null,['btnReject']);
              return false;
          }
          else
          {
              this.txtReason=data.txtReason;
              this.RequestData['txtReason'] = data.txtReason;
              this.eventOnPleaseReject();
          }
        },
      }
    ],
      inputs: [
        {
          type: 'textarea',
          name:'txtReason',
          cssClass: 'txtReason',
          attributes: {
            rows: 6,
          },
          handler: (input) => {}
        },
      ],
    });

    await alert.present();
    // const result = await alert.onWillDismiss();
    //this.txtReason = result.data.values?.txtReason
  }

  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state?.itemFunction;
    this.LoginInfo = this.auth.get();
    this.getLanguage();
    this.componentDidMount();
  }
  handleOnPleaseReject = () => {
    if (true == this.RequestData['IsRequireWhenCancel']) {
      this.presentAlert();
    }
    else {
        this.eventOnPleaseReject();
    }
  }

eventOnPleaseReject() {
  if (!this.RequestData || !this.RequestData['RecordID']) {
    this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound, null,null,['btnReject']);
    return;
 }

  if (true == this.RequestData['IsRequireWhenCancel'] &&
      (this.txtReason == null || this.txtReason.trim() == '')) {
      this.notification.alert( this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason,null,null,['btnReject']);
      return;
   }
  this.IsModalLoading = true
  this.api.post(API_LEAVE_REQUEST.Alias_CalFnSendMailRejectRegLeave, API_LEAVE_REQUEST.CalFnSendMailRejectRegLeave,
    {
      RecordID: this.RequestData['RecordID'],
      ReasonDetroy: this.RequestData['txtReason'] || ''
    })

    .subscribe(result => {
        this.IsModalLoading = false
        if (result && !result.IsError) {
          const requestData = this.RequestData || {};
          requestData['StatusName'] = this.Lang.LEAVE_REQUEST.PleaseCancel;
          requestData['Status'] = LeaveAndOTConst.STATUS.E_Wait;
          requestData['ReasonDetroy'] = this.txtReason || '';

          this.RequestData= requestData;
          this.IsActivePleaseCancel= false;
          this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
          this.router.navigate(['/ExtraDayOffRequest']);
      }
    });

}
eventShowDialog = () => {
  this.showAlertDialog = true;
}
  componentDidMount = ()=> {
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe','GetConfigNguoiThayThe',
    {
      ProcessID: 1
    })
    .subscribe(res => {
      this.IsShow= res.Data.ShowNguoiThayThe.length > 0? true : false,
      this.IsRequireChoose= res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false
    })
    this.RequestData = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state['RequestData'] : {};
    const formatDate = this.FormatDate;
    if (this.RequestData) {
      this.RequestData['CreateDateView'] = moment(this.RequestData['CreateDate'], CommonConst.FormatSQLDate).format(formatDate);
      this.RequestData['BegDateView'] = FormatHandler.formatDate(this.RequestData['BegDate'], this.LoginInfo);
      this.RequestData['EndDateView'] = FormatHandler.formatDate(this.RequestData['EndDate'], this.LoginInfo);
      this.RequestData['NgaySinhCon'] = FormatHandler.formatDate(this.RequestData['NewChildBirthDate'], this.LoginInfo);
      this.api.post(API_LEAVE_REQUEST2.Alias_GetListKows,API_LEAVE_REQUEST2.GetListKows,
        {
           ProcessID:1,
           RecordID: this.RequestData['RecordID'],
           IsGetListOfHistRequest : true
        }).subscribe(result =>{
            if(result && !result.Error){
              this.ApproveLevelList = result.Data;
            }
        });

    }
      this.initButtonPleaseCancel();
  };
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
  };
  initButtonPleaseCancel = () => {
    const leaveRequest = this.RequestData;
    if (leaveRequest && leaveRequest[LeaveAndOTConst.KEY.Status]) {
        const status = leaveRequest[LeaveAndOTConst.KEY.Status];
        const isUsedRejectProcess = leaveRequest[LeaveAndOTConst.KEY.IsUsedRejectProcess] || false;
        this.IsActivePleaseCancel= !LeaveAndOTConst.ListActivePleaseCancel.includes(status) && !isUsedRejectProcess;
    }
  }
}
