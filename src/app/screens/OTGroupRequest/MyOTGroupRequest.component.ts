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
import OTGroupConst from '../../shared/constants/OTGroupConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

const primaryMoment = moment();
const API_OT_GROUP_REQUEST = HrmAPIConst.OT_GROUP_REQUEST;
const KEY_SCENE = CommonConst.SCENE;
@Component({
  selector: 'app-my-otrequest',
  templateUrl: './MyOTGroupRequest.component.html',
  styleUrls: ['./MyOTGroupRequest.component.scss'],
})
export class MyOTGroupRequestComponent implements OnInit {
  // eslint-disable-next-line max-len
  reActiveInfinite: any;
  user;
  Lang;
  functionItem;
  LeaveAndOTConst = OTGroupConst;
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
  SortBy= OTGroupConst.KEY.Status;
  SortByName= OTGroupConst.KEY.Status;
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
    { key: OTGroupConst.KEY.BegDate, name: OTGroupConst.KEY.Month },
    { key: OTGroupConst.KEY.Status, name: OTGroupConst.KEY.Status },
    { key: OTGroupConst.KEY.KowName, name: OTGroupConst.KEY.Type }
  ];
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  currentItems = 0;
  TotalItems = 0;
  listRequest=[];
  paramfile= {};

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
    this.getLanguage();
    this.commonHandler.dragElement('dragable');
    this.functionItem = this.router.getCurrentNavigation()?.extras?.state;

  }
  getLanguage = async () => {
    this.variablesService.$reloadFunction.next(false);
    this.Lang = await this.languageService.getLanguage();
    this.variablesService.$reloadFunction.subscribe(res => {
      if(res){
        this.loadDataRequest().subscribe();
      }
    });
    this.loadDataRequest().subscribe();

  };
  initOption() {
    this.PageIndex = 0;
    this.PageSize = CommonConst.VALUE.PageSize;
    this.TotalItems = 0;
    this.currentItems = 0;
    this.OldRequestData= [];
    this.listRequest =[];

  }

  loadDataRequest(): Observable<any> {
    return this.api.post(API_OT_GROUP_REQUEST.Alias_GetOTGroupRequest, API_OT_GROUP_REQUEST.GetOTGroupRequest,
        {
            Year: this.YearSelection,
            SortBy: this.SortBy,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .pipe(map(result => {
            if (result && !result.Error) {
                const data = result.Data;
                const currentData = data.OTGroupResponse;
                this.listRequest = [... this.listRequest,...currentData.Data] || [];
                const outputParams = currentData.OutputParams || {};
                this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
                this.currentItems += currentData.Data.length;
                const convertedData = this.commonHandler.convertDataLeave(this.listRequest, this.SortBy, this.Lang.COMMON.ListStatus);
                this.OldRequestData= this.listRequest;
                this.RequestData= convertedData;
            }
        }));
  }

  eventSelectedMonth(item) {
    if (item && item[OTGroupConst.KEY.key]) {
      const me = this;
      this.initOption();
      this.YearSelection= item[OTGroupConst.KEY.key];

      me.loadDataRequest().subscribe();
    }
  }
  eventSelectedStatus(item) {
    if (item && item[OTGroupConst.KEY.key]) {
          this.initOption();
          this.SortBy = item[OTGroupConst.KEY.key];
          this.SortByName = item[OTGroupConst.KEY.name];
          this.loadDataRequest().subscribe();
    }
  }


  onClickEmp(item) {
    this.initOption();
    const params = {
      RequestData: item,
      itemFunction:this.functionItem
    };
    this.variablesService.$reloadFunction.next(false);
    this.router.navigate(['/OTGroupRequest/OTGroupRequestDetail'], { state: params});
  }

  onClickAddNew() {
  this.initOption();
  this.variablesService.$reloadFunction.next(false);
  const params = {
    listKow:this.ListKow,
    FunctionList:this.functionItem
  };
  this.router.navigate(['/OTGroupRequest/OTGroupRequestCreate'],{ state: params});
  }


  loadMore(event) {
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.loadDataRequest().subscribe(res => {
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



