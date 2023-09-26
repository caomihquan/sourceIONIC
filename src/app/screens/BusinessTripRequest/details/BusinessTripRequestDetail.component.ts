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
import { map, publish } from 'rxjs/operators';
import * as moment from 'moment';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';

const COMMON_CONST = CommonConst;
const API_LEAVE_REQUEST = HrmAPIConst.LEAVE_REQUEST;

@Component({
  selector: 'app-businesstriprequestdetail',
  templateUrl: './BusinessTripRequestDetail.component.html',
  styleUrls: ['./BusinessTripRequestDetail.component.scss'],
})
export class BusinessTripRequestDetailComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  ApproveLevelList: Array<any>;
  RemainLeaveNumber = [];
  IsActivePleaseCancel = false;
  tabName= BusinessTripConst.TAB.Infomation;
  IsModalLoading;
  FormatDate = COMMON_CONST.FormatDate.toLocaleUpperCase();
  txtReason = '';
  showAlertDialog = false;
  NguoiThayThe = '';
  iPage = 21;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  TotalItems = 0;
  IsShow = false;
  IsRequireChoose = false;
  Lang: any;
  BusinessTripConst = BusinessTripConst;
  user: any;
  ProcessID = 4;
  ShowNoiLuuTru;
  formatHandler = FormatHandler;
  ListEmployee;
  LenEmployee = 0;
  paramfile= {};
  WaitingData: boolean = true;
  itemFunction;
  constructor(
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
    this.paramfile = {
      FunctionID : '2700', //functionid trên web
      EmpLogin :this.user.EmployeeCode,
      LoginInfo:this.user,
      FieldValue: '',
      FieldName:'FileID',
      TableName:'HCSHP_BusinessTripRequest',
      FileID:''
    };
    this.initItemLeaveDetail();
    this.getLanguage();
    this.itemFunction = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.itemFunction : {};
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.initButtonPleaseCancel();
    this.loadConfig();
    this.ShowNguoiThayThe();
  };
  ShowNguoiThayThe(){
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe', 'GetConfigNguoiThayThe',
        {
            ProcessID: 0
        })
        .subscribe((res) => {
                this.IsShow = res.Data.ShowNguoiThayThe.length > 0? true : false;
                this.IsRequireChoose = res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
                this.ShowNoiLuuTru =  res.Data.ShowNoiLuuTru.length > 0 ? true: false;
        });
  }

  initItemLeaveDetail() {
    const formatDate = this.FormatDate;
    const requestData = this.router.getCurrentNavigation().extras.state.RequestData;
    if (requestData) {
        requestData.CreateDateView = moment(requestData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        requestData.BegDateView = FormatHandler.formatDate(requestData.BegDate, this.user);
        requestData.EndDateView = FormatHandler.formatDate(requestData.EndDate, this.user);
        //this.ListKindTripSelected ? this.ListKindTripSelected?.Value : 4
        this.RequestData = requestData;

        const object = JSON.parse(JSON.stringify(this.paramfile));
        object['FieldValue'] = this.RequestData?.FileID;
        object['FileID'] = this.RequestData?.FileID; // thêm mới thì FileID = FieldValue
        this.paramfile = object;
        this.WaitingData = false;
        this.ProcessID=requestData ? requestData?.KindTrip : 4;
        // this.api.post(API_LEAVE_REQUEST.Alias_GetListKows,API_LEAVE_REQUEST.GetListKows,
        //   {
        //      ProcessID:requestData ? requestData?.KindTrip : 4,
        //      RecordID:requestData.RecordID,
        //      IsGetListOfHistRequest : true
        //   }).subscribe(result =>{
        //       if(result && !result.Error){
        //         this.ApproveLevelList = result.Data;
        //       }
        //   });
    }
  }

  initButtonPleaseCancel() {
    const requestData = this.RequestData;
    if (requestData && requestData[BusinessTripConst.KEY.Status]) {
        const status = requestData[BusinessTripConst.KEY.Status];
        const isUsedRejectProcess = requestData[BusinessTripConst.KEY.IsUsedRejectProcess] || false;
        this.IsActivePleaseCancel = !BusinessTripConst.ListActivePleaseCancel.includes(status) && !isUsedRejectProcess;
    }
  }


  loadConfig() {
    //const options = this.initOption();
    this.api.post(HrmAPIConst.BUSINESS_TRIP.Alias_GetListEmployee, HrmAPIConst.BUSINESS_TRIP.GetListEmployee,
        {
            RecordID: this.RequestData.RecordID,
            iPage: this.iPage,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .subscribe((result) => {
            if (result && !result.Error) {
                const currentData = result.Data && result.Data.ListEmployee || {};
                const listEmployee = currentData.Data;
                const outputParams = currentData.OutputParams || {};
                const totalItems = outputParams[CommonConst.KEY.TotalItems];
                this.TotalItems = totalItems;
                this.currentItems += listEmployee.length;
                this.ListEmployee =listEmployee;
                this.LenEmployee = totalItems;
            }
        });
  }

  loadMore(event){
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.loadListEmployee().subscribe(res => {
        event.target.complete();
      });
    }
    else{
      event.target.complete();
    }

  }

  eventOnPleaseReject= async () => {
    if (!this.RequestData || !this.RequestData.RecordID) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }

    if (this.RequestData?.IsRequireWhenCancel &&
        (this.txtReason == null || this.txtReason.trim() === '')) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason);
        return;
    }
    const me = this;
    this.IsModalLoading = await this.notification.showLoading();
    me.api.post(HrmAPIConst.BUSINESS_TRIP.Alias_RejectRequestBusinessTripRequest,
      HrmAPIConst.BUSINESS_TRIP.RejectRequestBusinessTripRequest,
        {
            RecordID: me.RequestData.RecordID,
            ReasonDetroy: this.txtReason || ''
        })
        .subscribe((result) => {
            this.IsModalLoading.dismiss();
            if (result && !result.Error&& me.RequestData) {
                const requestData = me.RequestData || {};
                requestData.StatusName = result.Data.StatusNameRespone;
                requestData.Status = result.Data.StatusRespone;
                requestData.ReasonDetroy = this.txtReason || '';
                this.RequestData = requestData;
                this.IsActivePleaseCancel = false;
                this.variablesService.$reloadFunction.next(true);
                this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
            }
        });
  };

  loadListEmployee(): Observable<any> {
    return this.api.post(HrmAPIConst.BUSINESS_TRIP.Alias_GetListEmployeeLazyLoad, HrmAPIConst.BUSINESS_TRIP.GetListEmployeeLazyLoad,
        {
            iPage: this.iPage,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .pipe(map((result) => {
            if (result && !result.Error) {
                const data = result.Data || {};
                const listEmployee = data.ListEmployee || {};
                this.initDataEmployee(listEmployee);
            }
        }));
  }

  initDataEmployee(data) {
    const currentData = data.Data;
    if (!currentData || typeof currentData != 'object' || Object.keys(currentData).length === 0) {
            this.ListEmployee=null;
            this.LenEmployee=0;
    };
    let stateData = this.ListEmployee;
    stateData = stateData ? [...stateData, ...currentData] : currentData;
    const outputParams = data[CommonConst.KEY.OutputParams] || {};
    const totalItems = outputParams[CommonConst.KEY.TotalItems];
    this.TotalItems = totalItems;
    this.currentItems += data.Data.length;
    this.ListEmployee= stateData;
    this.LenEmployee= totalItems;
  }


  handleOnPleaseReject = () => {
    if (this.RequestData.IsRequireWhenCancel) {
      this.presentAlert();
    }
    else {
      this.eventOnPleaseReject();
    }
  };



  presentAlert = async () => {
      this.notification.alertInput(this.Lang.LEAVE_REQUEST.Reason,this.Lang.COMMON.Cancel,this.Lang.COMMON.OK,(data)=>{
        if(!data.txtReason || data.txtReason=== '')
            {
                this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason,null,null,['btnReject']);
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

  eventSelectTab = (name) => {
    if (this.tabName === name.detail.value) {return;}
    this.tabName = name.detail.value;
  };
}
