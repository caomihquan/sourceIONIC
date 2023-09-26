/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import CommonConst from '../../../../libs/constants/CommonConst.js';
import FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import BusinessTripConst from '../../../shared/constants/BusinessTripConst.js';
import * as moment from 'moment';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_BUSINESS_TRIP = HrmAPIConst.BUSINESS_TRIP;
@Component({
  selector: 'app-businesstriprequestcreate',
  templateUrl: './BusinessTripRequestCreate.component.html',
  styleUrls: ['./BusinessTripRequestCreate.component.scss'],
})
export class BusinessTripRequestCreateComponent implements OnInit {
  Lang: any;
  user: any;
  FunctionInfo;
  BusinessTripConst = BusinessTripConst;
  //

  paramfile = {
    FunctionID : '2700', //functionid trên web
    FieldValue: '',
    FieldName:'FileID',
    TableName:'HCSHP_BusinessTripRequest',
    FileID : '',
    EmpLogin:'',
    LoginInfo:{}
  };
  IsCheckAllFilter = false;
  WaitingData=true;
  ParamsEmployee= this.initParamsEmployee();
  IsVisibleBusinessTripType= false;
  IsVisibleBusinessTripTime= false;
  IsVisibleBusinessTripKindTrip= false;
  IsVisibleDestination= false;
  IsVisibleVehicle= false;
  SelectedFromDate= null;
  SelectedToDate = null;
  DayNum= '1';
  ListKow= [];
  ListDestination= [];
  ListKowSelected;
  ListTime= [];
  ListTimeSelected;
  ListKindTrip= [];
  ListKindTripSelected;
  ListOtherRequest= [];
  ListOtherRequestValue= null;
  ListOtherRequestCaption= null;
  ListTypeTrip= [];
  ListTypeTripValue= null;
  ListTypeTripCaption= null;
  ListEmployee= [];
  LenEmployee= 0;
  OldListEmployee= [];
  FilterEmployeeForManager= null;
  FilterEmployeeForManagerSelected;
  Cost= null;
  PurposeOfTrip= '';
  Note= '';
  ComeTo= null;
  IsShowAlert= false;
  IsShowDialogEmployee= false;
  IsModalLoading= false;
  tabName= BusinessTripConst.TAB.Infomation;
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  IDFile= '';
  FileUpload= null;
  FileName= '';
  labelFromDate = new Date();
  IsCheckedAll= false;
  IsShow= false;
  IsRequireChoose= false;
  ShowNoiLuuTru= false;
  NoiLuuTru = '';
  iPage = 21;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  TotalItems = 0;
  listRequest=[];
  SetupProcess;
  SetupProcessSelected;
  listfile = [];
  lstNguoiThayThe = [];
  NguoiThayThe={FullName: '', EmployeeCode: ''};
  Options ={};
  constructor(
    private reloadFunction: VariableCommonService,

    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore, private languageService: LanguageService,
    private router: Router,
    public CommonHandler: CommonHandlerService,
    private variablesService: VariableCommonService,
    private notification: NotificationsService) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }

  ngOnInit() {
    this.FunctionInfo = this.router.getCurrentNavigation().extras.state;
    this.getLanguage();
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.initData();
    this.loadConfig();
    this.GenGuid();
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

  initParamsEmployee() {
    const functionInfo = this.FunctionInfo;
    return {
        IsDirectEmployee: 1,
        IsInDirectEmployee: 1,
        IsDepartmentID: 1,
        ProcessID: -1,
        FunctionID: functionInfo && functionInfo.id,
    };
  }

  initData() {
    this.DayNum =  '1';
    this.paramfile.EmpLogin = this.user.EmployeeCode;
    this.paramfile.LoginInfo = this.user;
    this.FormatDate = this.user.PRDateFormat ? this.user.PRDateFormat : CommonConst.FormatDate.toLocaleUpperCase();


    const fromDate = new Date();
    const toDate = new Date();

    this.SelectedFromDate= fromDate;//FormatHandler.formatDate(fromDate, this.LoginInfo),
    this.SelectedToDate = toDate;//FormatHandler.formatDate(toDate, this.LoginInfo)

  }

  loadConfig() {
    this.api.post(HrmAPIConst.BUSINESS_TRIP.Alias_GetConfigBusinessTrip, HrmAPIConst.BUSINESS_TRIP.GetConfigBusinessTrip,
        {
            iPage: this.iPage,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
        })
        .subscribe((result) => {
            if (result && !result.Error) {
                const data = result.Data || {};
                const listKow = data.ListKow;
                const listTime = data.ListTime;
                const listKindTrip = data.ListKindTrip;
                const firstKindTrip = listKindTrip ? listKindTrip[0] : {};
                const listOtherRequest = data.ListOtherRequest;
                const listTypeTrip = data.ListTypeTrip;
                const filterEmployeeForManager = data.FilterEmployeeForManager;
                const setupProcess = data.SetupProcess || [];
                const firstSetupProcess = this.getSetupProcess(setupProcess, firstKindTrip.Value);
                const currentData = data.ListEmployee || {};
                const listEmployee = currentData.Data;
                const outputParams = currentData.OutputParams || {};
                const totalPages = outputParams[CommonConst.KEY.TotalPages];
                const totalItems = outputParams[CommonConst.KEY.TotalItems];

                this.ListKow= listKow;
                this.ListKowSelected= listKow ? listKow[0] : {};
                this.ListTime=listTime;
                this.ListTimeSelected = listTime ? listTime[0] : {};
                this.ListKindTrip= listKindTrip;
                this.ListKindTripSelected = firstKindTrip;
                this.ListOtherRequest= listOtherRequest;
                this.ListTypeTrip= listTypeTrip;
                this.SetupProcess = setupProcess;
                this.SetupProcessSelected = firstSetupProcess;
                this.ListEmployee = listEmployee;
                this.LenEmployee = totalItems;
                this.FilterEmployeeForManager = filterEmployeeForManager;
                this.FilterEmployeeForManagerSelected = filterEmployeeForManager && filterEmployeeForManager[0] ?
                                                        filterEmployeeForManager[0] : {};
                this.updateEndDateFromDayNum();
                this.ShowNguoiThayThe(firstKindTrip);
                this.GetComboboxDestination(firstKindTrip);
            }
        });
  }
  ShowNguoiThayThe(firstKindTrip){
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe', 'GetConfigNguoiThayThe',
    {
        ProcessID: firstKindTrip ? firstKindTrip?.Value : 4
    })
    .subscribe((res) => {
      this.IsShow= res.Data.ShowNguoiThayThe.length > 0? true : false;
      this.IsRequireChoose= res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
      this.ShowNoiLuuTru= res.Data.ShowNoiLuuTru.length > 0 ? true: false;

    });
  }

  GetComboboxDestination(firstKindTrip){
    this.api.post(HrmAPIConst.SYSTEM.Alias_GetCombobox,null,
    {
        Name: 'HCSHP_BusinessTripRequest.DestinationCode',
        Param:{
          KindStrip:firstKindTrip ? firstKindTrip?.Value : 4
        }
    })
    .subscribe((res) => {
      if(res && res.Data){
        this.ListDestination = res.Data.Data;
      }
    });
  }

  getSetupProcess(setupProcess, value) {
    if (!setupProcess || !value) {return;}
      const result = setupProcess.filter(item => item.ProcessID === value);
      return result && result[0] || {};
  }

  updateEndDateFromDayNum() {
    const formatDate = this.FormatDate;
    const leavePeriod = this.ListTimeSelected ? this.ListTimeSelected?.Value : null;
    const kowCode = this.ListKowSelected ? this.ListKowSelected?.Value : null;
    const processID = this.ListKindTripSelected ? this.ListKindTripSelected?.Value : null;
    if (!this.DayNum || !this.SelectedFromDate || !kowCode || !leavePeriod || !processID) {return;}
    this.api.post(HrmAPIConst.BUSINESS_TRIP.Alias_GetEndDateFromNumDay, HrmAPIConst.BUSINESS_TRIP.GetEndDateFromNumDay,
        {
            ProcessID: processID,
            KowCode: kowCode,
            DayNum: this.DayNum,
            BegDate: this.SelectedFromDate,
            LeavePeriod: leavePeriod,
        })
        .subscribe((result) => {
            if (result && !result.Error) {
                const data = result.Data || {};
                const outputParams = data.OutputParams || {};
                const toDate = outputParams.EndDate;
                const moToDate = toDate;// FormatHandler.formatDate(toDate,this.user);
                this.SelectedToDate = moToDate;
            }
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
  eventSelectTab = (name) => {
    if (this.tabName === name.detail.value) {return;}
    this.tabName = name.detail.value;
  };
  RequestDate(){
    return moment(new Date()).format(this.FormatDate.toLocaleUpperCase());
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
      this.labelFromDate  = date;
      this.SelectedFromDate = date;
      this.updateEndDateFromDayNum();
    }
  }

  eventOnChangeTimeSelected = (value) => {
    value = (value + '').replace(',', '.').replace(/,/g, '');
    if (value && false === Number.isNaN(+value)) {
          this.DayNum = value + '';
    } else {
          this.DayNum = '';
          this.SelectedToDate =null;
    }
  };


  eventOnSelectedBusinessTripTime(item) {
    if (item) {
      this.ListTimeSelected=item;
      if (this.ListTimeSelected?.Value === '1') {
          this.updateEndDateFromDayNum();
      }
      else {
          this.DayNum = '0.5';
          this.updateEndDateFromDayNum();
      }
    }
  }

  eventOnSelectedBusinessTripType(item) {
      if (item) {
        this.ListKowSelected = item;
        this.updateEndDateFromDayNum();
      }
  }

  eventOnSelectedBusinessTripKindTrip(item) {
    if (item) {
        const firstSetupProcess = this.getSetupProcess(this.SetupProcess, item.Value);
        this.SetupProcessSelected = firstSetupProcess;
        this.ListKindTripSelected = item;
        this.updateEndDateFromDayNum();
        this.GetComboboxDestination(this.ListKindTripSelected);
        this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe','GetConfigNguoiThayThe',
        {
            ProcessID: this.ListKindTripSelected ? this.ListKindTripSelected?.Value : 4
        })
        .subscribe((res) => {
                this.IsShow = res.Data.ShowNguoiThayThe.length > 0 ? true : false;
                this.IsRequireChoose = res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
                this.ShowNoiLuuTru= res.Data.ShowNoiLuuTru.length > 0 ? true: false;
        });
    }
  }

  eventChangeCometo(item) {
    if (item && item.DestinationName) {
      this.ComeTo = item.DestinationName;
    }
    else{
      this.ComeTo = item;
    }
    console.log(this.ComeTo);
  }

  submitDialogOtherRequest(e)
  {
    this.ListOtherRequestValue = e && e.length > 0 ? e.map(i=>i.Value).toString() : '';
    this.ListOtherRequestCaption = e && e.length > 0 ? e.map(i=>i.Caption).toString() : '';
  }

  submitDialogTypeTrip(e)
  {
    this.ListTypeTripValue = e && e.length > 0 ? e.map(i=>i.Value).toString() : '';
    this.ListTypeTripCaption = e && e.length > 0 ?  e.map(i=>i.Caption).toString() : '';
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
  submitDialogFilterEmp(data){
    const list = data || [];
    const functionInfo = this.FunctionInfo;
    this.initOptions();
     this.api.post('HrmMobileApp/CnB/BusinessTripRequest/UpdateEmployeeFilter', 'UpdateEmployeeFilter',
      {
        EmployeeCode: data.map(({ EmployeeCode }) => EmployeeCode).toString(),
        Kind: this.FilterEmployeeForManagerSelected?.Value || 0,
        FunctionID: functionInfo && functionInfo.id ? functionInfo.id : 'Mobi.019',
        IsCheckAll: list[list.length - 1].CheckedAll || false,
        iPage: this.iPage,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      }
    )
    .subscribe((result) => {
      if (result && !result.Error) {
        const currentData = result.Data || {};
        const outputParams = currentData.OutputParams || {};
        const totalItems = outputParams[CommonConst.KEY.TotalItems];
        this.LenEmployee= totalItems;
        this.TotalItems = totalItems;
        this.currentItems += currentData.Data.length;
        this.listRequest = [...this.listRequest,...currentData.Data];
        this.ListEmployee= this.listRequest;
      }
    });
  }
  initOptions() {
    this.PageIndex = 0;
    this.TotalItems = 0;
    this.listRequest = [];
    this.TotalItems = 0;
    this.currentItems = 0;
  }
  eventDeleteFilterEmployee() {
    this.initOptions();
    const listSelected = this.ListEmployee.filter(item=>item.IsCheck === true);
    const stringIDs = listSelected.map(({ ID }) => ID).toString();
    this.api.post('HrmMobileApp/CnB/BusinessTripRequest/DeleteEmployeeBusinessTrip', 'DeleteEmployeeBusinessTrip',
    {
          iPage: this.iPage,
          IDs: stringIDs,
          IsCheckAll: this.IsCheckedAll,
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
      })
      .subscribe((result) => {
          if (!result.IsError) {
              const currentData = result.Data || {};
              const outputParams = currentData.OutputParams || {};
              const totalItems = outputParams[CommonConst.KEY.TotalItems];
              const listEmployee = currentData.Data;
              this.ListEmployee= listEmployee;
              this.LenEmployee= totalItems;
              this.IsCheckedAll= false;
          }
      });
  }


  doSubmit()
  {
    this.api.post('HrmMobileApp/CnB/BusinessTripRequest/SendRequestBusinessTripRequest', 'SendRequestBusinessTripRequest',
     {
            BegDate:this.SelectedFromDate,
            EndDate: this.SelectedToDate,
            KowCode: this.ListKowSelected?.Value || '',
            DayNum: this.DayNum,
            LeavePeriod: this.ListTimeSelected?.Value || null,
            Cost: this.Cost != null && this.Cost !== '' ? parseFloat(this.Cost) : 0,
            KindTrip: this.ListKindTripSelected?.Value || null,
            Vehicle: this.ListTypeTripValue || '',
            Reason: this.PurposeOfTrip || '',
            OtherRequest: this.ListOtherRequestValue || '',
            Note: this.Note || '',
            WhereTO: this.ComeTo,
            FileID: this.IDFile,
            Address: this.NoiLuuTru,
            ContactEmployee: this.NguoiThayThe && this.NguoiThayThe.EmployeeCode || null

        })
        .subscribe((result) => {
            this.IsModalLoading = false;
            if (result && !result.IsError) {
              this.variablesService.$reloadFunction.next(true);
              this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
              this.router.navigate(['/BusinessTripRequest']);
            }

        });
  }
  doPop(){
    this.router.navigate(['/BusinessTripRequest']);
  }
  eventOnSelectedNguoiThayThe(item)
  {
    this.NguoiThayThe = item;
  }
  CheckAllFilter(){
    this.IsCheckAllFilter = !this.IsCheckAllFilter;
      if(this.ListEmployee && this.ListEmployee.length > 0){
        this.ListEmployee = this.ListEmployee.map(x => {
          x.IsCheck = this.IsCheckAllFilter;
          return x;
        });
      }
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
  loadListEmployee(): Observable<any> {
    return this.api.post(API_BUSINESS_TRIP.Alias_GetListEmployeeLazyLoad, API_BUSINESS_TRIP.GetListEmployeeLazyLoad,
        {
          iPage:this.iPage,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
        })
        .pipe(map(result => {
            if (result && !result.Error) {
                const data = result.Data || {};
                this.currentItems += data.ListEmployee.Data.length;
                this.listRequest = [...this.listRequest,...data.ListEmployee.Data];
                this.ListEmployee= this.listRequest;
            }
        }));
  }
}
