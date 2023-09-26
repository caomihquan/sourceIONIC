/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import CommonConst from '../../../../libs/constants/CommonConst.js';
import FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import LeaveAndOTConst from '../../../shared/constants/LeaveAndOTConst.js';
import * as moment from 'moment';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';

const COMMON_CONST = CommonConst;
const API_OT_REQUEST = HrmAPIConst.OT_REQUEST;

@Component({
  selector: 'app-otrequestdetail',
  templateUrl: './OTRequestDetail.component.html',
  styleUrls: ['./OTRequestDetail.component.scss'],
})
export class OTRequestDetailComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  IsActivePleaseCancel = false;
  FormatDate = COMMON_CONST.FormatDate.toLocaleUpperCase();
  txtReason = '';
  NguoiThayThe = '';
  IsRequireChoose = false;
  Lang: any;
  user: any;
  formatHandler = FormatHandler;
  ObjConfig;
  IsHideComboPayValue = true;
  listKow = [];
  IsPay = true;
  listOfHistRequest = [];
  LabelHinhThuc= "Hình thức đăng ký tăng ca";
  LabelLoaiKeHoach="Loại kế hoạch" ;//"Type plan",
  paramfile= {};
  itemFunction;


  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore, private languageService: LanguageService,
    private router: Router,
    private variablesService: VariableCommonService,
    public notification: NotificationsService,
    public commonHandler: CommonHandlerService) {
    this.user = this.auth.get();

    this.paramfile = {
      FunctionID : '2100', //functionid trên web
      TableName:'HCSHP_OTRequest',
      FileID : '',
      EmpLogin :this.user.EmployeeCode,
      LoginInfo:this.user,
      FieldValue: "",
      FieldName:"FileID",
    };

    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.getLanguage();
    this.ObjConfig = this.router.getCurrentNavigation()?.extras?.state ?
    this.router.getCurrentNavigation()?.extras?.state : {};
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state ?
    this.router.getCurrentNavigation()?.extras?.state?.itemFunction : {};
    this.IsPay = this.ObjConfig.IsPay;
    this.listOfHistRequest = this.ObjConfig.listOfHistRequest;
    //this.listOfHistRequest = this.ObjConfig["listOfHistRequest"];

    if (this.ObjConfig.lstPayValue != null && this.ObjConfig.lstPayValue.length > 1) {
    this.IsHideComboPayValue = false;
    }
    this.initItemLeaveDetail();
    this.initButtonPleaseCancel();
  }

  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.FormatDate = this.user.PRDateFormat;
    if(this.auth.getLanguage() == 'en')
    {
      this.LabelHinhThuc ="Overtime registration form";
      this.LabelLoaiKeHoach ="Type plan";
    }
  };
  initItemLeaveDetail() {
    const requestData = this.router.getCurrentNavigation().extras.state ?
    this.router.getCurrentNavigation().extras.state.RequestData : {};
    if (requestData) {
        requestData.CreateDateView = moment(requestData.CreateDate).format(CommonConst.FormatSQLDate);
        requestData.BegDateView = FormatHandler.formatDate(requestData.BegDate, this.user);
        requestData.EndDateView = FormatHandler.formatDate(requestData.EndDate, this.user);
    }
    this.RequestData=requestData;
    const object = JSON.parse(JSON.stringify(this.paramfile));
    object["FieldValue"] = this.RequestData?.FileID;
    object["FileID"] = this.RequestData?.FileID; // thêm mới thì FileID = FieldValue
    this.paramfile = object;
  }
  async presentAlert() {
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
  }
  handleOnPleaseReject = () => {
    if (this.RequestData.IsRequireWhenCancel) {
      this.presentAlert();
    }
    else {
        this.eventOnPleaseReject();
    }
  };

  eventOnPleaseReject() {
    if (!this.RequestData || !this.RequestData.RecordID) {
      this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound);
      return;
    }

    if (this.RequestData?.IsRequireWhenCancel && !this.txtReason){
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason);
        return;
    }
    const me = this;
    this.api.post(API_OT_REQUEST.Alias_CalFnSendMailRejectOT, API_OT_REQUEST.CalFnSendMailRejectOT,
      {
          RecordID: me.RequestData.RecordID,
          ReasonDetroy: this.txtReason || ''
      })
      .subscribe((result) => {
          if (result && !result.Error) {
              const requestData = me.RequestData || {};
              requestData.StatusName = this.Lang.LEAVE_REQUEST.PleaseCancel;
              requestData.Status = LeaveAndOTConst.STATUS.E_Wait;
              requestData.ReasonDetroy = this.txtReason || '';
              this.RequestData= requestData;
              this.IsActivePleaseCancel= false;
              this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
              this.variablesService.$reloadFunction.next(true);
              this.router.navigate(['/OTRequest']);
          }
      });
  }



  initButtonPleaseCancel = () => {
    const leaveRequest = this.RequestData;
    if (leaveRequest && leaveRequest[LeaveAndOTConst.KEY.Status]) {
      const status = leaveRequest[LeaveAndOTConst.KEY.Status];
      const isUsedRejectProcess = leaveRequest[LeaveAndOTConst.KEY.IsUsedRejectProcess] || false;
      this.IsActivePleaseCancel = !LeaveAndOTConst.ListActivePleaseCancel.includes(status) && !isUsedRejectProcess;
    }
  };
}
