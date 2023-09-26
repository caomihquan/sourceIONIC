/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService, } from '@ngx-translate/core';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import BusinessTripConst from '../../shared/constants/BusinessTripConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import * as moment from 'moment';
@Component({
  selector: 'app-my-businesstriprequest',
  templateUrl: './MyBusinessTripRequest.component.html',
  styleUrls: ['./MyBusinessTripRequest.component.scss'],
})
export class MyBusinessTripRequestComponent implements OnInit {
  currentItems = 0;
  TotalItems = 0;
  lstDows = this.commonHandler.getYearsOfDow();
  lstStatus = [
    { key: 'BegDate', name: 'Month' },
    { key: 'Status', name: 'Status' },
    { key: 'KowName', name: 'Type' }
  ];
  OrderByItems = [
    { key: BusinessTripConst.KEY.BegDate, name: BusinessTripConst.KEY.Month },
    { key: BusinessTripConst.KEY.Status, name: BusinessTripConst.KEY.Status },
    { key: BusinessTripConst.KEY.KowName, name: BusinessTripConst.KEY.Type }
  ];
  Lang: any;
  user: any;
  visibleModal = false;
  PageIndex = 0;

  PageSize = CommonConst.VALUE.PageSize;
  RequestData;
  OldRequestData: any[];
  YearSelection = moment().year();
  SortBy = BusinessTripConst.KEY.Status;
  SortByName = BusinessTripConst.KEY.Status;
  YearItems = this.commonHandler.getYears();
  listRequest = [];
  itemFunction;
  CommonConst=CommonConst;

  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private variablesService: VariableCommonService,
    private auth: AuthStore, private languageService: LanguageService, public commonHandler: CommonHandlerService) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }

  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation().extras.state;
    this.getLanguage();
    this.commonHandler.dragElement('dragable');

  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.loadDataRequest().subscribe();
    this.variablesService.$reloadFunction.next(false);

    this.variablesService.$reloadFunction.subscribe(res => {
      if(res){
        this.loadDataRequest().subscribe();
      }
    });
  };
  eventOnSelectedYear(item) {
    if (item && item[BusinessTripConst.KEY.key]) {
        this.YearSelection = item[BusinessTripConst.KEY.key];
        this.initOption();
        this.loadDataRequest().subscribe();
    }
  }
  eventOnSelectedOrderBy(item) {
    if (item && item[BusinessTripConst.KEY.key]) {
      this.initOption();
      this.SortBy = item[BusinessTripConst.KEY.key];
      this.SortByName = item[BusinessTripConst.KEY.name];
      this.loadDataRequest().subscribe();
    }
  }

  initOption() {
    this.PageIndex = 0;
    this.PageSize =  CommonConst.VALUE.PageSize;
    this.TotalItems = 0;
    this.currentItems = 0;
    this.OldRequestData= [];
    this.listRequest =[];
  }
  onClickEmp(evt) {
    this.initOption();
    this.variablesService.$reloadFunction.next(false);
    this.router.navigate(['BusinessTripRequest/BusinessTripRequestDetail'], { state: { RequestData: evt,itemFunction:this.itemFunction } });
  }
  eventOnCreateRequest(){
    this.initOption();
    this.variablesService.$reloadFunction.next(false);
    this.router.navigate(['/BusinessTripRequest/BusinessTripRequestCreate'], { state:
       {...this.itemFunction} });
  }

  loadDataRequest(): Observable<any> {
    return this.api.post(HrmAPIConst.BUSINESS_TRIP.Alias_GetBusinessTripRequest, HrmAPIConst.BUSINESS_TRIP.GetBusinessTripRequest,
      {
        Year: this.YearSelection,
        SortBy: this.SortBy,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      })
      .pipe(map(result => {
          if (result && !result?.Error) {
            const currentData = result.Data || {};
            this.listRequest = [... this.listRequest,...currentData.Data] || [];
            const outputParams = currentData.OutputParams || {};
            this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
            this.currentItems += currentData.Data.length;
            this.OldRequestData = this.listRequest;
            const convertedData = this.commonHandler.convertDataLeave(this.listRequest, this.SortBy,this.Lang.COMMON.ListStatus);
            this.RequestData = convertedData;
          }
      }));
  }

  loadMore(event){
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.loadDataRequest().subscribe(res => {
        event.target.complete();
      });
    }
    else{

      event.target.complete();
    }

  }
}



