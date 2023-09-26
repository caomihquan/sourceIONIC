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

const API_LEAVE_REQUEST = HrmAPIConst.EXTRADAYOFF_REQUEST;
const API_BUSINESS_TRIP = HrmAPIConst.BUSINESS_TRIP;
const API_EXTRA_REQUEST = HrmAPIConst.EXTRADAYOFF_REQUEST;

@Component({
  selector: 'app-ExtraDayOffRequestCreate',
  templateUrl: './ExtraDayOffRequestCreate.component.html',
  styleUrls: ['./ExtraDayOffRequestCreate.component.scss'],
})

export class ExtraDayOffRequestCreateComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  RemainLeaveNumber= [];
  SetupProcess = {};
  IsActivePleaseCancel= false;
  IsModalLoading= false;
  txtReason= '';
  IsRequireWriteReason  = false;
  showAlertDialog= false;
  NguoiThayThe = '';
  IsShow= false;
  IsRequireChoose= false;
  Lang: any;
  user: any;
  LoginInfo: any;
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  FormatDateViewUI = CommonConst.FormatDate.toLocaleUpperCase();// loginInfo.PRDateFormat || CommonConst.FormatDate
  DowCodeSelection = { DowCode: (new Date()).getFullYear() };
  CurrentDate  =  FormatHandler.formatDate(new Date(), this.auth.get());;
  lstDows = this.commonHandler.getYearsOfDow();
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
  DayNum= '1';
  KowType= 0;
  HourNum= '0';
  FromTime;
  ToTime;
  lstNguoiThayThe = [];
  DefaultToDate = this.router.getCurrentNavigation().extras?.state?.DefaultFromDate || null;
  DefaultFromDate = this.router.getCurrentNavigation().extras?.state?.DefaultToDate || null;
  modelConfigTSEmp = {};
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

  ngOnInit() {
    this.LoginInfo = this.auth.get();
    this.FormatDateViewUI =  this.LoginInfo.PRDateFormat || CommonConst.FormatDate.toLocaleUpperCase();
    this.componentDidMount();
    this.getLanguage();
    debugger
    this.itemFunction = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.itemFunction : {};
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.loadConfigDayNum();
    this.initData();
    this.loadListKow();
    this.loadListLeave();
    this.loadNguoiThayThe();
  };
  loadNguoiThayThe()
  {
    this.api.post('HrmMobileApp/Employee/GetEmpActive','GetEmpActive',
    {
    })
    .subscribe(res => {
        if(res && res.Data)
        {
          this.lstNguoiThayThe = res.Data.Data;
        }
    });
  }
  loadConfigDayNum = () => {
    this.api.post(API_LEAVE_REQUEST.Alias_GetConfigCustomerDayNum, API_LEAVE_REQUEST.GetConfigCustomerDayNum,
    {
    })
    .subscribe(res => {
        this.UseDayNum= res && res.Data.length > 0 ? (res.Data[0].Value === 1 ? true : false) : false;
    });
  };
  initData() {
    const fromDate = this.DefaultFromDate ? this.DefaultFromDate : new Date();
    const toDate = this.DefaultToDate ? this.DefaultToDate : new Date();
    this.SelectedFromDate= fromDate;//FormatHandler.formatDate(fromDate, this.LoginInfo),
    this.SelectedToDate = toDate;//FormatHandler.formatDate(toDate, this.LoginInfo)
  }

  updateEndDateFromDayNum(Option) {
    this.api.post(API_EXTRA_REQUEST.Alias_GetToDate, API_EXTRA_REQUEST.GetToDate,
    {
          KowCode: this.LeaveKowsSelected ? this.LeaveKowsSelected[LeaveAndOTConst.KEY.KowCode] : null,
          BegDate:this.SelectedFromDate,
          LeavePeriod: this.LeaveTimeSelected ? this.LeaveTimeSelected[LeaveAndOTConst.KEY.Value] : null,
          ProcessID: 1,
          DayNum: this.DayNum && this.DayNum !== '' ? this.DayNum : 1
      })
      .subscribe(res => {
            //this.SelectedToDate = (res && res.Data) ? FormatHandler.formatDate(res.Data.OutputParams?.EndDate, this.LoginInfo) : ''
            this.SelectedToDate = (res && res.Data) ? res.Data.OutputParams?.EndDate : ''

          });
  }

  componentDidMount = ()=> {
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe','GetConfigNguoiThayThe',
      {
        ProcessID: 1
      })
      .subscribe(res => {
        this.IsShow= res.Data.ShowNguoiThayThe.length > 0? true : false,
        this.IsRequireChoose= res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;

      });
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
    this.api.post(API_EXTRA_REQUEST.Alias_GetListKows,API_EXTRA_REQUEST.GetListKows,
      {
      })
      .subscribe(result => {
        if (!result.IsError) {
          const leaveKows = result.Data.lstkows;
          if(this.auth.getLanguage() === 'en'){
            leaveKows.forEach(x =>{
              x.KowName = x.KowName2;
            });
          }
          this.LeaveKows= leaveKows;
          this.LeaveKowsSelected = leaveKows ? leaveKows[0] : {};
        }
        if (!result.IsError) {
          this.IsRequireWriteReason= result.Data.setupprocess && result.Data.setupprocess.length > 0 ? result.Data.setupprocess[0].IsRequireReason : false
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
              (ele + "") == item[LeaveAndOTConst.KEY.Value]));
          const selected = data[0] || {};
          this.LeaveTimes= data;
          this.LeaveTimeSelected= selected;
        }
    });
  }
  FieldKeyInputKow(){
    return this.auth.getLanguage() === 'en' ? 'KowName2' : 'KowName';
  }
  eventSelectedMonth(item) {
    this.DowCodeSelection = item;
  }
  eventSelectedKow(item) {
    this.LeaveKowsSelected = item;
    this.updateEndDateFromDayNum('0');
  }
  eventSelectedatetime(date){
    if (date) {
      const formatDate = this.FormatDate;
      const toDate = this.SelectedToDate;
      const moFromDate = moment(date, formatDate);
      const moToDate = moment(toDate, formatDate);

      if (moFromDate > moToDate) {
          this.SelectedToDate =  date ;
      }
      this.SelectedFromDate  = date;
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
      this.updateEndDateFromDayNum('5');
    }
  }
  eventSelectedLeave(item)
  {
    if (item) {
      let _daynum = '';
      this.api.post(API_BUSINESS_TRIP.Alias_GetDayNumWithLeavePeriod, API_BUSINESS_TRIP.GetDayNumWithLeavePeriod,
      {
        LeavePeriod: item.Value
      })
      .subscribe(res => {
        if (res && res.Data) {
            _daynum = res.Data.OutputParams.Result.toString();
        }

        this.LeaveTimeSelected =  item;
        this.IsVisibleLeaveTime= false;
        this.DayNum= _daynum ? _daynum : '';
        this.FromTime=null;
        this.ToTime = null;
        this.updateEndDateFromDayNum('2');
      });
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

  eventOnEditDayNumChange(value) {
    this.updateEndDateFromDayNum('4');
  }
  eventOnChangeTimeSelected = (value) => {
    value = (value + '').replace(',', '.').replace(/,/g, '');
    if (value && false === Number.isNaN(+value)) {
        this.DayNum = value + '';
    } else {
      this.DayNum= '';
      this.SelectedToDate= '';
    }
};
  eventOnEditHourNumChange() {
    this.updateEndDateFromDayNum('3');
  }
  eventOnSelectedNguoiThayThe(item)
  {
    this.NguoiThayThe = item;
  }
  doSubmit(IsIgnoreForetell) {
    const formatDate = this.FormatDate;
    const kowCode = this.LeaveKowsSelected ? this.LeaveKowsSelected[LeaveAndOTConst.KEY.KowCode] : null;
    const selectedFromDate = this.SelectedFromDate;
    const selectedToDate = this.SelectedToDate;
    const leavePeriod = this.LeaveTimeSelected ? this.LeaveTimeSelected[LeaveAndOTConst.KEY.Value] : null;

    let IsRequireWriteReason = this.IsRequireWriteReason;
    let txtReason  = this.txtReason;
    if (!kowCode) {
       this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTime, null,null,['btnsubmit']);
        return;
    }
    else if (!selectedFromDate) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterFromDate, null,null,['btnsubmit']);
        return;
    }
    else if (!selectedToDate) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterToDate, null,null,['btnsubmit']);
        return;
    }
    else if (!leavePeriod) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTime, null,null,['btnsubmit']);
        return;
    }
    else if (IsRequireWriteReason == true && (txtReason == '' || txtReason == null)) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterNote, null,null,['btnsubmit']);
        return;
    }
    else if (this.IsRequireChoose && this.IsShow && (!this.NguoiThayThe || !this.NguoiThayThe['EmployeeCode'])) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.chonnguoithaythe, null,null,['btnsubmit']);
        return;
    }
    let FromTime = this.FromTime;
    let ToTime = this.ToTime;
    if (leavePeriod == 6) {
        if (FromTime == null) {
            this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTimeSelected, null,null,['btnsubmit']);
            return;
        }
        if (ToTime == null) {
            this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTimeSelected, null,null,['btnsubmit']);
            return;
        }
    }

    this.IsModalLoading = true;
    if (selectedFromDate && selectedToDate && leavePeriod) {
      this.api.post(API_EXTRA_REQUEST.Alias_CreateExtraDayOffRequest, API_EXTRA_REQUEST.CreateExtraDayOffRequest,
      {
          KowCode: kowCode,
          BegDate: selectedFromDate,
          EndDate: selectedToDate,
          LeavePeriod: leavePeriod,
          Reason: this.txtReason,
          OldDay: this.RemainLeaveNumber && this.RemainLeaveNumber['LastLeave'] || 0,
          CurDay: this.RemainLeaveNumber && this.RemainLeaveNumber['CurrLeave'] || 0,
          ListOfHistRequest: this.ListOfHistRequest,
          EmployeeAttendance: this.EmployeeAttendance,
          FromTime: FromTime,
          ToTime: ToTime,
          IsIgnoreForetell: IsIgnoreForetell,
          DayNum: this.DayNum && this.DayNum != '' ? this.DayNum : 1,
          ContactEmployee: this.NguoiThayThe && this.NguoiThayThe['EmployeeCode'] || null
      })
      .subscribe(result => {
          this.IsModalLoading = false;
          if (result && result.Data != null && result.Data.CountErr == "2" && !IsIgnoreForetell) {
            this.presentAlert(this.Lang.COMMON.Alert, '', result.Data.ErrStr + "(" +this.Lang.COMMON.DongYDeBoQua + ")",  this.onDialogAccept)
          }
          else if(result && result?.Data != null && result?.Data?.ErrStr
            && result?.Data?.ErrStr != "" && IsIgnoreForetell)
          {
            this.notification.alert(this.Lang.COMMON.Error,result?.Data?.ErrStr, null,null,['btnsubmit']);
            return;
          }
          else {
              if (!result.IsError) {
                this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
                this.router.navigate(['/ExtraDayOffRequest']);
              }
          }
      });
    }
  }
  doPop(){
    this.router.navigate(['/ExtraDayOffRequest']);
  }
  onDialogAccept() {
    this.doSubmit(true);
  }
  async presentAlert(header,subHeader,message,callback) {
    const alert = await this.alertController.create({
      header ,
      //subHeader: subHeader,
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
          this.doSubmit(true);
        },
      }
    ]
    });

    await alert.present();
  }

}
