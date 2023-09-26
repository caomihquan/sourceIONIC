/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import HrmStorageConst from '../../../../libs/constants/HrmStorageConst';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import HrmStorage from '../../../../libs/core/HrmStorage';
import { IPConfig } from 'src/IPConfig';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import  LeaveAndOTConst from 'src/app/shared/constants/LeaveAndOTConst.js';
import { Platform } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import BusinessTripConst from '../../../shared/constants/BusinessTripConst.js';
import { Observable } from 'rxjs';
import { map, publish } from 'rxjs/operators';

const API_BUSINESS_TRIP = HrmAPIConst.BUSINESS_TRIP;


@Component({
  selector: 'app-businesstrip-aprrove-details',
  templateUrl: './BusinessTripApproveDetail.component.html',
  styleUrls: ['./BusinessTripApproveDetail.component.scss'],
})
export class BusinessTripApproveDetailComponent implements OnInit {
  RequestData;
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  txtApproveNote;
  user;
  formatHandler = FormatHandler;
  IsShow = false;
  IsRequireChoose;
  BusinessTripConst = BusinessTripConst;
  LenEmployee = 0;
  ListEmployee = [];
  tabName= BusinessTripConst.TAB.Infomation;
  Lang: any;
  paramfile= {};
  ShowNoiLuuTru = false;
  IsNotification = false;
  IsEmployeeAttendance = false;
  iPage = 21;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  TotalItems = 0;
  itemFunction;
  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private languageService: LanguageService,
    public CommonHandler: CommonHandlerService,
    private notifications: NotificationsService,
    private variablesService: VariableCommonService,
    private router: Router) {
    this.translate.use(this.auth.get().Language ? this.auth.get().Language.toLowerCase() : 'VN');
    this.user = auth.get();
  }
  eventSelectTab = (name) => {
    if (this.tabName === name.detail.value) {return;}
    this.tabName = name.detail.value;
  };
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
      this.initItemApprove();
    this.itemFunction = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.itemFunction : {};
     this.getLanguage();
  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.ShowNguoiThayThe();
    this.loadConfig();
  };
  initItemApprove() {
    const formatDate = this.FormatDate;
    const leaveApproveData = this.router.getCurrentNavigation().extras.state.LeaveApproveData;
    if (leaveApproveData) {
        leaveApproveData.CreateDateView = moment(leaveApproveData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        leaveApproveData.BegDateView = FormatHandler.formatDate(leaveApproveData.BegDate, this.user);
        leaveApproveData.EndDateView = FormatHandler.formatDate(leaveApproveData.EndDate, this.user);
        leaveApproveData.NgaySinhCon = FormatHandler.formatDate(leaveApproveData.NewChildBirthDate, this.user);
        const txtApproveNote = leaveApproveData.Status === 1 && leaveApproveData.ApproveNote != null ? leaveApproveData.ApproveNote : '';
        this.RequestData= leaveApproveData;
        const object = JSON.parse(JSON.stringify(this.paramfile));
        object['FieldValue'] = this.RequestData?.FileID;
        object['FileID'] = this.RequestData?.FileID; // thêm mới thì FileID = FieldValue
        this.paramfile = object;
        this.txtApproveNote= txtApproveNote;
    }
  }

  ShowNguoiThayThe(){
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe', 'GetConfigNguoiThayThe',
        {
            ProcessID: 1
        })
        .subscribe((res) => {
                this.IsShow = res.Data.ShowNguoiThayThe.length > 0? true : false;
                this.IsRequireChoose = res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
                this.ShowNoiLuuTru =  res.Data.ShowNoiLuuTru.length > 0 ? true: false;
        });
  }

  eventOnReject() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Reject_Mobile : LeaveAndOTConst.STATUS.E_Reject;

    const params = {
        Kind: kind,
        ID: leaveApproveData.ID,
        ApproveNote: this.txtApproveNote,
        IsEmployeeAttendance: this.IsEmployeeAttendance,
        RecordID: leaveApproveData.RecordID || ''
    };
    this.updateLeaveRequest(params, () => {
      const leaveApproveData1 = this.RequestData || {};
      leaveApproveData1.StatusName = this.Lang.LEAVE_REQUEST.Reject;
      leaveApproveData1.Status = LeaveAndOTConst.STATUS.E_Reject;
      leaveApproveData1.ApproveNote = this.txtApproveNote;
      this.RequestData = leaveApproveData;
    });
  }

  updateLeaveRequest(params, callback?) {
    params['Note'] = params['ApproveNote'];
    this.api.post(API_BUSINESS_TRIP.Alias_UpdateBusinessTripApprover,
    API_BUSINESS_TRIP.UpdateBusinessTripApprover,params)
    .subscribe((result) => {
        if (result && !result.Error && this.RequestData) {
            this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
            callback();
        }
        else
        {
          return;
        }
    });
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
  eventOnApprove() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.NOTIFY.DataNotFound,this.Lang.COMMON.Error);
        return;
    }

    const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Approved_Mobile : LeaveAndOTConst.STATUS.E_Approved;

    const params = {
        Kind: BusinessTripConst.STATUS.E_Approved,
        ID: leaveApproveData.ID,
        ApproveNote: this.txtApproveNote,
        IsEmployeeAttendance: this.IsEmployeeAttendance,
        RecordID: leaveApproveData.RecordID || ''
    };
    const callback = () => {
        leaveApproveData.StatusName = this.Lang.LEAVE_REQUEST.Approved;
        leaveApproveData.Status = LeaveAndOTConst.STATUS.E_Approved;
        leaveApproveData.ApproveNote = this.txtApproveNote;
        this.RequestData = leaveApproveData;
    };
    this.updateLeaveRequest(params, callback);
  }
  eventOnRejectPleaseCancel() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Reject_Mobile : LeaveAndOTConst.STATUS.E_Wait;
    const params = {
        Kind: kind,
        ID: leaveApproveData.ID,
        ApproveNote: this.txtApproveNote,
        IsEmployeeAttendance: this.IsEmployeeAttendance,
        RecordID: leaveApproveData.RecordID || ''
    };
    const callback = () => {
        leaveApproveData.Status = LeaveAndOTConst.STATUS.E_Approved;
        leaveApproveData.StatusName = this.Lang.LEAVE_APPROVE.Approved;
        leaveApproveData.ApproveNote = this.txtApproveNote;
        this.RequestData = leaveApproveData;
    };
    this.updateLeaveRequest(params, callback);
  }
  eventOnApprovePleaseCancel() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
      this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Approved_Mobile : LeaveAndOTConst.STATUS.E_Cancelled;
    const params = {
        Kind: kind,
        ID: leaveApproveData.ID,
        ApproveNote: this.txtApproveNote,
        IsEmployeeAttendance: this.IsEmployeeAttendance,
        RecordID: leaveApproveData.RecordID || ''
    };
    const callback = () => {
        leaveApproveData.Status = LeaveAndOTConst.STATUS.E_Cancelled;
        leaveApproveData.StatusName = this.Lang.LEAVE_APPROVE.Cancelled;
        leaveApproveData.ApproveNote = this.txtApproveNote;
        this.RequestData = leaveApproveData;
    };
    this.updateLeaveRequest(params, callback);
  }
}
