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
const API_LEAVE_REQUEST = HrmAPIConst.LEAVE_REQUEST;
const API_SYSTEM = HrmAPIConst.SYSTEM;

@Component({
  selector: 'app-otrequest-create',
  templateUrl: './OTRequestCreate.component.html',
  styleUrls: ['./OTRequestCreate.component.scss'],
})

export class OTRequestCreateComponent implements OnInit {
  user;
  Lang;
  FormatHandler = FormatHandler;
  ListOfHistRequest= this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.ListOfHistRequest : [];
  ListKow= [];
  KowSelected;
  ObjConfig;
  ListPayValue= [];
  PayValueSelected;
  PayValueSelectedRoot= {};
  SelectedFromDate= '';
  SelectedToDate= '';
  SelectedFromTime= '';
  SelectedToTime= '';
  txtReason= '';
  txtHourNum= '';
  CheckedIsPay= this.router.getCurrentNavigation().extras.state.IsPay;
  YearSelection= moment().year();
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  IsVisibleKowCode= false;
  IsModalLoading= false;
  PayValue= this.router.getCurrentNavigation().extras.state .PayValue;
  PayValueRoot= this.router.getCurrentNavigation().extras.state .PayValue;
  IsPayDisible= this.router.getCurrentNavigation().extras.state .IsPayDisible;
  HinhThucNghiBu= this.router.getCurrentNavigation().extras.state .HinhThucNghiBu;
  IsVisiblePayValue= false;
  IsHideComboPayValue= false;
  PayValueName= this.router.getCurrentNavigation().extras.state .PayValueName;
  HinhThucDKOT= {};
  ListHinhThucDKOT= [];
  TSTypeCalOTAlloRegis = this.router.getCurrentNavigation().extras.state .TSTypeCalOTAlloRegis;
  LabelHinhThuc= 'Hình thức đăng ký tăng ca';

  LabelLoaiKeHoach='Loại kế hoạch' ;//"Type plan",
  LoaiKeHoach= {};
  ListLoaiKeHoach= [];
  IsVisibleLoaiKeHoach= false;
  OutOfPlan_enable= false;
  msgOutPlanKhacCapDuyet= 'Cấp duyệt khác nhau do có lẫn tăng ca'; //"Level approve differences from each other because of having ot"

