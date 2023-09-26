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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const COMMON_CONST = CommonConst;
const API_OT_GROUP_REQUEST = HrmAPIConst.OT_GROUP_REQUEST;

@Component({
  selector: 'app-otgrouprequestdetail',
  templateUrl: './OTGroupRequestDetail.component.html',
  styleUrls: ['./OTGroupRequestDetail.component.scss'],
})
export class OTGroupRequestDetailComponent implements OnInit {
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
  LeaveAndOTConst = LeaveAndOTConst;
  tabName = LeaveAndOTConst.TAB.Infomation;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  ListEmployee = [];
  LenEmployee = 0;
  LabelLoaiKeHoach='Loại kế hoạch' ;//"Type plan",
  paramfile= {};
  itemFunction;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore, private languageService: LanguageService,
    private router: Router,
    private variablesService: VariableCommonService,
    public notification: NotificationsService,
    public CommonHandler: CommonHandlerService) {
    this.user = this.auth.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.auth.getLanguage());
    this.paramfile = {
      FunctionID : '2400', //functionid trên web
      TableName:'HCSHP_OTGroupRequest',
      FileID : '',
      EmpLogin :this.user.EmployeeCode,
      LoginInfo:this.user,
      FieldValue: '',
      FieldName:'FileID',
    };
  }
  ngOnInit() {
    this.getLanguage();
    this.initItemOTDetail();
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state ?
    this.router.getCurrentNavigation()?.extras?.state?.itemFunction : {};
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    if(this.auth.getLanguage() === 'en')
    {
      this.LabelLoaiKeHoach ='Type plan';
    }
    this.initButtonPleaseCancel();
    this.loadConfig().subscribe();
  };
  eventSelectTab = (name) => {
    if (this.tabName === name.detail.value) {return;}
    this.tabName = name.detail.value;
  };
  initItemOTDetail() {

    const requestData = this.router.getCurrentNavigation().extras.state ?
    this.router.getCurrentNavigation().extras.state.RequestData : {};


    if (requestData) {
        requestData.CreateDateView = moment(requestData.CreateDate).format(CommonConst.FormatSQLDate);
        requestData.BegDateView = FormatHandler.formatDate(requestData.BegDate, this.user);
    }
    this.RequestData=requestData;
    const object = JSON.parse(JSON.stringify(this.paramfile));
    object['FieldValue'] = this.RequestData?.FileID;
    object['FileID'] = this.RequestData?.FileID; // thêm mới thì FileID = FieldValue
    this.paramfile = object;
  }


  loadConfig(): Observable<any> {
    return this.api.post(API_OT_GROUP_REQUEST.Alias_GetListEmployee, API_OT_GROUP_REQUEST.GetListEmployee,
        {
            RecordID: this.RequestData.RecordID,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .pipe(map(result => {
            if (result && !result.Error) {
                const currentData = result.Data && result.Data.ListEmployee || {};
                this.ListEmployee = [...this.ListEmployee,...currentData.Data];
                const outputParams = currentData.OutputParams || {};
                const totalItems = outputParams[CommonConst.KEY.TotalItems];
                this.currentItems += currentData.Data.length;
                this.LenEmployee =  totalItems;
            }
        }));
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
    this.api.post(API_OT_GROUP_REQUEST.Alias_RejectRequestOTGroupRequest, API_OT_GROUP_REQUEST.RejectRequestOTGroupRequest,
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
              this.router.navigate(['/OTGroupRequest']);
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

}
