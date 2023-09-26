/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService, } from '@ngx-translate/core';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import LeaveAndOTConst from '../../shared/constants/LeaveAndOTConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import FormatHandler from '../../shared/handlers/FormatHandler.js';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { IonInfiniteScroll } from '@ionic/angular';


const API_OT_REQUEST = HrmAPIConst.OT_REQUEST;
@Component({
  selector: 'app-my-otrequest',
  templateUrl: './MyOTRequest.component.html',
  styleUrls: ['./MyOTRequest.component.scss'],
})
export class MyOTRequestComponent implements OnInit {
  // eslint-disable-next-line max-len
  reActiveInfinite: any;
  user;
  Lang;
  LeaveAndOTConst = LeaveAndOTConst;
  RequestData= [];
  OldRequestData= [];
  ListOfHistRequest= [];
  IsRegOTByFromTo= false;
  IsSelectOTType= false;
  ListKow= [];
  lstPayValue= [];
  IsVisibleOrderBy= false;
  IsVisibleYear= false;
  IsModalLoading= false;
  YearSelection= moment().year();
  SortBy= LeaveAndOTConst.KEY.Status;
  SortByName= LeaveAndOTConst.KEY.Status;
  YearItems= this.commonHandler.getYears();
  IsPay= false;
  PayValue= null;
  IsPayDisible= false;
  HinhThucNghiBu= '';
  PayValueName= '';
  WarninViolationType= 0;
  WarninViolationObject= 0;
  ReOptions= null;
  IsLoadFinish= false;
  IsFieldVisibleToDate;
  OrderByItems = [
    { key: LeaveAndOTConst.KEY.BegDate, name: LeaveAndOTConst.KEY.Month },
    { key: LeaveAndOTConst.KEY.Status, name: LeaveAndOTConst.KEY.Status },
    { key: LeaveAndOTConst.KEY.KowName, name: LeaveAndOTConst.KEY.Type }
  ];
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  TotalItems = 0;
  listRequest=[];
  TSTypeCalOTAlloRegis =0;
  itemFunction;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private variablesService: VariableCommonService,
    private auth: AuthStore, private languageService: LanguageService,
    public commonHandler: CommonHandlerService
  ) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }

  ngOnInit() {
    this.variablesService.$reloadFunction.next(false);
    this.getLanguage();
    this.commonHandler.dragElement('dragable');
    this.variablesService.$reloadFunction.subscribe(res => {
      if(res){
        this.loadDataRequest().subscribe();
      }
    });
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state;
  }

  initOption() {
    this.PageIndex = 0;
    this.PageSize = CommonConst.VALUE.PageSize;
    this.TotalItems = 0;
    this.currentItems = 0;
    this.OldRequestData= [];
    this.listRequest =[];

  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.loadDataRequest(true).subscribe();

  };
  loadDataRequest(isGetDataSupport = false): Observable<any> {
    return this.api.post(API_OT_REQUEST.Alias_GetOTRequestConfig, API_OT_REQUEST.GetOTRequestConfig,
        {
            Year: this.YearSelection,
            SortBy: this.SortBy,
            IsGetDataSupport: isGetDataSupport,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .pipe(map(result => {
            if (!result.Error) {
                const data = result.Data;
                const listOfHistRequest = data[LeaveAndOTConst.ListOfHistRequest] || [];
                const dataIsRegOTByFromTo = data[LeaveAndOTConst.IsRegOTByFromTo] && data[LeaveAndOTConst.IsRegOTByFromTo][0] || {};
                const isRegOTByFromTo = dataIsRegOTByFromTo[LeaveAndOTConst.KEY.TSIsRegOTByFromTo] || false;
                const IsPay = dataIsRegOTByFromTo.IsPay || false;
                const PayValue = dataIsRegOTByFromTo.PayValue || null;
                const IsPayDisible = dataIsRegOTByFromTo.IsPayDisible || false;
                const HinhThucNghiBu = dataIsRegOTByFromTo.HinhThucNghiBu || '';
                const PayValueName = dataIsRegOTByFromTo.PayValueName || '';
                const WarninViolationType = dataIsRegOTByFromTo.WarninViolationType || 0;
                const WarninViolationObject = dataIsRegOTByFromTo.WarninViolationObject || false;
                const dataDefaultKow = data[LeaveAndOTConst.DefaultKow] && data[LeaveAndOTConst.DefaultKow][0] || {};
                const defaultKow = dataDefaultKow[LeaveAndOTConst.KEY.TSOTKowCodeWhenRegOT] || null;
                const isSelectOTType = dataDefaultKow[LeaveAndOTConst.KEY.TSIsSelectOTType] || false;
                const configFields = data[LeaveAndOTConst.ConfigFields] || [];
                const TSTypeCalOTAlloRegis=dataDefaultKow['TSTypeCalOTAlloRegis'] || 0;
                const isFieldVisibleToDate = this.commonHandler.getFieldVisible(configFields, 'ToDate');
                let listKow = data[LeaveAndOTConst.ListKow] || [];
                listKow = listKow.sort(item =>
                  (item[LeaveAndOTConst.KEY.KowCode] + '').toLocaleLowerCase() === (defaultKow + '').toLocaleLowerCase() ||
                    (item[LeaveAndOTConst.KEY.KowCode] + '').toLocaleLowerCase() === (LeaveAndOTConst.STATUS.E_DefaultKow).toLocaleLowerCase() ? -1 : 1);
                const lstPayValue = data.lstPayValue || [];
                const currentData = data[LeaveAndOTConst.OTResponse] || [];
                const outputParams = currentData.OutputParams || {};
                this.listRequest = [... this.listRequest,...currentData.Data] || [];
                this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
                this.currentItems += currentData.Data.length;

                const convertedData = this.commonHandler.convertDataLeave(this.listRequest, this.SortBy, this.Lang.COMMON.ListStatus);
                if (isGetDataSupport) {
                        this.ListOfHistRequest = listOfHistRequest;
                        this.IsRegOTByFromTo = isRegOTByFromTo;
                        this.IsSelectOTType = isSelectOTType;
                        this.IsFieldVisibleToDate = isFieldVisibleToDate;
                        this.ListKow = listKow;
                        this.lstPayValue= lstPayValue;
                        this.OldRequestData= this.listRequest;
                        this.RequestData= convertedData;
                        this.IsPay = IsPay;
                        this.PayValue = PayValue;
                        this.IsPayDisible = IsPayDisible;
                        this.HinhThucNghiBu = HinhThucNghiBu;
                        this.PayValueName = PayValueName;
                        this.WarninViolationObject = WarninViolationObject;
                        this.WarninViolationType = WarninViolationType;
                        this.TSTypeCalOTAlloRegis=TSTypeCalOTAlloRegis
                }else {
                      this.OldRequestData= this.listRequest;
                      this.RequestData= convertedData;
                }
            }
        }));
}

  eventSelectedMonth(item) {
    if (item && item[LeaveAndOTConst.KEY.key]) {
      const me = this;
      this.initOption();
      this.YearSelection= item[LeaveAndOTConst.KEY.key];

      me.loadDataRequest().subscribe();
    }
  }
  eventSelectedStatus(item) {
    if (item && item[LeaveAndOTConst.KEY.key]) {
          this.initOption();
          this.SortBy = item[LeaveAndOTConst.KEY.key];
          this.SortByName = item[LeaveAndOTConst.KEY.name];
          this.loadDataRequest().subscribe();
    }
  }


  onClickEmp(item) {
    this.initOption();
    const params = {
      RequestData: item,
      IsRegOTByFromTo: this.IsRegOTByFromTo || false,
      IsFieldVisibleToDate: this.IsFieldVisibleToDate || false,
      IsPay: this.IsPay || false,
      PayValue: this.PayValue || 0,
      IsPayDisible: this.IsPayDisible || false,
      HinhThucNghiBu: this.HinhThucNghiBu || '',
      lstPayValue: this.lstPayValue || [],
      PayValueName: this.PayValueName || '',
      WarninViolationType: this.WarninViolationType || 0,
      WarninViolationObject: this.WarninViolationObject || '',
      TSTypeCalOTAlloRegis:this.TSTypeCalOTAlloRegis,
      itemFunction:this.itemFunction
    };
    this.variablesService.$reloadFunction.next(false);
    this.router.navigate(['/OTRequest/OTRequestDetail'], { state: params});
  }
  onClickAddNew() {
  this.initOption();
  this.variablesService.$reloadFunction.next(false);
  const ListKow = this.ListKow || [];
  const IsFieldVisibleToDate = this.IsFieldVisibleToDate || false;
  const IsPay = this.IsPay || false;
  const PayValue = this.PayValue || 0;
  const IsPayDisible = this.IsPayDisible || false;
  const HinhThucNghiBu = this.HinhThucNghiBu || '';
  const lstPayValue = this.lstPayValue || [];
  const PayValueName = this.PayValueName || '';
  const WarninViolationType = this.WarninViolationType || 0;
  const WarninViolationObject = this.WarninViolationObject || '';
 //data[LeaveAndOTConst.ListOfHistRequest] || [];
    const params = {
       ListOfHistRequest: this.ListOfHistRequest || [],
       IsRegOTByFromTo: this.IsRegOTByFromTo || false,
       IsSelectOTType: this.IsSelectOTType || false,
       ListKow,
       IsFieldVisibleToDate,
       IsPay,
       PayValue,
       IsPayDisible,
       HinhThucNghiBu,
       lstPayValue,
       PayValueName,
       WarninViolationType,
       WarninViolationObject,
       TSTypeCalOTAlloRegis:this.TSTypeCalOTAlloRegis,
       itemFunction:this.itemFunction
    };
    this.router.navigate(['/OTRequest/OTRequestCreate'], { state: params});
  }


  loadMore(event) {
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.loadDataRequest(true).subscribe(res => {
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



