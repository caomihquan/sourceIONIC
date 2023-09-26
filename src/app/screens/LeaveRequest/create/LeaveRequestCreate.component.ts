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

@Component({
  selector: 'app-leaverequestcreate',
  templateUrl: './LeaveRequestCreate.component.html',
  styleUrls: ['./LeaveRequestCreate.component.scss'],
})

export class LeaveRequestCreateComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  RemainLeaveNumber;
  SetupProcess;
  IsActivePleaseCancel= false;
  IsModalLoading;
  txtReason= '';
  showAlertDialog= false;
  NguoiThayThe;
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
  LeaveTimeSelected;
  SILeaveNo =  null;
  SoCon = null;
  NgaySinhCon = new Date();
  LoaiSinh= [];
  LoaiSinhSelected= {};
  IsNewChildUnder32W= false;
  SoNgayCheDo = null;
  SoNgayDaNghi = null;
  ListOfHistRequest=[];
  IsEmployeeAttendance =false;
  EmployeeAttendance = '';
  WorkDateAttendance = null;
  IsVisibleLeaveType = false;
  IsVisibleLeaveTime = false;
  IsVisibleLoaiSinh: false;
  DayNum= '1';
  IsShowAlert= false;
  IsSinhThuong= true;
  IsSinhMo= false;
  BirthDayChill = '';
  KowType= 0;
  HourNum= '0';
  FromTime;
  ToTime;
  lstNguoiThayThe = [];

  WaitingData=true;
  listfile = [];
  paramfile = {
    FunctionID : '1300', //functionid trên web
    FieldValue: '',
    FieldName:'FileID',
    TableName:'HCSHP_LeaveRequest',
    FileID : '',
    EmpLogin:'',
    LoginInfo:{}
  };
  IDFile= '';
  FileUpload= null;
  FileName= '';
  itemFunciton: any;


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
    this.LoginInfo = this.auth.get();
    this.FormatDateViewUI =  this.LoginInfo.PRDateFormat || CommonConst.FormatDate.toLocaleUpperCase();
    this.RequestData = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.RequestData : {};
    this.SetupProcess =this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.SetupProcess : {};
    this.ListOfHistRequest =this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.ListOfHistRequest : {};
    this.RemainLeaveNumber = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.RemainLeaveNumber : {};
    this.itemFunciton = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.itemFunction : {};
    this.getLanguage();

  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.initData();
    this.componentDidMount();
    this.loadListKow();
    this.loadListLeave();
    this.loadLoaiSinh();
    this.loadNguoiThayThe();
    this.GenGuid();

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
  initData() {
    this.paramfile.EmpLogin = this.user.EmployeeCode;
    this.paramfile.LoginInfo = this.user;
    this.api.post('HrmMobileApp/CnB/CheckInOut/GetDateTime',null,{
      ProcessID: 0 }).subscribe(result => {
      const data = result && result.Data || {};
      const fromDate = this.IsEmployeeAttendance ? this.WorkDateAttendance : data.DateTime;
      this.DayNum = '1';
      this.SelectedFromDate= fromDate;//FormatHandler.formatDate(fromDate, this.LoginInfo);
      this.BirthDayChill= FormatHandler.formatDate(fromDate, this.LoginInfo);
    });
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
  updateEndDateFromDayNum(Option) {

    if (Option == null) {Option = '0';}
    const formatDate = this.FormatDate;
    const leavePeriod = this.LeaveTimeSelected ? this.LeaveTimeSelected[LeaveAndOTConst.KEY.Value] : null;
    const kowCode = this.LeaveKowsSelected ? this.LeaveKowsSelected[LeaveAndOTConst.KEY.KowCode] : null;

    if (!this.DayNum || !this.SelectedFromDate || !kowCode || !leavePeriod) {return;}
    let EndDate = null;
    const BegDate = moment(this.SelectedFromDate, CommonConst.FormatSQLDate).format(CommonConst.FormatSQLDate);
    if (this.SelectedToDate != null && this.SelectedToDate !== '') {
        EndDate = moment(this.SelectedToDate, CommonConst.FormatSQLDate).format(CommonConst.FormatSQLDate);
    }
    else {
        EndDate = BegDate;
    }
    let HourNum = '0';
    if (this.HourNum != null && this.HourNum !== '') {
        HourNum = this.HourNum + '';
    }
    let DayNum = '0';
    if (this.DayNum != null)
        {DayNum = this.DayNum;}

   // var BirthDayChill = moment(this.BirthDayChill, formatDate).format(CommonConst.FormatSQLDate);
   const BirthDayChill = moment(this.BirthDayChill, CommonConst.FormatSQLDate);
    this.api.post('HrmMobileApp/CnB/BusinessTripRequest/GetEndDateFromNumDay_Leave',null,
    {
        ProcessID: 0,
        KowCode: kowCode,
        DayNum,
        HourNum,
        FromTime: this.FromTime,
        ToTime: this.ToTime,
        BegDate,
        EndDate,
        LeavePeriod: leavePeriod,
        IsEmployeeAttendance: this.IsEmployeeAttendance,
        EmployeeAttendance: this.EmployeeAttendance,
        Option,
        IsSinhThuong: this.IsSinhThuong,
        IsSinhMo: this.IsSinhMo,
        BirthDayChill,
        SoCon: this.SoCon,
        IsNewChildUnder32W: this.IsNewChildUnder32W
      })
      .subscribe(result => {
        if (!result.IsError) {
          const data = result.Data || {};
          const outputParams = data.OutputParams || {};
          const toDate = outputParams.EndDateOut;
          const moToDate = toDate ;//FormatHandler.formatDate(toDate, this.LoginInfo);
          const KowType = outputParams.KowType;
          const HourNumOut = outputParams.HourNumOut;
          const DayNumOut = outputParams.DayNumOut;
          if (KowType == 24) {
              const lstOfPed = this.LeaveTimes.filter(item => item.Value == 4);
              if (lstOfPed == null || lstOfPed.length == 0) {
                  const LeaveKowsSelected = this.LeaveKows[0];
                  this.eventSelectedKow(LeaveKowsSelected);
                  this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.ChuaThietLapHangNgayTheoGio, null,null,['btnReject']);
                  return;
              }
              this.SelectedToDate = moToDate;
              this.KowType = KowType;
              this.LeaveTimeSelected = lstOfPed[0];
              this.HourNum = HourNumOut + '';
              this.DayNum = DayNumOut + '';
          }
          else {
              //nghi vo sinh
              if (KowType == 36) {
                  const SoNgayCheDo = outputParams.SoNgayCheDo;
                  const SoNgayDaNghi = outputParams.SoNgayDaNghi;
                  this.KowType= KowType;
                  this.SelectedToDate= moToDate;
                  this.SoNgayCheDo= SoNgayCheDo;
                  this.SoNgayDaNghi= SoNgayDaNghi;
              }
              else {
                  const leavePeriod = this.LeaveTimeSelected ? this.LeaveTimeSelected[LeaveAndOTConst.KEY.Value] : null;
                  if (leavePeriod == '4') {
                      this.KowType= KowType;
                      this.DayNum= DayNumOut + '';
                      this.SelectedToDate= moToDate;
                  }
                  else {
                    this.SelectedToDate= moToDate;
                    this.KowType= KowType;
                    this.DayNum= DayNumOut + '';
                  }
              }
          }

      }
      });
}

  componentDidMount = ()=> {
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe','GetConfigNguoiThayThe',
      {
        ProcessID: 0
      })
      .subscribe(res => {
        this.IsShow= res.Data.ShowNguoiThayThe.length > 0? true : false,
        this.IsRequireChoose= res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
      });
      const formatDate = this.FormatDate;
      if (this.RequestData) {
        this.RequestData.CreateDateView = moment(this.RequestData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        this.RequestData.BegDateView = FormatHandler.formatDate(this.RequestData.BegDate, this.LoginInfo);
        this.RequestData.EndDateView = FormatHandler.formatDate(this.RequestData.EndDate, this.LoginInfo);
        this.RequestData.NgaySinhCon = FormatHandler.formatDate(this.RequestData.NewChildBirthDate, this.LoginInfo);
    }
  };

  loadListKow() {
    this.api.post(API_LEAVE_REQUEST.Alias_GetListKows,API_LEAVE_REQUEST.GetListKows,
      {
        ProcessID: 0
      })
      .subscribe(result => {
        if (!result.IsError){
          const data = result.Data || [];
          const leaveKows = data.LeaveKows || [];

          const lstOfLeavedPN = leaveKows.filter(item => item.KowType == 15);

          let firstLeaveKows = leaveKows ? leaveKows[0] : {};
          if (lstOfLeavedPN.length > 0) {
              firstLeaveKows = lstOfLeavedPN[0];
          }
          this.LeaveKows = leaveKows;
          this.LeaveKowsSelected= firstLeaveKows;
          this.updateEndDateFromDayNum('0');
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
          //tgian nghỉ phép đang lấy theo const [1,3,5] chờ a trường coi lại
          const listOfLeavePeriod = LeaveAndOTConst.ListOfLeavePeriod;
          data = data.filter(item => listOfLeavePeriod.find(ele =>
              (ele + '') == item[LeaveAndOTConst.KEY.Value]));
          //========================================
          const selected = data[0] || {};
          this.LeaveTimes= data;
          this.LeaveTimeSelected= selected;
          this.updateEndDateFromDayNum('0');
      }

    });
  }

  loadLoaiSinh() {
    this.api.post('HrmMobileApp/System/GetValueList','GetValueList',
    {
      Names: ['LNewChildBirthType']
    })
    .subscribe(result => {
      if (!result.IsError) {
        const listOfData = result.Data && result.Data.LNewChildBirthType || [];
        const data = listOfData.items || [];
        const selected = data[0] || {};
        this.LoaiSinh= data;
        this.LoaiSinhSelected =  selected;
      }
    });
  }

  eventSelectedMonth(item) {
    this.DowCodeSelection = item;
  }
  eventSelectedKow(item) {
    this.LeaveKowsSelected = item;
    this.updateEndDateFromDayNum('0');
  }

  eventSelectedLoaiSinh(item) {
    if (item) {
      if (item.Value == '2') {
        this.IsSinhThuong= false;
        this.IsSinhMo= true;
        this.IsVisibleLoaiSinh= false;
        this.LoaiSinhSelected= item;
      }
      else {
        this.IsSinhThuong= true;
        this.IsSinhMo= false;
        this.IsVisibleLoaiSinh= false;
        this.LoaiSinhSelected= item;
      }
      this.updateEndDateFromDayNum('2');
    }
  }

  eventSelecteNgaySinhCon(item) {
    this.NgaySinhCon= item;
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
      this.api.post('HrmMobileApp/CnB/BusinessTripRequest/GetDayNumWithLeavePeriod', 'GetDayNumWithLeavePeriod',
      {
        LeavePeriod: item.Value
      })
      .subscribe(res => {
        if (res && res.Data) {
            _daynum = res.Data.OutputParams.Result.toString();
        }

        this.LeaveTimeSelected =  item;
        this.IsVisibleLeaveTime= false;
        this.DayNum= _daynum;
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
    if (value && false == Number.isNaN(+value)) {
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
  async doSubmit(IsIgnoreForetell) {
    const formatDate = this.FormatDate;
    const kowCode = this.LeaveKowsSelected ? this.LeaveKowsSelected[LeaveAndOTConst.KEY.KowCode] : null;
    const selectedFromDate = this.SelectedFromDate;
    const selectedToDate = this.SelectedToDate;
    const leavePeriod = this.LeaveTimeSelected ? this.LeaveTimeSelected[LeaveAndOTConst.KEY.Value] : null;
    const decPlaceUpDown = Number(this.SetupProcess.DecPlaceUpDown);
    let dayNum = 0;
    let hourNum = 0;
    let DailyNumHour = '0';
    if (leavePeriod == 4) {
        DailyNumHour = this.HourNum;
    }
    if (this.DayNum && false == Number.isNaN(+this.DayNum)) {
        const tmpDayNum = Number.parseFloat(this.DayNum) || 0;
        dayNum = tmpDayNum > 0 ? tmpDayNum : 0;
        hourNum = dayNum * 8;
    }
    const FromTime = this.FromTime;
    const ToTime = this.ToTime;
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
    else if (!dayNum) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterHourDay, null,null,['btnsubmit']);
        return;
    }
    else if (decPlaceUpDown !== 0 && !Number.isNaN(decPlaceUpDown) && (dayNum % decPlaceUpDown !== 0)){
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterHourDayNumberIncrease, null,null,['btnsubmit']);
        return;
    }
    else if (this.IsRequireChoose && this.IsShow && (!this.NguoiThayThe || !this.NguoiThayThe.EmployeeCode)) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.chonnguoithaythe, null,null,['btnsubmit']);
        return;
    }
    let NewChildBirthDate = null;
    if (this.BirthDayChill && true == moment(this.BirthDayChill, formatDate).isValid()) {
        NewChildBirthDate = moment(this.BirthDayChill, formatDate).format(CommonConst.FormatSQLDate);
    }
    const NewChildBirthType = this.LoaiSinhSelected ? this.LoaiSinhSelected[LeaveAndOTConst.KEY.Value] : null;
    this.IsModalLoading = await this.notification.showLoading();
    if (selectedFromDate && selectedToDate && leavePeriod) {
      this.api.post('HrmMobileApp/CnB/LeaveRequest/CreateLeaveRequest', 'CreateLeaveRequest',
      {
                DayNum: dayNum,
                HourNum: hourNum,
                DailyNumHour,
                KowCode: kowCode,
                BegDate: selectedFromDate,
                EndDate: selectedToDate,
                LeavePeriod: leavePeriod,
                Reason: this.txtReason,
                OldDay: this.SetupProcess.RemainLeaveNumber && this.SetupProcess.RemainLeaveNumber.OldDay || 0,
                CurDay: this.SetupProcess.RemainLeaveNumber && this.SetupProcess.RemainLeaveNumber.CurDay || 0,
                ListOfHistRequest: this.ListOfHistRequest,
                IsEmployeeAttendance: this.IsEmployeeAttendance,
                EmployeeAttendance: this.EmployeeAttendance,
                SILeaveNo: this.SILeaveNo,
                NewChildBirthDate,
                NewChildBirthType,
                NewChildNum: this.SoCon,
                IsNewChildUnder32W: this.IsNewChildUnder32W,
                FromTime: this.FromTime,
                ToTime: this.ToTime,
                IsIgnoreForetell,
                ContactEmployee: this.NguoiThayThe && this.NguoiThayThe.EmployeeCode || null,
                FileID: this.IDFile,
      })
      .subscribe(result => {
          this.IsModalLoading.dismiss();
          if (result && result?.Data != null && result?.Data?.CountErr == '2' && !IsIgnoreForetell) {
            this.presentAlert(this.Lang.COMMON.Alert, result.Data.ErrStr + '(' +this.Lang.COMMON.DongYDeBoQua + ')');
          }
          else if(result && result?.Data != null && result?.Data?.ErrStr
                    && result?.Data?.ErrStr !== "" && IsIgnoreForetell)
          {
            this.notification.alert(this.Lang.COMMON.Error,result?.Data?.ErrStr, null,null,['btnsubmit']);
            return;
          }
          else {
              if (result && !result.Error) {
                  this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess,()=>{
                    this.reloadFunction.$reloadFunction.next(true);
                    this.router.navigate(['/LeaveRequest']);
                  });
              }
          }
      });
    }
  }
  doPop(){
    this.router.navigate(['/LeaveRequest']);
  }
  onDialogAccept() {
    this.doSubmit(true);
  }
  async presentAlert(header,message) {
    this.notification.alertInput(header,this.Lang.COMMON.Cancel,this.Lang.COMMON.OK,(data)=>{
      this.doSubmit(true);
    },message);
  }

}
