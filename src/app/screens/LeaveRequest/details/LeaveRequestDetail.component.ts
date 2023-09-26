/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-leaverequestdetail',
  templateUrl: './LeaveRequestDetail.component.html',
  styleUrls: ['./LeaveRequestDetail.component.scss']
})
export class LeaveRequestDetailComponent implements OnInit {
  // eslint-disable-next-line max-len
  RequestData;
  ApproveLevelList: Array<any>;
  RemainLeaveNumber= [];
  IsActivePleaseCancel= false;
  IsModalLoading= false;
  txtReason= '';
  showAlertDialog= false;
  NguoiThayThe = '';
  IsShow= false;
  IsRequireChoose= false;
  Lang: any;
  user: any;
  LoginInfo: any;
  FormatDate= CommonConst.FormatDate.toLocaleUpperCase();
  handlerMessage = '';
  paramfile= {};
  itemFunciton: any;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore, private languageService: LanguageService,
    private variablesService: VariableCommonService,
    private router: Router,public commonHandler: CommonHandlerService, public notification: NotificationsService,
    public alertController: AlertController ) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
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
    this.LoginInfo = this.auth.get();
    this.getLanguage();
    this.componentDidMount();
    this.itemFunciton = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.itemFunction : {};
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
    this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.DataNotFound, null,null,['btnReject']);
    return;
 }

  if (this.RequestData.IsRequireWhenCancel &&
      (this.txtReason == null || this.txtReason.trim() === '')) {
      this.notification.alert( this.Lang.COMMON.Error,this.Lang.NOTIFY.EnterReason,null,null,['btnReject']);
      return;
   }
  this.IsModalLoading = true;
  this.api.post(API_LEAVE_REQUEST.Alias_CalFnSendMailRejectRegLeave, API_LEAVE_REQUEST.CalFnSendMailRejectRegLeave,
    {
      RecordID: this.RequestData.RecordID,
      ReasonDetroy: this.RequestData.txtReason || ''
    })

    .subscribe(result => {
        this.IsModalLoading = false;
        if (result && !result.IsError) {
          const requestData = this.RequestData || {};
          requestData.StatusName = this.Lang.LEAVE_REQUEST.PleaseCancel;
          requestData.Status = LeaveAndOTConst.STATUS.E_Wait;
          requestData.ReasonDetroy = this.txtReason || '';
          this.RequestData= requestData;
          this.IsActivePleaseCancel= false;
          this.notification.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.UpdateSuccess);
          this.variablesService.$reloadFunction.next(true);
          this.router.navigate(['/LeaveRequest']);
      }
    });

}
eventShowDialog = () => {
  this.showAlertDialog = true;
};
componentDidMount = ()=> {
    this.api.post('HrmMobileApp/System/GetConfigNguoiThayThe','GetConfigNguoiThayThe',
      {
        ProcessID: 0
      })
      .subscribe(res => {
        this.IsShow= res.Data.ShowNguoiThayThe.length > 0? true : false;
        this.IsRequireChoose= res.Data.IsRequireChooseNguoiThayThe.length > 0 ? true: false;
      });
      this.RequestData =this.router.getCurrentNavigation().extras.state ?
      this.router.getCurrentNavigation().extras.state.RequestData : {};

      const object = JSON.parse(JSON.stringify(this.paramfile));
        object['FieldValue'] = this.RequestData?.FileID;
        object['FileID'] = this.RequestData?.FileID; // thêm mới thì FileID = FieldValue
        this.paramfile = object;

      const formatDate = this.FormatDate;
      if (this.RequestData) {
        this.RequestData.CreateDateView = moment(this.RequestData.CreateDate, CommonConst.FormatSQLDate).format(formatDate);
        this.RequestData.BegDateView = FormatHandler.formatDate(this.RequestData.BegDate, this.LoginInfo);
        this.RequestData.EndDateView = FormatHandler.formatDate(this.RequestData.EndDate, this.LoginInfo);
        this.RequestData.NgaySinhCon = FormatHandler.formatDate(this.RequestData.NewChildBirthDate, this.LoginInfo);

      }
      this.initButtonPleaseCancel();
  };
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
  };

  initButtonPleaseCancel = () => {
    const leaveRequest = this.RequestData;
    if (leaveRequest && leaveRequest[LeaveAndOTConst.KEY.Status]) {
        const status = leaveRequest[LeaveAndOTConst.KEY.Status];
        const isUsedRejectProcess = leaveRequest[LeaveAndOTConst.KEY.IsUsedRejectProcess] || false;
        this.IsActivePleaseCancel= !LeaveAndOTConst.ListActivePleaseCancel.includes(status) && !isUsedRejectProcess;
    }
  };
}