  WaitingData=true;
  listfile = [];
  paramfile = {
    FunctionID : '2100', //functionid trên web
    FieldValue: '',
    FieldName:'FileID',
    TableName:'HCSHP_OTRequest',
    FileID : '',
    EmpLogin:'',
    LoginInfo:{}
  };
  IDFile= '';
  FileUpload= null;
  FileName= '';
  itemFunction;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private languageService: LanguageService,
    private router: Router,
    public commonHandler: CommonHandlerService,
    public notification: NotificationsService,
    private reloadFunction: VariableCommonService,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.getLanguage();
    this.initData();
  }
  GenGuid(){
    this.api.post('HrmMobileApp/Employee/GenGuid', 'GenGuid')
        .subscribe((res) => {
            const object = JSON.parse(JSON.stringify(this.paramfile));
            object.FieldValue = res && res.Data ? res.Data : null;
            object.FileID = res && res.Data ? res.Data : null; // thêm mới thì FileID = FieldValue
            this.paramfile = object;
            this.IDFile = res && res.Data ? res.Data : null;
            this.WaitingData = false;
        });
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    if(this.auth.getLanguage() === 'en')
    {
      this.LabelHinhThuc ='Overtime registration form';
      this.LabelLoaiKeHoach ='Type plan';
      this.msgOutPlanKhacCapDuyet ='Level approve differences from each other because of having ot';
    }
    this.GenGuid();
  };

  RequestDate(){
    return FormatHandler.formatDate(new Date(), this.user);
  }
  initData() {
    this.ObjConfig = this.router.getCurrentNavigation()?.extras?.state;
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state?.itemFunction;
    const listKow = this.router.getCurrentNavigation()?.extras?.state.ListKow || [];
    const arrayDefaultKow = this.router.getCurrentNavigation()?.extras?.state.IsSelectOTType && listKow.length > 0 ? listKow[0] : {};
    const lstPayValue = this.router.getCurrentNavigation()?.extras?.state.lstPayValue || [];

    const PayValue = this.router.getCurrentNavigation()?.extras?.state.PayValue ||  null;

    const data = lstPayValue.filter(item => item.PayValue === PayValue?.toString());

    const arrayDefaultPayValueRoot = data[0] || {};
    const formatDate = ((this.user.PRDateFormat || CommonConst.FormatDate) + '').toLocaleUpperCase();
    this.FormatDate= formatDate;
    let arrayDefaultPayValue = data[0] || {};
    if (!this.CheckedIsPay) {
        arrayDefaultPayValue = null;
    }
    let IsHideComboPayValue = true;
    if (lstPayValue != null && lstPayValue.length > 1) {
        IsHideComboPayValue = false;
    }
    this.SelectedFromDate = moment().format();
    this.SelectedToDate = moment().format();
    this.SelectedFromTime= moment().format(CommonConst.FormatHHmm);
    this.SelectedToTime= moment().format(CommonConst.FormatHHmm);
    this.ListKow= listKow;
    this.KowSelected = arrayDefaultKow;
    this.ListPayValue= lstPayValue;
    this.PayValueSelected= arrayDefaultPayValue;
    this.PayValueSelectedRoot = arrayDefaultPayValueRoot;
    this.IsHideComboPayValue= IsHideComboPayValue;

    if(this.TSTypeCalOTAlloRegis === 2)
    {

      this.api.post(API_SYSTEM.Alias_GetValueList, API_SYSTEM.GetValueList,
        { Names: ['HCSSYS_ConfigTS.TSTypeCalOTAlloRegisModel'] })
        .subscribe((result) => {
          if (!result.IsError) {
            const listStatus = result.Data && result.Data['HCSSYS_ConfigTS.TSTypeCalOTAlloRegisModel'] || [];
            const data = listStatus[CommonConst.VALUE_LIST.items] || [];
            this.HinhThucDKOT=data[0] || {},
            this.ListHinhThucDKOT= data.filter(i=>i.Value < 2);
          }
        });
    }

    this.api.post(API_SYSTEM.Alias_GetValueList, API_SYSTEM.GetValueList,
      { Names: ['HCSTS_SetupProcess.OutOfPlan'] })
      .subscribe((result) => {
          if (!result.IsError) {
            this.ListLoaiKeHoach = result.Data && result.Data['HCSTS_SetupProcess.OutOfPlan'][CommonConst.VALUE_LIST.items] || [];
          }
      });
      this.getDefaultValue();
  }
  formatDatedefault = (date)=>{
    let value = '';
    if(!!date)
    {
        const arr = date.split('/');
        try {
            value = arr[2] +'-'+ arr[1] +'-' + arr[0];
            return value;
        }
        catch{
          return new Date();
        }
    }

  }
  getDefaultValue = ()=>{
    const KowSelected = this.KowSelected;
    const SelectedFromDate = this.SelectedFromDate;
    const SelectedToDate = this.SelectedToDate;
    this.api.post('HrmMobileApp/CnB/OTRequest/getValDefault', 'getValDefault',
    {
        KowCode: KowSelected[LeaveAndOTConst.KEY.KowCode] || null,
        BegDate: SelectedFromDate,//this.formatDatedefault(SelectedFromDate),//FormatHandler.formatDate(SelectedFromDate, this.props.LoginInfo).format("YYYY/MM/DD"),//moment(SelectedFromDate, FormatDate).format(CommonConst.FormatSQLDate),
        EndDate: SelectedToDate//this.formatDatedefault(SelectedToDate)//FormatHandler.formatDate(SelectedToDate, this.props.LoginInfo).format("YYYY/MM/DD")
     })
    .subscribe(res => {
        if(res && res.Data && res.Data.length >0)
        {
          this.LoaiKeHoach= {Value: res.Data[0]?.OutOfPlan , Caption: res.Data[0]?.OutOfPlanName},
          this.OutOfPlan_enable= res.Data[0]?.OutOfPlan_enable;
        }
    });
  };
  eventOnSelectedHinhThucDKOT(item)
  {
    if(item){
      this.HinhThucDKOT = item;
    }
  }

  eventOnSelectedLoaiKeHoach(item)
  {
    if(item){
      this.LoaiKeHoach = item;
    }
  }


  eventOnSelectedKowCode(item) {
    if (item) {
        this.KowSelected = item;
        this.getDefaultValue();
    }
  }
  eventOnSelectedFromDate(date) {
    if (date) {
        const formatDate = this.FormatDate;
        const toDate = this.SelectedToDate;
        const moFromDate = moment(date).format(formatDate);
        const moToDate = moment(toDate).format(formatDate);

        if (moFromDate > moToDate) {
            this.SelectedToDate = date;
        }
        this.SelectedFromDate = date;
        this.getDefaultValue();
    }
  }

  eventOnSelectedToDate(date) {
    if (date) {
        const formatDate = this.FormatDate;
        const fromDate = this.SelectedFromDate;

        const moFromDate = moment(fromDate, formatDate);
        const moToDate = moment(date, formatDate);

        if (moFromDate > moToDate) {
            this.SelectedToDate = fromDate;
        } else {
            this.SelectedToDate= date;

        }
        this.getDefaultValue();
    }
}


