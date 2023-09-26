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
import  MissingInOutConst from 'src/app/shared/constants/MissingInOutConst.js';
import { Platform } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';

const COMMON_CONST = CommonConst;
const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;
const API_LATEEARLY = HrmAPIConst.LATEEARLY;
@Component({
  selector: 'app-extradayoff-aprrove-details',
  templateUrl: './DetailLateEarlyApprove.component.html',
  styleUrls: ['./DetailLateEarlyApprove.component.scss'],
})
export class DetailLateEarlyApproveComponent implements OnInit {
  RequestData;
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  txtApproveNote;
  user;
  IsShow = false;
  IsRequireChoose;
  Lang: any;
  IsNotification = false;
  IsEmployeeAttendance = false;
  IsVisibleRoot1 = false;IsVisibleRoot2= false; IsVisibleNew2 = false; IsVisibleNew1= false;
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
  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state.itemFunction;
    this.initItemApprove();

    this.getLanguage();
  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();

  };
  initItemApprove() {
    const formatDate = this.FormatDate;
    const leaveApproveData = this.router.getCurrentNavigation().extras.state.LeaveApproveData;
    if (leaveApproveData) {
        leaveApproveData.CreateDateView = moment(leaveApproveData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        leaveApproveData.BegDateView = FormatHandler.formatDate(leaveApproveData.BegDate, this.user);
        leaveApproveData.EndDateView = FormatHandler.formatDate(leaveApproveData.EndDate, this.user);
        const txtApproveNote = leaveApproveData.Status === 1 && leaveApproveData.ApproveNote != null ? leaveApproveData.ApproveNote : '';
        this.RequestData= leaveApproveData;
        this.txtApproveNote= txtApproveNote;
        this.IsVisibleRoot1 =  this.RequestData['Kind'] == 0
        && ((this.RequestData['MaxTimes'] == 4)
            || (this.RequestData['MaxTimes'] == 2 && this.RequestData['LeavePeriod'] != 2)) ? true : false;

            this.IsVisibleNew1 =  ((this.RequestData['MaxTimes'] == 4)
            || (this.RequestData['MaxTimes'] == 2 && this.RequestData['LeavePeriod'] != 2)) ? true : false;


        this.IsVisibleRoot2  =  ((this.RequestData['MaxTimes'] == 4)
              || (this.RequestData['MaxTimes'] == 2 && this.RequestData['LeavePeriod'] == 2))
              && this.RequestData['Kind'] == 0 ? true : false;

        this.IsVisibleNew2 =  this.IsVisibleRoot2;
    }
  }
  updateLeaveRequest(params, callback?) {
    this.api.post(API_LATEEARLY.Alias_UpdateLateEarlyApprover, API_LATEEARLY.UpdateLateEarlyApprover,params)
        .subscribe((result) => {
            if (!result.Error && this.RequestData) {
              this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
              callback(result);
            }
        });
  }



  eventOnReject() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    const params = {
      RecordID: leaveApproveData.ID,
      ApproveNote: this.txtApproveNote,Note:this.txtApproveNote,
      Status: leaveApproveData.Status == 1 ? MissingInOutConst.STATUS.E_Reject : MissingInOutConst.STATUS.E_Wait,
    };
    this.updateLeaveRequest(params, (result) => {
      const leaveApproveData1 = this.RequestData || {};
      leaveApproveData.StatusName = result.Data.StatusNameRespone;
      leaveApproveData.Status = result.Data.StatusRespone;
      leaveApproveData1.ApproveNote = this.txtApproveNote;
      leaveApproveData.Note = this.txtApproveNote;

      this.RequestData = leaveApproveData;
    });
  }

  eventOnApprove() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData || typeof leaveApproveData != 'object' || (!leaveApproveData.ID && !leaveApproveData.RecordID)) {
        this.notifications.alert(this.Lang.NOTIFY.DataNotFound,this.Lang.COMMON.Error);
        return;
    }
    const params = {
        RecordID: leaveApproveData.ID,
        ApproveNote: this.txtApproveNote,Note:this.txtApproveNote,
        Status: leaveApproveData.Status == 1 ? MissingInOutConst.STATUS.E_Approved : MissingInOutConst.STATUS.E_Cancelled,
    };
    const callback = (result) => {
      leaveApproveData.StatusName = result.Data.StatusNameRespone;
      leaveApproveData.Status = result.Data.StatusRespone;
      leaveApproveData.ApproveNote = this.txtApproveNote;
      leaveApproveData.Note = this.txtApproveNote;

      this.RequestData = leaveApproveData;
    };
    this.updateLeaveRequest(params, callback);
  }
}
