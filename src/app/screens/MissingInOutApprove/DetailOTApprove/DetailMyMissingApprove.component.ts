/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import  LeaveAndOTConst from 'src/app/shared/constants/LeaveAndOTConst.js';
import  MissingInOutConst from 'src/app/shared/constants/MissingInOutConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { Router } from '@angular/router';

import HrmStorageConst from 'src/libs/constants/HrmStorageConst.js';
import HrmStorage from 'src/libs/core/HrmStorage.js';

const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;

@Component({
  selector: 'app-ot-aprrove-details',
  templateUrl: './DetailMyMissingApprove.component.html',
  styleUrls: ['./DetailMyMissingApprove.component.scss'],
})
export class DetailMyMissingApproveComponent implements OnInit {
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
  itemFunction;
  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private languageService: LanguageService,
    public CommonHandler: CommonHandlerService,
    private notifications: NotificationsService,
    private notification: NotificationsService,
    private router: Router) {
    this.translate.use(this.auth.get().Language ? this.auth.get().Language.toLowerCase() : 'VN');
    this.user = auth.get();
  }
  ngOnInit() {
    this.getLanguage();
    this.initItemApprove();
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state.itemFunction;

  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
  };



  initItemApprove() {
    const leaveApproveData = this.router.getCurrentNavigation().extras.state.LeaveApproveData;
    if (leaveApproveData) {
        leaveApproveData.WorkDateView = FormatHandler.formatDate(leaveApproveData.WorkDate, this.user);
        const txtApproveNote = leaveApproveData.DefaultApproveNote;
        this.RequestData= leaveApproveData;
        this.txtApproveNote= txtApproveNote;
    }
  }

  // ShowNguoiThayThe(){
  //   this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe', 'GetConfigNguoiThayThe',
  //       {
  //           ProcessID: 0
  //       })
  //       .subscribe((res) => {
  //               this.IsShow = res.Data.ShowNguoiThayThe.length > 0? true : false;
  //               this.IsRequireChoose = res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
  //       });
  // }

  updateRequest(params) {
    this.api.post(API_MISSINGINOUT.Alias_UpdateMissingInOutApprover, API_MISSINGINOUT.UpdateMissingInOutApprover,params)
        .subscribe((result) => {
            this.ModalLoading.dismiss();
            if (!result.Error && this.RequestData) {
                if (result.Data.ErrorCodeRespone && result.Data.IsErrorRespone) {
                  const arrMsgError =  HrmStorage.getData(HrmStorageConst.MessageError);
                  this.notifications.alert(this.Lang.COMMON.Alert,arrMsgError[result.Data.ErrorCodeRespone] || result.Data.ErrorCodeRespone);
                  return;
                } else {
                    const requestData = this.RequestData || {};
                    requestData.StatusName = result.Data.StatusNameRespone;
                    requestData.Status = result.Data.StatusRespone;
                    requestData.ApproveNote = this.txtApproveNote;
                    this.RequestData = requestData;
                    this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
                }
            }
        });
  }

  async eventOnReject() {
    const leaveApproveData = this.RequestData;
    if (!leaveApproveData  && !leaveApproveData.ID) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    else{
      this.ModalLoading = await this.notification.showLoading();
    }
    const params = {
      Status: MissingInOutConst.STATUS.E_Reject,
      RecordID: this.RequestData.RecordID,
      Note: this.txtApproveNote
    };
    this.updateRequest(params);
  }



  validateBeforeApprove() {
    const formatDate = this.FormatDate;
    this.api.post(API_MISSINGINOUT.Alias_ValidateWarningScanTimeRequest, API_MISSINGINOUT.ValidateWarningScanTimeRequest,
        {
            WorkDate: moment(this.RequestData.WorkDate, formatDate).format(CommonConst.FormatSQLDate),
            RecordID: this.RequestData.RefID,
            Kind: 1,
        })
        .subscribe((result) => {
            if (result && !result.IsError) {
                if (result.Data.ErrorCodeRespone && result.Data.IsErrorRespone) {
                const arrMsgError =  HrmStorage.getData(HrmStorageConst.MessageError);
                this.notifications.alert(this.Lang.COMMON.Error,arrMsgError[result.Data.ErrorCodeRespone] || result.Data.ErrorCodeRespone,
                  ()=> this.onApprove());
                }
                else {
                    this.onApprove();
                }
            }
        });
  }

  onApprove = async () => {
    if (!this.RequestData || !this.RequestData.RecordID) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
        return;
    }
    else{
      this.ModalLoading = await this.notification.showLoading();
    }
    const params = {
        Status: MissingInOutConst.STATUS.E_Approved,
        RecordID: this.RequestData.RecordID,
        Note: this.txtApproveNote
    };

    this.updateRequest(params);
  };

  async eventOnApprove() {
    this.onApprove();
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
    const params = {
      Status: MissingInOutConst.STATUS.E_Wait,
      RecordID: this.RequestData.RecordID,
      Note: this.txtApproveNote

    };
    this.updateRequest(params);
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

    const params = {
      Status: MissingInOutConst.STATUS.E_Cancelled,
      RecordID: this.RequestData.RecordID,
      Note: this.txtApproveNote

    };
    this.updateRequest(params);
  }
}
