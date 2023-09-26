/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService, } from '@ngx-translate/core';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import MissingInOutConst from '../../shared/constants/MissingInOutConst';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;

@Component({
  selector: 'app-missinginoutrequest',
  templateUrl: './MissingInOutRequest.component.html',
  styleUrls: ['./MissingInOutRequest.component.scss'],
})
export class MissingInOutRequestComponent implements OnInit {
  // eslint-disable-next-line max-len
  CurrentMonth = (new Date().getFullYear()).toString() + '/' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString());
  DowCodeSelection; //{ DowCode: (new Date()).getFullYear().toString() + "/01"  };
  StatusSelection = { key: 'Status', name: 'Status' };

  lstDows = this.commonHandler.getYearsOfDow();
  lstStatus = [
    { key: 'BegDate', name: 'Day' },
    { key: 'Status', name: 'Status' },
  ];

  Lang: any;
  user: any;
  _isMountedRequestData = false;
  dataHistory: any[];
  checkInOutHistory: any;
  visibleModal = false;

  RequestData: any[];
  OldRequestData: any[];
  RemainLeaveNumber = {};
  modelConfigTSEmp = {};
  ListOfHistRequest: [];
  RemainExtraDayOffNumber = {};
  IsVisibleOrderBy = false;
  IsVisibleYear = false;
  IsModalLoading = false;
  YearSelection = (new Date()).getFullYear();
  SortBy = this.StatusSelection.key;
  SortByName = this.StatusSelection.name;
  OrderByItems = [
    { key: MissingInOutConst.KEY.BegDate, name: MissingInOutConst.KEY.Day },
    { key: MissingInOutConst.KEY.Status, name: MissingInOutConst.KEY.Status },
  ];
  FunctionInfo;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  TotalPages = 0;
  TotalItems = 0;
  currentItems = 0;
  listRequest = [];
  IsLoadFinish = false;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthStore, private languageService: LanguageService, public commonHandler: CommonHandlerService) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }


  ngOnInit() {
    this.getLanguage();
    this.commonHandler.dragElement('dragable');
    this.FunctionInfo = this.router.getCurrentNavigation()?.extras?.state;


  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.getDowCode(() =>{
      this.activeRoute.params.subscribe(res =>{
        this.loadDataRequest();
      });
    });
  };
  initOption() {
    this.PageIndex = 0;
    this.PageSize =  CommonConst.VALUE.PageSize;
    this.TotalPages = 0;
    this.TotalItems = 0;
    this.currentItems = 0;
    this.OldRequestData= [];
    this.RequestData= [];
    this.listRequest =[];
  }


  eventOnSelectedOrderBy(item) {
    if (item && item[MissingInOutConst.KEY.key]) {
            this.initOption();
            this.SortBy= item[MissingInOutConst.KEY.key];
            this.SortByName= item[MissingInOutConst.KEY.name];
            this.loadDataRequest();
    }
  }

  eventOnSelectedDowCode(item) {
    if (item && item[MissingInOutConst.KEY.DowCode]) {
        this.initOption();
        this.DowCodeSelection = item[MissingInOutConst.KEY.DowCode];
        this.loadDataRequest();
    }
  }


  getDowCode(callback) {
    const me = this;
    this.api.post(API_MISSINGINOUT.Alias_GetPayrollDow, API_MISSINGINOUT.GetPayrollDow,
      {
        ProcessID: 14
      }).subscribe(res => {
        if (res && !res.IsError) {
          const data = res.Data || {};
          const payrollDow = data.PayrollDow || [];


          if (payrollDow.length > 0) {
              // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
              const filter = payrollDow.filter(function(item) {
                return item[MissingInOutConst.KEY.DowCode] === me.CurrentMonth;
              });
              const dataA = filter.length > 0 ? filter[0] : payrollDow[0];
              this.DowCodeSelection = dataA[MissingInOutConst.KEY.DowCode];;
              this.lstDows= payrollDow;
          }
          callback();
      }

    });
  }



  initReOption() {
    return {
      PageIndex: 0,
      PageSize: 10,
      TotalPages: 0,
      IsFull: false,
      OnScrolling: false,
    };
  }
  onClickEmp(evt) {
    this.router.navigate(['/MissingInOutRequest/MissingInOutRequestDetail'], { state: { RequestData: evt,itemFunction:this.FunctionInfo } });
  }
  doAddNewRequest(){
    this.router.navigate(['/MissingInOutRequest/MissingInOutRequestCreate'], { state:
       { RequestData: {},
          ListOfHistRequest: this.ListOfHistRequest,
          RemainLeaveNumber: this.RemainLeaveNumber ? this.RemainLeaveNumber : {},
          modelConfigTSEmp: this.modelConfigTSEmp ? this.modelConfigTSEmp : {},
          itemFunction:this.FunctionInfo
      } });
  }
  loadMore(event) {
    // if (this.currentItems < this.TotalItems) {
    //   this.loadDataRequest().subscribe(()=>{event.target.complete();});
    // } else
    // {
    //   event.target.complete();
    // }
    event.target.complete();
  }
   loadDataRequest() {
    this.api.post(API_MISSINGINOUT.Alias_GetMissingInOutRequest, API_MISSINGINOUT.GetMissingInOutRequest,
      {
        DowCode: this.DowCodeSelection,
        SortBy: this.SortBy,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      })
      .subscribe(result => {
        if (result && !result.Error) {
          const data = result.Data;
          const currentData = data || [];
          const outputParams = currentData.OutputParams || {};
          this.listRequest =currentData.Data|| [];
          this. currentItems += currentData.Data.length;
          this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
          const convertedData = this.commonHandler.convertDataLeave(this.listRequest ,this.SortBy, this.Lang.COMMON.ListStatus);
          this.OldRequestData =  this.listRequest;
          this.RequestData = convertedData;
        }
      });
  }

}



