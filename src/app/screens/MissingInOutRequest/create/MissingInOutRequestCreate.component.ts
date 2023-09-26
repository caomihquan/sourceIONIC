/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
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

import LeaveAndOTConst from '../../../shared/constants/LeaveAndOTConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { AlertController } from '@ionic/angular';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { Location } from '@angular/common';
const COMMON_CONST = CommonConst;
const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;

@Component({
  selector: 'app-missinginoutrequestcreate',
  templateUrl: './MissingInOutRequestCreate.component.html',
  styleUrls: ['./MissingInOutRequestCreate.component.scss'],
})

export class MissingInOutRequestCreateComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  IsPageTimeSheet = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.IsPageTimeSheet : false;
  RemainLeaveNumber= [];
  SetupProcess = {};
  SelectedFromTimeDT = null;SelectedToTimeDT = null;SelectedFromTimeVS= null;SelectedToTimeVS= null;
  IsVisibleRoot1 = false;
  IsVisibleRoot2= false; IsVisibleNew2 = false; IsVisibleNew1= false;
  FromTimeDT = null; FromTimeVS = null; ToTimeVS = null; ToTimeDT = null;
  IsActivePleaseCancel= false;
  IsModalLoading= false;
  IsRequireWriteReason  = false;NewOut1= null; NewIn1=null;NewOut2= null; NewIn2=null;
  Lang: any;
  user: any;
  LoginInfo: any;
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  FormatDateViewUI = CommonConst.FormatDate.toLocaleUpperCase();// loginInfo.PRDateFormat || CommonConst.FormatDate
  DowCodeSelection = { DowCode: (new Date()).getFullYear() };
  CurrentDate  =  FormatHandler.formatDate(new Date(), this.auth.get());;
  LeaveKows = [];
  LeaveKowsSelected= {};
  SelectedFromDate = null;
  SelectedFromTime = null;
  SelectedToTime = null;
  SelectedToDate =  null;
  LeaveTimes= [];
  LeaveTimeSelected= {};

  ListOfHistRequest=[];
  IsEmployeeAttendance =false;
  EmployeeAttendance = '';
  WorkDateAttendance = null;
  WorkDate = new Date();
  IsVisibleLeaveType = false;
  IsVisibleLeaveTime = false;
  UseDayNum = false;
  KowType= 0;
  FromTime;
  ToTime;
  lstNguoiThayThe = [];
  DefaultToDate = false; // hôm sau truyền từ timesheet vào;
  DefaultFromDate = false;
  modelConfigTSEmp = {};
  Model ={};
  itemFunction
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private location: Location,
    private auth: AuthStore, private languageService: LanguageService,
    private variablesService: VariableCommonService,
    private router: Router,public commonHandler: CommonHandlerService, public notification: NotificationsService,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());

  }
  loadDefaultAddNew() {
    this.api.post(API_MISSINGINOUT.Alias_GetScanTimeInfo_forAddNew, API_MISSINGINOUT.GetScanTimeInfo_forAddNew,
      {WorkDate: this.WorkDate ? this.WorkDate : new Date()}
    )
    .subscribe(result => {
      if (!result.IsError) {
        const data = result.Data;

        if (typeof data == 'object' && data.length > 0) {
            const model = this.Model || {};
            data[0].NewIn1 = model['NewIn1'];
            data[0].NewOut1 = model['NewOut1'];
            data[0].NewIn2 = model['NewIn2'];
            data[0].NewOut2 = model['NewOut2'];
            this.Model= data[0];
        } else {
            this.Model ={};
        }
    }
  });
}
  ngOnInit() {
    this.LoginInfo = this.auth.get();
    this.FormatDateViewUI =  this.LoginInfo.PRDateFormat || CommonConst.FormatDate.toLocaleUpperCase();
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state.itemFunction;
    this.getLanguage();
    this.initData();
    this.componentDidMount();

  }

  initWorkDate(callback) {
    if (this.IsPageTimeSheet) {
      this.WorkDate = FormatHandler.formatDate(this.router.getCurrentNavigation()?.extras?.state?.WorkDate, this.user);
    }
    if(callback){
      callback();
    }
  }

  eventSelecteIn1(data){
    this.NewIn1 = data;
    this.Model['NewIn1'] = this.NewIn1;
  }

  eventSelecteOut1(data){
    this.NewOut1 = data;
    this.Model['NewOut1'] = this.NewOut1;
  }

  eventSelecteIn2(data){
    this.NewIn2 = data;
    this.Model['NewIn2'] = this.NewIn2;
  }

  eventSelecteOut2(data){
    this.NewOut2 = data;
    this.Model['NewOut2'] = this.NewOut2;
  }

  initData() {
    const fromDate = this.DefaultFromDate ? this.DefaultFromDate : new Date();
    this.SelectedFromDate= fromDate;//FormatHandler.formatDate(fromDate, this.LoginInfo),
    this.initWorkDate(() => {
      this.loadDefaultAddNew();
    });
  }
  componentDidMount = ()=> {
      this.RequestData = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.RequestData : {};
      this.ListOfHistRequest =this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.ListOfHistRequest : {};

      const formatDate = this.FormatDate;
      if (this.RequestData) {
        this.RequestData.CreateDateView = moment(this.RequestData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
    }
  };
  eventSelecteworkday(date){
    if (date) {
      this.WorkDate  = date;
      this.Model['WorkDate'] = this.WorkDate;
    }
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
  };

  async presentAlert(header,subHeader,message,callback) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
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
          this.onSubmitRequest();
        },
      }
    ]
    });
    await alert.present();
  }
  validateBeforeRequest(){
    this.api.post(API_MISSINGINOUT.Alias_ValidateWarningScanTimeRequest, API_MISSINGINOUT.ValidateWarningScanTimeRequest,
      {
        WorkDate: this.WorkDate,
        RecordID: null,
        Kind: 0,
        NewIn1: this.Model['NewIn1'] || '',
        NewOut1: this.Model['NewOut1'] || '',
        NewIn2: this.Model['NewIn2'] || '',
        NewOut2: this.Model['NewOut2'] || '',
        Note: this.Model['Note'] || '',
      })
      .subscribe(result => {
        if (!result.IsError) {
          if ((result.Data.ErrorCodeRespone && result.Data.IsErrorRespone)) {
              const objError = this.commonHandler.GetErrorMessage(result.Data.ErrorCodeRespone);
              this.presentAlert(this.Lang.COMMON.Alert,objError.message, this.Lang.ERROR[result.Data.ErrorCodeRespone], null);
          } else {
              this.onSubmitRequest();
          }
        }
      });
  }
  eventOnSubmitRequest() {
    this.validateBeforeRequest();
  }

  onSubmitRequest(){
    this.api.post(API_MISSINGINOUT.Alias_SendRequestScanTimeRequest, API_MISSINGINOUT.SendRequestScanTimeRequest,
      {
        WorkDate: this.WorkDate,
        RecordID: null,
        Kind: 0,
        NewIn1: this.Model['NewIn1'] || '',
        NewOut1: this.Model['NewOut1'] || '',
        NewIn2: this.Model['NewIn2'] || '',
        NewOut2: this.Model['NewOut2'] || '',
        Note: this.Model['Note'] || '',
      })
      .subscribe(result => {
        if (!result.IsError) {
            this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
            this.variablesService.$reloadFunction.next(true);
            this.router.navigate(['/MissingInOutRequest']);
        }
      });
  }

  doPop(){
    this.location.back();
  }
}
