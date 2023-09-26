/* eslint-disable @typescript-eslint/quotes */
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

const API_LATEEARLY = HrmAPIConst.LATEEARLY;

@Component({
  selector: 'app-lateearlyrequestcreate',
  templateUrl: './LateEarlyRequestCreate.component.html',
  styleUrls: ['./LateEarlyRequestCreate.component.scss'],
})

export class LateEarlyRequestCreateComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  IsPageTimeSheet = false;
  RemainLeaveNumber= [];
  SetupProcess = {};
  BegDate = null;  EndDate=null;
  SelectedFromTimeDT = null;SelectedToTimeDT = null;SelectedFromTimeVS= null;SelectedToTimeVS= null;
  IsVisibleRoot1 = false;
  IsVisibleRoot2= false; IsVisibleNew2 = false; IsVisibleNew1= false;
  FromTimeDT = null; FromTimeVS = null; ToTimeVS = null; ToTimeDT = null;
  IsActivePleaseCancel= false;
  IsModalLoading= false;
  IsRequireWriteReason  = false;
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
    private auth: AuthStore, private languageService: LanguageService,
    private variablesService: VariableCommonService,
    private location: Location,
    private router: Router,public commonHandler: CommonHandlerService, public notification: NotificationsService,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());

  }
  loadDefaultAddNew() {
    const formatDate = this.FormatDate;
    this.api.post(API_LATEEARLY.Alias_GetlateEarlyInfo_forAddNew, API_LATEEARLY.GetlateEarlyInfo_forAddNew,
      {WorkDate: this.BegDate}
    )
    .subscribe(result => {
      if (!result.IsError) {
        const data = result.Data && result.Data[0] || {};
        this.Model = data;
        this.IsVisibleRoot1 = (this.Model["MaxTimes"] === 4 ||
          (this.Model["MaxTimes"] === 2 && this.Model['LeavePeriod'] !== 2))
          && this.LeaveKowsSelected['KowCode'] === '0' ? true : false;
        this.IsVisibleNew1 = ((this.Model["MaxTimes"] === 4)
          || (this.Model['MaxTimes'] === 2 && this.Model['LeavePeriod'] !== 2)) ? true : false;
          this.IsVisibleRoot2  = (this.Model['MaxTimes'] === 4 ||
          (this.Model['MaxTimes'] === 2 && this.Model['LeavePeriod'] === 2))
          && this.LeaveKowsSelected['KowCode'] === '0' ? true : false;
          this.IsVisibleNew2 =  this.IsVisibleRoot2;
    }
  });
}
  ngOnInit() {
    this.LoginInfo = this.auth.get();
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state.itemFunction;
    this.FormatDateViewUI =  this.LoginInfo.PRDateFormat || CommonConst.FormatDate.toLocaleUpperCase();
    this.IsPageTimeSheet = this.router.getCurrentNavigation()?.extras?.state ? this.router.getCurrentNavigation()?.extras?.state?.IsPageTimeSheet : false;
    const BegDate = this.router.getCurrentNavigation()?.extras?.state?.BegDate;
    this.getLanguage();
    this.initBegDate(BegDate);
    this.componentDidMount();

  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.initData();
    this.loadListKow();
    this.loadListLeave();
  };

  initBegDate(begdate) {
    if ( begdate && this.IsPageTimeSheet) {
        this.BegDate = FormatHandler.formatDate(begdate, this.user);
        this.EndDate = FormatHandler.formatDate(begdate, this.user);
    }
  }
  initData() {
    const fromDate = this.DefaultFromDate ? this.DefaultFromDate : new Date();
    const toDate = this.DefaultToDate ? this.DefaultToDate : new Date();
    this.SelectedFromDate= fromDate;//FormatHandler.formatDate(fromDate, this.LoginInfo),
    this.SelectedToDate = toDate;//FormatHandler.formatDate(toDate, this.LoginInfo)
    this.BegDate= fromDate;//FormatHandler.formatDate(fromDate, this.LoginInfo),
    this.EndDate = toDate;//FormatHandler.formatDate(toDate, this.LoginInfo)
    this.loadDefaultAddNew();
  }

  updateEndDateFromDayNum(Option) {
    this.loadDefaultAddNew();
  }

  componentDidMount = ()=> {
    this.RequestData = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.RequestData : {};
      this.SetupProcess =this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.SetupProcess : {};
      this.ListOfHistRequest =this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.ListOfHistRequest : {};
      this.RemainLeaveNumber = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.RemainLeaveNumber : {};
      this.modelConfigTSEmp = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.modelConfigTSEmp : {};

      const formatDate = this.FormatDate;
      if (this.RequestData) {
        this.RequestData.CreateDateView = moment(this.RequestData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        this.RequestData.BegDateView = FormatHandler.formatDate(this.RequestData.BegDate, this.LoginInfo);
        this.RequestData.EndDateView = FormatHandler.formatDate(this.RequestData.EndDate, this.LoginInfo);
        this.RequestData.NgaySinhCon = FormatHandler.formatDate(this.RequestData.NewChildBirthDate, this.LoginInfo);
    }
  };

  loadListKow() {
    this.api.post(API_LATEEARLY.Alias_GetListKows, API_LATEEARLY.GetListKows,
      {
      })
      .subscribe(result => {
        if (!result.IsError) {
          const leaveKows = result.Data;
          this.LeaveKows= leaveKows;
          this.LeaveKowsSelected = leaveKows ? leaveKows[0] : {};
        }
        if (!result.IsError) {
          this.IsRequireWriteReason= result.Data.setupprocess && result.Data.setupprocess.length > 0 ? result.Data.setupprocess[0].IsRequireReason : false;
        }
      });
  }
  loadListLeave(){
    this.api.post('HrmMobileApp/System/GetValueList','GetValueList',
      {
        Names: ['HCSEM_EmpDayOff.LeavePeriod']
      })
      .subscribe(result => {
        if (!result.IsError) {
          const listStatus = result.Data && result.Data[CommonConst.VALUE_LIST.LeavePeriod] || [];
          let data = listStatus[CommonConst.VALUE_LIST.items] || [];
          const listOfLeavePeriod = LeaveAndOTConst.ListOfLeavePeriod;
          data = data.filter(item => listOfLeavePeriod.find(ele =>
              (ele + "") === item[LeaveAndOTConst.KEY.Value]));
          const selected = data[0] || {};
          this.LeaveTimes= data;
          this.LeaveTimeSelected= selected;
        }
    });
  }
  eventSelectedMonth(item) {
    this.DowCodeSelection = item;
  }
  eventSelectedKow(item) {
    this.LeaveKowsSelected = item;
    //this.updateEndDateFromDayNum('0');
  }
  eventSelectedatetime(date){
    if (date) {
      const formatDate = this.FormatDate;
      const toDate = this.SelectedToDate;
      if (Date.parse(date) > Date.parse(toDate)) {
        this.SelectedToDate= date ;
      }

      this.SelectedFromDate  = date;
      this.BegDate = date;
      this.EndDate =  this.SelectedToDate;
      this.Model= {};
      this.FromTimeDT = null;
      this.ToTimeDT = null;
      this.FromTimeVS = null;
      this.ToTimeVS = null;
      this.updateEndDateFromDayNum('1');
    }
  }
  eventSelectetodatetime(date){
    if (date) {
      const formatDate = this.FormatDate;
      const fromDate = this.SelectedFromDate;
      const moFromDate = moment(fromDate, formatDate);
      const moToDate = moment(date, formatDate);

      if (moFromDate > moToDate) {
          this.SelectedToDate= fromDate ;
      } else {
          this.SelectedToDate  = date ;
      }
      this.EndDate = this.SelectedToDate;
      this.Model= {};
      this.updateEndDateFromDayNum('5');
    }
  }
  eventSelectedLeave(item)
  {
    if (item) {
      this.LeaveTimeSelected =  item;
    }
  }

  eventSelectefromtime(item){
    this.SelectedFromTime =  item;
    this.FromTime =  item;
  }
  eventSelectetotime(item){
    this.SelectedToTime = item;
    this.ToTime = item;
  }
  eventSelectefromtimeDT(item){
    this.SelectedFromTimeDT =  item;
    this.FromTimeDT =  item;
  }
  eventSelectetotimeDT(item){
    this.SelectedToTimeDT =  item;
    this.ToTimeDT =  item;
  }
  eventSelectefromtimeVS(item){
    this.SelectedFromTimeVS =  item;
    this.FromTimeVS =  item;
  }
  eventSelectetotimeVS(item){
    this.SelectedToTimeVS =  item;
    this.ToTimeVS =  item;
  }


  doSubmit() {
    const formatDate = this.FormatDate;
    this.IsModalLoading = true;
    this.api.post(API_LATEEARLY.Alias_SendRequestLateEarlyRequest, API_LATEEARLY.SendRequestLateEarlyRequest,
    {
      BegDate: this.BegDate,
      EndDate: this.EndDate,
      Status: this.LeaveKowsSelected['KowCode'] ? parseInt(this.LeaveKowsSelected['KowCode'], 10) : 0,
      LateIn: this.Model['LateIn'] ? parseFloat(this.Model['LateIn']) : 0,
      EarlyOut: this.Model['EarlyOut'] ? parseFloat(this.Model['EarlyOut']) : 0,
      LateInMid: this.Model['LateInMid'] ? parseFloat(this.Model['LateInMid']) : 0,
      EarlyOutMid: this.Model['EarlyOutMid'] ? parseFloat(this.Model['EarlyOutMid']) : 0,
      RootLateIn1: this.Model['RootLateIn1'] ? parseFloat(this.Model['RootLateIn1']) : 0,
      RootEarly1: this.Model['RootEarly1'] ? parseFloat(this.Model['RootEarly1']) : 0,
      RootLateIn2: this.Model['RootLateIn2'] ? parseFloat(this.Model['RootLateIn2']) : 0,
      RootEarly2: this.Model['RootEarly2'] ? parseFloat(this.Model['RootEarly2']) : 0,
      MaxTimes: this.Model['MaxTimes'] || 2,
      ShiftCode: this.Model['ShiftCode'] || "",
      Note: this.Model['Note'] ? this.Model['Note'] : "",
      FromTimeDT: this.FromTimeDT ? this.FromTimeDT : "",
      ToTimeDT: this.ToTimeDT ? this.ToTimeDT : "",
      FromTimeVS: this.FromTimeVS ? this.FromTimeVS : "",
      ToTimeVS: this.ToTimeVS ? this.ToTimeVS : ""
    })
    .subscribe(result => {
      this.IsModalLoading = false;
      if (!result.IsError) {
         // ra ngoài, load page.
         this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
         this.variablesService.$reloadFunction.next(true);
         this.router.navigate(['/LateEarlyRequest']);
      }
    });
  }
  doPop(){
    this.location.back();
  }
}
