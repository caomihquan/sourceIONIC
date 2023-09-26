/* eslint-disable @typescript-eslint/prefer-for-of */
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
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
const primaryMoment = moment();
const COMMON_CONST = CommonConst;
const API_OT_GROUP_REQUEST = HrmAPIConst.OT_GROUP_REQUEST;
const IsCheck = 'IsCheck';
const API_SYSTEM = HrmAPIConst.SYSTEM;
const KEY_SCENE = CommonConst.SCENE;


@Component({
  selector: 'app-otrequest-create',
  templateUrl: './OTGroupRequestCreate.component.html',
  styleUrls: ['./OTGroupRequestCreate.component.scss'],
})
export class OTGroupRequestCreateComponent implements OnInit {
  user;
  Lang;
  FormatHandler = FormatHandler;
  ListOfHistRequest= this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.ListOfHistRequest : [];
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
  LeaveAndOTConst = LeaveAndOTConst;
  YearSelection= moment().year();
  IsVisibleModal = false;
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  IsVisibleKowCode= false;
  IsModalLoading= false;
  IsVisiblePayValue= false;
  IsHideComboPayValue= false;
  ParamsEmployee=this.initParamsEmployee();
  ListKow =[];
  ListOTPeriod=[];
  OTPeriodSelected;
  labelDate=new Date();
  labelToTime=new Date();
  labelFromTime=new Date();
  ListEmployee=[];
  LenEmployee=0;
  FilterEmployeeForManager=null;
  FilterEmployeeForManagerSelected;
  CheckedIsPay=false;
  CheckedIsPayEdit = false;
  tabName=LeaveAndOTConst.TAB.Infomation;
  IsVisibleOTPeriod=false;
  IsShowDialogEmployee=false;
  IsCheckedAll=false;
  IsFieldVisibleLPeriod=false;
  Configs;
  HinhThuc=[];
  IsCheckAllFilter;
  FunctionInfo;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  TotalItems = 0;
  listRequest=[];
  Employee;
  HinhThucSelected;
  HinhThucSelectedCurr;
  LabelLoaiKeHoach='Loại kế hoạch' ;//"Type plan",
  LoaiKeHoach= {};
  ListLoaiKeHoach= [];
  IsVisibleLoaiKeHoach= false;
  OutOfPlan_enable= false;
  msgOutPlanKhacCapDuyet= 'Cấp duyệt khác nhau do có lẫn tăng ca'; //"Level approve differences from each other because of having ot"

  WaitingData=true;
  listfile = [];
  paramfile = {
    FunctionID : '2400', //functionid trên web
    FieldValue: '',
    FieldName:'FileID',
    TableName:'HCSHP_OTGroupRequest',
    FileID : '',
    EmpLogin:'',
    LoginInfo:{}
  };
  IDFile= '';
  FileUpload= null;
  FileName= '';


  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private languageService: LanguageService,
    private router: Router,
    public CommonHandler: CommonHandlerService,
    public notification: NotificationsService,
    private reloadFunction: VariableCommonService,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.FunctionInfo = this.router.getCurrentNavigation()?.extras?.state?.FunctionList;
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
  onInitEdit(){
    this.api.post(HrmAPIConst.OT_GROUP_REQUEST.Alias_SaveIsPayOTGroup, HrmAPIConst.OT_GROUP_REQUEST.SaveIsPayOTGroup,
        {
            ID: this.ListEmployee.filter(n => n.IsCheck)[0].ID,
            Option:2
        })
        .subscribe((res) => {
            let itemhinhthuc=[];
            if(res && res.Data.length > 0)
            {
                 itemhinhthuc = this.HinhThuc.filter(n=>n.PayValue === res.Data[0].PayValue);
            }
            this.Employee = res && res.Data.length > 0 ? res.Data[0] : {};
            this.HinhThucSelected = itemhinhthuc.length > 0 ? itemhinhthuc[0] : {};
            this.HinhThucSelectedCurr =itemhinhthuc.length > 0 ? itemhinhthuc[0] : { PayValue: 0, PayValueName: ''};
            this.CheckedIsPayEdit = res && res.Data.length > 0  && res.Data[0].IsPay ? true : false;
        });
  }