eventOnSelectedFromTime(time, selectedDate) {
    if (time) {
        // const formatHHmm = CommonConst.FormatHHmm;
        // const toTime = this.SelectedToTime;
        // const moFromTime = moment(time, formatHHmm);
        // const moToTime = moment(toTime, formatHHmm);

        this.SelectedFromTime= time;
    }
}

  eventOnSubmitOTRequest = (IsPassValidate) => {
    this.doSubmit(false);
  };


  eventOnSelectedToTime(time, selectedDate) {
    if (time) {
        this.SelectedToTime=time;
    }
  }

  eventOnChangeTextTime(text) {
    if(text && text.target && text.target.value)
      {this.txtHourNum = text.target.value;}
    else
      {this.txtHourNum = '0';}
  }

  eventOnCheckedIsPay() {
    this.CheckedIsPay = !this.CheckedIsPay;
    this.PayValueSelected = this.CheckedIsPay ? this.PayValueSelectedRoot : null;
    this.PayValue = this.CheckedIsPay ? this.PayValueRoot : null;
  }

  eventOnSelectedPayValue(item) {
    if (item) {
        this.PayValueSelected= item;
    }
  }



  doSubmit = async (IsPassValidate) => {
    const kowSelected = this.KowSelected && this.KowSelected[LeaveAndOTConst.KEY.KowCode] || null;
    const formatDate = this.FormatDate;
    const formatTime = CommonConst.FormatHHmm;
    const selectedFromDate = this.SelectedFromDate;
    const selectedToDate = this.ObjConfig.IsFieldVisibleToDate ? this.SelectedToDate : this.SelectedFromDate;
    const isSelectOTType = this.ObjConfig.IsSelectOTType;
    let fromTime = this.SelectedFromTime;
    let toTime = this.SelectedToTime;
    let hourNum = 0;

    if (!kowSelected && isSelectOTType) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterKowCode);
        return;
    }
    else if (!selectedFromDate) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterFromDate);
        return;
    }

    if (this.ObjConfig.IsRegOTByFromTo) {
        if (!fromTime || !moment(fromTime, formatTime).isValid()) {
          this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTime);
          return;
        }
        else if (!toTime || !moment(toTime, formatTime).isValid()) {
          this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTime);
          return;
        }
    }
    else {
        fromTime = null;
        toTime = null;
        const text = this.txtHourNum?.trim();
        if (text && !Number.isNaN(text) && !Number.isNaN(+text) &&
            typeof +text == 'number' && +text > 0) {
            hourNum = +text;
        } else {
          this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterHourNum);
          return;
        }
    }
    const loading = await this.notification.showLoading();
    this.api.post(HrmAPIConst.OT_REQUEST.Alias_CreateOTRequest, HrmAPIConst.OT_REQUEST.CreateOTRequest,
        {
            KowCode: kowSelected,
            BegDate: selectedFromDate,
            EndDate: selectedToDate,
            Reason: this.txtReason,
            Note: this.txtReason,
            FromTime: fromTime,
            ToTime: toTime,
            HourNum: hourNum,
            IsPay: this.CheckedIsPay,
            ListOfHistRequest: this.ListOfHistRequest,
            PayValue: this.PayValue,
            IsPassValidate,
            TSTypeCalOTAlloRegis: this.HinhThucDKOT['Value'] ? this.HinhThucDKOT['Value'] : 0,
            OutOfPlan: !this.LoaiKeHoach['Value'] ? 0 : this.LoaiKeHoach['Value'],
            FileID: this.IDFile
        })
        .subscribe((result) => {
            loading.dismiss();
            if (result && result.Data != null && result.Data.CountErr === '55') {
              this.presentAlert(this.Lang.COMMON.Alert, result.Data.ErrStr + '(' +this.Lang.COMMON.DongYDeBoQua + ')');
            }
            else if(result && result.Data != null && result.Data.ErrStr == "msgOutPlanKhacCapDuyet")
            {
               this.notification.alert(this.Lang.COMMON.Error,this.msgOutPlanKhacCapDuyet);
            }
            else {
                if (result && !result.Error) {
                    this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess,()=>{
                      this.reloadFunction.$reloadFunction.next(true);
                      this.router.navigate(['/OTRequest']);
                  });

                }
            }
        });
  };

   presentAlert= async (header,message) =>{
    this.notification.alertInput(header,this.Lang.COMMON.Cancel,this.Lang.COMMON.OK,(data)=>{
      this.doSubmit(true);
    },message);
  };

  eventSelectefromtime(item){

    this.SelectedFromTime =  item;
  }
  eventSelectetotime(item){
    this.SelectedToTime = item;
  }

  doPop(){
    this.router.navigate(['/OTRequest']);
  }

}
