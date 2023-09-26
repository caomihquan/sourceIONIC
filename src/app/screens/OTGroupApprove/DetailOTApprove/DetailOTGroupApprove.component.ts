/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import  LeaveAndOTConst from 'src/app/shared/constants/LeaveAndOTConst.js';
import  OTGroupConst from 'src/app/shared/constants/OTGroupConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import * as moment from 'moment';
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const COMMON_CONST = CommonConst;
const API_OT_GROUP_REQUEST = HrmAPIConst.OT_GROUP_REQUEST;
@Component({
  selector: 'app-ot-aprrove-details',
  templateUrl: './DetailOTGroupApprove.component.html',
  styleUrls: ['./DetailOTGroupApprove.component.scss'],
})
export class DetailOTGroupApproveComponent implements OnInit {
  RequestData;
  ApproveLevelList: Array<any>;
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  txtApproveNote;
  user;
  IsShow = false;
  IsRequireChoose;
  Lang: any;
  tabName = LeaveAndOTConst.TAB.Infomation;
  IsNotification = false;
  IsEmployeeAttendance = false;
  ModalLoading;
  LeaveAndOTConst = LeaveAndOTConst;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  ListEmployee = [];
  LenEmployee = 0;
  LabelLoaiKeHoach='Loại kế hoạch' ;//"Type plan",

  ListKow;
  KowSelected;
  KowName;
  KowCode;
  paramfile= {};
  itemFunction
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
    this.paramfile = {
      FunctionID : '2400', //functionid trên web
      TableName:'HCSHP_OTGroupRequest',
      EmpLogin :this.user.EmployeeCode,
      LoginInfo:this.user,
      FieldValue: '',
      FieldName:'FileID',
      FileID:''
    };
    this.initItemApprove();
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state?.itemFunction;
    this.getLanguage();

  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    if(this.auth.getLanguage() === 'en')
    {
      this.LabelLoaiKeHoach ='Type plan';
    }
    this.loadConfig().subscribe();
    this.ShowNguoiThayThe();

  };

  eventSelectTab = (name) => {
    if (this.tabName === name.detail.value) {return;}
    this.tabName = name.detail.value;
  };
  initItemApprove() {
    const formatDate = this.FormatDate;
    const leaveApproveData = this.router.getCurrentNavigation()?.extras?.state?.LeaveApproveData;
    if (leaveApproveData) {
        leaveApproveData.CreateDateView = moment(leaveApproveData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        leaveApproveData.BegDateView = FormatHandler.formatDate(leaveApproveData.BegDate, this.user);
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

  loadMore(event) {
    if (this.currentItems < this.LenEmployee) {
      this.PageIndex++;
      this.loadConfig().subscribe(res => {
        setTimeout(() => {
          event.target.complete();
        }, 1000);
      });
    }
    else{
      event.target.complete();
    }
  }
  loadConfig(): Observable<any> {
    return this.api.post(API_OT_GROUP_REQUEST.Alias_GetConfigOTGroup, API_OT_GROUP_REQUEST.GetConfigOTGroup,
        {
            RecordID : this.RequestData.RecordID,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,

        })
        .pipe(map(result => {
            if (result && !result.IsError) {
                const requestData = this.RequestData;
                const data = result.Data || {};
                const listKow = data.ListKow || [];
                const currentData = data.ListEmployee || {};
                this.ListEmployee = [...this.ListEmployee,...currentData.Data];
                const outputParams = currentData.OutputParams || {};
                const totalItems = outputParams[CommonConst.KEY.TotalItems];
                this.currentItems += currentData.Data.length;
                this.LenEmployee = totalItems;
                const kowCode = requestData[OTGroupConst.KEY.KowCode];
                const findKowCode = listKow.filter(item => item[OTGroupConst.KEY.Value] === kowCode);
                const currentKowCode = findKowCode && findKowCode.length > 0 ? findKowCode[0] : listKow[0];
                this.ListKow=listKow;
                this.KowSelected = currentKowCode;
                this.KowCode = currentKowCode.Value;
                this.KowName = currentKowCode.Caption;
            }
        }));
  }

  initOption() {
        this.PageIndex = 0;
        this.PageSize = CommonConst.VALUE.PageSize;
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
    // const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    // const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Reject_Mobile : LeaveAndOTConst.STATUS.E_Reject;

    const params = {
      Kind: LeaveAndOTConst.STATUS.E_Reject,
      ID: this.RequestData.ID,
      Note: this.txtApproveNote,
      KowCode: this.KowCode
    };
    this.updateOTRequest(params);
  }

  updateOTRequest(params) {
    this.api.post(API_OT_GROUP_REQUEST.Alias_UpdateOTGroupApprover, API_OT_GROUP_REQUEST.UpdateOTGroupApprover,params)
            .subscribe((result) => {
              this.ModalLoading.dismiss();
                if (result && !result.Error && this.RequestData) {
                    const requestData = this.RequestData || {};
                    requestData.StatusName = result.Data.StatusNameRespone;
                    requestData.Status = result.Data.StatusRespone;
                    requestData.ApproveNote = this.txtApproveNote;
                    requestData.KowName = this.KowName;
                    this.RequestData = requestData;
                    this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
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
    // const isUsingRecordID = this.IsEmployeeAttendance || this.IsNotification;
    // const kind = isUsingRecordID ? LeaveAndOTConst.STATUS.E_Approved_Mobile : LeaveAndOTConst.STATUS.E_Approved;

    const params = {
      Kind: LeaveAndOTConst.STATUS.E_Approved,
      ID: this.RequestData.ID,
      Note: this.txtApproveNote,
      KowCode: this.KowCode
    };
    this.updateOTRequest(params);
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
        Kind: LeaveAndOTConst.STATUS.E_Approved,
        ID: leaveApproveData.ID,
        KowCode: this.KowCode

    };
    this.updateOTRequest(params);
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
        Kind: LeaveAndOTConst.STATUS.E_Cancelled,
        ID: leaveApproveData.ID,
        KowCode: this.KowCode

    };
    this.updateOTRequest(params);
  }

  eventOnSelectedKowCode(item) {
    if (item) {
        this.KowSelected= item;
        this.KowCode = item.Value;
        this.KowName = item.Caption;
    }
}
}
