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


@Component({
  selector: 'app-leaves-aprrove-details',
  templateUrl: './DetailLeaveApprove.component.html',
  styleUrls: ['./DetailLeaveApprove.component.scss'],
})
export class DetailLeaveApproveComponent implements OnInit {
  RequestData;
  ApproveLevelList: Array<any>;
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  txtApproveNote;
  user;
  IsShow = false;
  IsRequireChoose;
  Lang: any;
  IsNotification = false;
  IsEmployeeAttendance = false;
  ModalLoading;
  paramfile= {};
  itemFunciton;
  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private languageService: LanguageService,
    public CommonHandler: CommonHandlerService,
    private notifications: NotificationsService,
    private variablesService: VariableCommonService,
    private notification: NotificationsService,
    private router: Router) {
    this.translate.use(this.auth.get().Language ? this.auth.get().Language.toLowerCase() : 'VN');
    this.user = auth.get();
  }
  ngOnInit() {
    this.paramfile = {
      FunctionID : '1300', //functionid trên web
      EmpLogin :this.user.EmployeeCode,
      LoginInfo:this.user,
      FieldValue: '',
      FieldName:'FileID',
      TableName:'HCSHP_LeaveRequest',
      FileID:''
    };
    this.getLanguage();
    this.initItemApprove();
    this.itemFunciton = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.itemFunction : {};

  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.ShowNguoiThayThe();
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
            ProcessID: 0
        })
        .subscribe((res) => {
                this.IsShow = res.Data.ShowNguoiThayThe.length > 0? true : false;
                this.IsRequireChoose = res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
        });
  }

  async eventOnReject() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    else{
      this.ModalLoading = await this.notification.showLoading();
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
    this.api.post(HrmAPIConst.LEAVE_APPROVE.Alias_ApproveLeaveRequest, HrmAPIConst.LEAVE_APPROVE.ApproveLeaveRequest,params)
        .subscribe((result) => {
          this.ModalLoading.dismiss();
            if (!result.Error && this.RequestData) {
                this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
                callback();
            }

        });
  }

  async eventOnApprove() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.NOTIFY.DataNotFound,this.Lang.COMMON.Error);
        return;
    }
    else{
      this.ModalLoading = await this.notification.showLoading();
    }
    const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Approved_Mobile : LeaveAndOTConst.STATUS.E_Approved;

    const params = {
        Kind: kind,
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
  async eventOnRejectPleaseCancel() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    else{
      this.ModalLoading = await this.notification.showLoading();
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
  async eventOnApprovePleaseCancel() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
      this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    else{
      this.ModalLoading = await this.notification.showLoading();
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
    const callback = async () => {
        leaveApproveData.Status = LeaveAndOTConst.STATUS.E_Cancelled;
        leaveApproveData.StatusName = this.Lang.LEAVE_APPROVE.Cancelled;
        leaveApproveData.ApproveNote = this.txtApproveNote;
        this.RequestData = leaveApproveData;
    };
    this.updateLeaveRequest(params, callback);
  }
}