  onSave = ()=>{
    if(this.Employee.IsPayDisible)
    {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.IsPayDisible);
        return;
    }
    let PayValueName ='';
    if(this.HinhThuc)
    {
        const lstht = this.HinhThuc;
        const item = lstht.filter(i=>i.PayValue === this.HinhThucSelectedCurr.PayValue);
        PayValueName = item.length > 0 ? item[0].PayValueName : this.HinhThucSelectedCurr.PayValueName;
    }
    this.api.post(HrmAPIConst.OT_GROUP_REQUEST.Alias_SaveIsPayOTGroup, HrmAPIConst.OT_GROUP_REQUEST.SaveIsPayOTGroup,
    {
        ID: this.Employee.ID,
        IsPay : this.CheckedIsPay ? this.CheckedIsPay : false,
        PayValue: this.HinhThucSelectedCurr.PayValue,
        PayValueName,
        Option:1
    })
    .subscribe((res) => {
        this.setOpenModal(false);
        if(res && res.Data.length > 0)
        {
          this.OnUpdateFilterEmpAfterSave(res.Data[0]);
        }
    });
  };


  initOptions() {
    this.PageIndex = 0;
    this.TotalItems = 0;
    this.listRequest = [];
    this.TotalItems = 0;
    this.currentItems = 0;
  }
  RequestDate(){
    return FormatHandler.formatDate(new Date(), this.user);
  }
  initData() {
        this.SelectedFromDate = moment().format();
        this.SelectedFromTime = moment().format(CommonConst.FormatHHmm),
        this.SelectedToTime = moment().format(CommonConst.FormatHHmm),
        this.durationHourNum();
        const formatDate = ((this.user.PRDateFormat || COMMON_CONST.FormatDate) + '').toLocaleUpperCase();
        this.FormatDate =  formatDate;
        this.api.post(API_SYSTEM.Alias_GetValueList, API_SYSTEM.GetValueList,
          { Names: ['HCSTS_SetupProcess.OutOfPlan'] })
          .subscribe((result) => {
              if (!result.IsError) {
                this.ListLoaiKeHoach = result.Data && result.Data['HCSTS_SetupProcess.OutOfPlan'][CommonConst.VALUE_LIST.items] || [];
              }
          });
          this.loadConfig();
  }
  getDefaultValue = ()=>{
    let KowSelected = this.KowSelected;
    let SelectedFromDate = this.SelectedFromDate;
    let SelectedToDate = this.SelectedFromDate;
    this.api.post("HrmMobileApp/CnB/OTRequest/getValDefault", 'getValDefault',
    {
        KowCode: KowSelected?.Value || null,
        BegDate: SelectedFromDate,//this.formatDatedefault(SelectedFromDate),//FormatHandler.formatDate(SelectedFromDate, this.props.LoginInfo).format("YYYY/MM/DD"),//moment(SelectedFromDate, FormatDate).format(CommonConst.FormatSQLDate),
        EndDate: SelectedToDate//this.formatDatedefault(SelectedToDate)//FormatHandler.formatDate(SelectedToDate, this.props.LoginInfo).format("YYYY/MM/DD")
     })
    .subscribe(res => {
        if(res && res.Data && res.Data.length >0)
        {
          this.LoaiKeHoach= {Value: res.Data[0]?.OutOfPlan , Caption: res.Data[0]?.OutOfPlanName},
          this.OutOfPlan_enable= res.Data[0]?.OutOfPlan_enable
        }
    })
  }
  eventOnSelectedLoaiKeHoach(item)
  {
    if(item){
      this.LoaiKeHoach = item;
    }
  }
  durationHourNum() {
    if (!this.SelectedFromTime || !this.SelectedToTime) {return;}
    const formatHHmm = CommonConst.FormatHHmm;
    const fromTime = moment.utc(this.SelectedFromTime, formatHHmm);
    const toTime = moment.utc(this.SelectedToTime, formatHHmm);
    const hourNum = moment.duration(toTime.diff(fromTime)).asHours();
    const parseHourNum = hourNum ? parseFloat(hourNum.toString()).toFixed(2) : 0;
    this.txtHourNum = parseHourNum.toString();
  }

  initParamsEmployee() {
    return {
        IsDirectEmployee: 1,
        IsInDirectEmployee: 1,
        IsDepartmentID: 1,
        ProcessID: 3
    };
  }
  eventSelectTab = (name) => {
    if (this.tabName === name.detail.value) {return;}
    this.tabName = name.detail.value;
  };
  loadConfig() {
    const functionInfo = this.FunctionInfo;
     this.api.post(API_OT_GROUP_REQUEST.Alias_GetConfigOTGroup, API_OT_GROUP_REQUEST.GetConfigOTGroup,
        {
            FunctionID: functionInfo && functionInfo.id,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .subscribe(result => {
            if (result&&!result.Error) {
                const data = result.Data || {};
                const listKow = data.ListKow;
                const filterEmployeeForManager = data.FilterEmployeeForManager;
                const configs = data.Configs;
                const listOTPeriod = data.ListOTPeriod;
                const configFields = data.ConfigFields;
                const isFieldVisibleLPeriod = this.CommonHandler.getFieldVisible(configFields, 'LPeriod');
                const currentData = data.ListEmployee || {};
                const outputParams = currentData.OutputParams || {};
                const totalItems = outputParams[CommonConst.KEY.TotalItems];
                this.ListKow= listKow;
                this.ListOTPeriod= listOTPeriod;
                this.KowSelected= listKow ? listKow[0] : {};
                this.OTPeriodSelected = listOTPeriod ? listOTPeriod[0] : {};
                this.ListEmployee= this.listRequest;
                this.LenEmployee = totalItems;
                this.FilterEmployeeForManager = filterEmployeeForManager;
                this.FilterEmployeeForManagerSelected = filterEmployeeForManager && filterEmployeeForManager[0] ? filterEmployeeForManager[0] : {};
                this.Configs =  configs && configs[0] ? configs[0] : {};
                this.IsFieldVisibleLPeriod = isFieldVisibleLPeriod;
                this.HinhThuc = data.HinhThuc;
            }
            this.getDefaultValue();
        });
  }
  eventOnSelectedKowCode(item) {
    if (item) {
        this.KowSelected = item;
        this.getDefaultValue();
    }
  }

  eventOnCheckedIsPayEdit = ()=>{
        this.CheckedIsPay = !this.CheckedIsPay;
        this.HinhThucSelectedCurr = this.CheckedIsPay ? { PayValue: 0, PayValueName: ''} : this.HinhThucSelected;
  };

  eventOnSelectedHinhThucCode = (item) => {
        this.HinhThucSelectedCurr = item ? item : { PayValue: 0, PayValueName: ''};
  };

  initOption() {
    this.PageIndex = 0;
    this.PageSize = CommonConst.VALUE.PageSize;
    this.TotalItems = 0;
    this.currentItems = 0;
    this.listRequest =[];
  }


  eventOnSelectedFromDate(date) {
    if (date) {
        this.SelectedFromDate = date;
        this.getDefaultValue();
    }
  }




  eventOnSelectedFromTime(time, selectedDate) {
    if (time) {
        this.SelectedFromTime = time;
        this.durationHourNum();
    }
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    if(this.auth.getLanguage() === 'en')
    {
      this.LabelLoaiKeHoach ="Type plan";
      this.msgOutPlanKhacCapDuyet ="Level approve differences from each other because of having ot";
    }
    this.GenGuid();
  };


  eventDeleteFilterEmployee() {
        this.initOption();
        const listSelected = this.ListEmployee.filter((item) => item[IsCheck] === !this.IsCheckedAll);
        const stringIDs = listSelected.map(({ ID }) => ID).toString();
        this.api.post(API_OT_GROUP_REQUEST.Alias_DeleteEmployeeOTGroup, API_OT_GROUP_REQUEST.DeleteEmployeeOTGroup,
            {
                IDs: stringIDs,
                IsCheckAll: this.IsCheckedAll,
                PageIndex: this.PageIndex,
                PageSize: this.PageSize
            })
            .subscribe((result) => {
                if (result && !result.Error) {
                    const currentData = result.Data || {};
                    const outputParams = currentData.OutputParams || {};
                    const totalItems = outputParams[CommonConst.KEY.TotalItems];
                    this.ListEmployee= currentData.Data;
                    this.TotalItems = totalItems;
                    this.currentItems = currentData.Data.length;
                    this.LenEmployee= totalItems;
                    this.IsCheckedAll= false;
                  }
            });
  }
  eventOnSelectedEmpForManagerSelected(data) {
    const list = data || [];
    const functionInfo = this.FunctionInfo;
    this.initOption();
    this.api.post(API_OT_GROUP_REQUEST.Alias_UpdateEmployeeFilter, API_OT_GROUP_REQUEST.UpdateEmployeeFilter,
        {
            EmployeeCode: list.map(({ EmployeeCode }) => EmployeeCode).toString(),
            Kind: this.FilterEmployeeForManagerSelected?.Value || 0,
            FunctionID: functionInfo && functionInfo.id,
            IsCheckAll: list[list.length - 1].CheckedAll || false,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
        })
        .subscribe((result) => {
            if (result && !result.Error) {
                const data = result.Data || {};
                const configs = data.Configs;
                const currentData = data.ListEmployee || {};
                const outputParams = currentData.OutputParams || {};
                const totalItems = outputParams[CommonConst.KEY.TotalItems];
                this.LenEmployee= totalItems;
                this.TotalItems = totalItems;
                this.currentItems += currentData.Data.length;
                this.listRequest = [...this.listRequest,...currentData.Data];
                this.ListEmployee = this.listRequest.map(item => {
                  this.HinhThuc.forEach(x => {
                    if(x.PayValue === item.PayValue){
                      item.PayValueName = x.PayValueName;
                    }
                  });
                  return item;
                });
                this.IsCheckedAll = false;
                this.Configs= configs && configs[0] ? configs[0] : {};
            }
        });
  }

  OnUpdateFilterEmp = () => {
    if (this.ListEmployee && this.ListEmployee.filter(n => n.IsCheck).length > 0) {
        if (this.ListEmployee.filter(n => n.IsCheck).length > 1) {
            this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.JustOne);
            return;
        }
    }
    this.setOpenModal(true);
  };
  setOpenModal(isOpen: boolean) {
    this.IsVisibleModal = isOpen;
  }
  IsHiddenButton(){
    return this.ListEmployee && this.ListEmployee.filter(n => n.IsCheck).length > 0;
  }

  loadListEmployee(): Observable<any> {
    return this.api.post(API_OT_GROUP_REQUEST.Alias_GetListEmployeeLazyLoad, API_OT_GROUP_REQUEST.GetListEmployeeLazyLoad,
        {
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
        })
        .pipe(map(result => {
            if (!result.IsError) {
                const data = result.Data || {};
                this.currentItems += data.ListEmployee.Data.length;
                this.listRequest = [...this.listRequest,...data.ListEmployee.Data];
                this.ListEmployee= this.listRequest;
            }
        }));
  }
  eventAfterCheckBox(empCode) {
    if (this.ListEmployee && this.ListEmployee.length > 0) {
        this.ListEmployee.map( x =>{
          if(x.EmployeeCode === empCode){
            x.IsCheck = !x.IsCheck;
          }
          return x;
        });
    }
  }

  OnUpdateFilterEmpAfterSave = (data) => {
      const lst = this.ListEmployee;
      for (let i = 0; i < lst.length; i++) {
          if (lst[i].ID === data.ID) {
              lst[i].IsPay = data.IsPay;
              lst[i].PayValue = data.PayValue;
              lst[i].PayValueName = data.PayValueName;
              break;
          }
      }
      this.ListEmployee = lst,
      this.tabName = LeaveAndOTConst.TAB.Employee;
  };


  eventOnCheckedIsPay() {
    this.CheckedIsPay = !this.CheckedIsPay;
  }
  eventOnSelectedOTPeriod(item) {
    if (item) {
        this.OTPeriodSelected = item;
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
    this.txtHourNum = text;
  }
  eventOnSelectedPayValue(item) {
    if (item) {
        this.PayValueSelected= item;
    }
  }

  CheckAllFilter(){
      this.IsCheckAllFilter =  !this.IsCheckAllFilter;
      if(this.ListEmployee && this.ListEmployee.length > 0){
        this.ListEmployee = this.ListEmployee.map(x => {
          x.IsCheck = this.IsCheckAllFilter;
          return x;
        });
      }
  }

  doSubmit = async (IsPassValidate) => {
    const kowSelected = this.KowSelected && this.KowSelected.Value || null;
    const OTPeriodSelected = this.OTPeriodSelected && this.OTPeriodSelected.Value || null;
    const formatTime = CommonConst.FormatHHmm;
    const selectedFromDate = this.SelectedFromDate;
    const fromTime = this.SelectedFromTime;
    const toTime = this.SelectedToTime;

    if (!selectedFromDate) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterFromDate);
        return;
    }
    else if (!fromTime || !moment(fromTime, formatTime).isValid()) {
      this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTime);
      return;
    }
    else if (!toTime || !moment(toTime, formatTime).isValid()) {
      this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterTime);
      return;
    }
    const loading = await this.notification.showLoading();
    this.api.post(API_OT_GROUP_REQUEST.Alias_SendRequestOTGroupRequest, API_OT_GROUP_REQUEST.SendRequestOTGroupRequest,
        {
            KowCode: kowSelected,
            OTPeriod: OTPeriodSelected,
            BegDate: selectedFromDate,
            EndDate: selectedFromDate,
            Reason: this.txtReason,
            Note: this.txtReason,
            FromTime: fromTime,
            ToTime: toTime,
            HourNum: this.txtHourNum,
            IsPay: this.CheckedIsPay,
            IsPassValidate,
            OutOfPlan: !this.LoaiKeHoach['Value'] ? 0 : this.LoaiKeHoach['Value'],
            strEmp: this.ListEmployee && this.ListEmployee.map(e=>e.EmployeeCode).toString() || '',
            FileID: this.IDFile
        })
        .subscribe((result) => {
            console.log(result,12321313);
            loading.dismiss();
            if (result && result.Data != null && result.Data.CountErr === '55') {
              this.presentAlert(this.Lang.COMMON.Alert, result.Data.ErrStr + '(' +this.Lang.COMMON.DongYDeBoQua + ')');
            }
            else if (result && result.Data != null && (result.Data.CountErr == '1' || result.Data.CountErr == '111')) {
              this.notification.alert(this.Lang.COMMON.Error,result.Data.ErrStr);
            }
            else if(result && result.Data != null && result.Data.ErrStr === 'msgOutPlanKhacCapDuyet')
            {
               this.notification.alert(this.Lang.COMMON.Error,this.msgOutPlanKhacCapDuyet);
            }
            else {
                if (result && !result.Error) {
                    this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess,()=>{
                          this.reloadFunction.$reloadFunction.next(true);
                          this.router.navigate(['/OTGroupRequest']);
                    });
                }
            }
        });
  };

  presentAlert= async (header,message) =>{
    this.notification.alertInput(header,this.Lang.COMMON.Cancel,this.Lang.COMMON.OK,(data)=>{
      if(!data.txtReason)
      {
          this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason,null,null,['btnReject']);
          return false;
      }
      this.doSubmit(true);
    },message);
  };

  eventSelectefromtime(item){

    this.SelectedFromTime =  item;
  }
  eventSelectetotime(item){
    this.SelectedToTime = item;
  }

  loadMore(event){
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.loadListEmployee().subscribe(() =>  event.target.complete());
    }
    else{
      event.target.complete();
    }

  }

  doPop(){
    this.router.navigate(['/OTGroupRequest']);
  }

  submitDialogTypeTrip(e){
    console.log(e);
  }

}
