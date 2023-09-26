/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import MissingInOutConst from '../../shared/constants/MissingInOutConst';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import HrmStorageConst from 'src/libs/constants/HrmStorageConst.js';
import HrmStorage from 'src/libs/core/HrmStorage.js';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_SYSTEM = HrmAPIConst.SYSTEM;
const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;
const API_LATEEARLY = HrmAPIConst.LATEEARLY;
const KEY_SCENE = CommonConst.SCENE;
const ThisYear = new Date().getFullYear();
const ThisMonth= new Date().getMonth();
@Component({
  selector: 'app-lateeearly-approve',
  templateUrl: './MyLateEarlyApprove.component.html',
  styleUrls: ['./MyLateEarlyApprove.component.scss'],
})
export class MyLateEarlyApproveComponent implements OnInit {
  user: any;
  itemFunction: any;
  CurrentMonth = (ThisYear).toString() + '/' + ((ThisMonth+ 1) < 10 ? '0' + (ThisMonth + 1).toString() : (ThisMonth + 1).toString());
  DowCodeSelection = {}; //{ DowCode: (new Date()).getFullYear().toString() + "/01"  };
  //StatusSelection = { key: 'Status', name: 'Status' };
  OrderByItems = [
    { key: MissingInOutConst.KEY.BegDate, name: MissingInOutConst.KEY.Day },
    { key: MissingInOutConst.KEY.Status, name: MissingInOutConst.KEY.Status }
  ];
  lstDows = [];
  SetupProcess ={};
  OldRequestData: any;
  RequestData = [];
  SortBy=MissingInOutConst.KEY.Status;
  Lang;
  CommonConst=CommonConst;
  SortByName: any;
  IsVisibleOrderBy: any;
  IsModalLoading: any;
  Options: any;
  OnScrolling = false;
  IsFull = false;
  RemainLeaveNumber: any;
  YearSelection = moment().year();
  StatusSelection = 0;
  StatusItems;
  StatusSelectionName;
  YearItems= this.CommonHandler.getYears();
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  TotalPages = 0;
  TotalItems = 0;
  currentItems = 0;
  listRequest = [];
  BegDate= null;
  EndDate= null;
  IsFirstLoad = true;
  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public CommonHandler: CommonHandlerService,private languageService: LanguageService){
    //
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
    this.Lang = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.IsFirstLoad = true;
    this.itemFunction = this.router.getCurrentNavigation().extras.state;
    this.getLanguage();

  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.loadValueList();
    this.getDowCode();
    this.activeRoute.params.subscribe(r =>{
      this.loadDataRequest();
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
  getDowCode() {
    const me = this;
    this.api.post(API_MISSINGINOUT.Alias_GetPayrollDow, API_MISSINGINOUT.GetPayrollDow,
      {
        ProcessID: 6
      }).subscribe(res => {
        if (!res.IsError) {
          const data = res.Data || {};
          const payrollDow = data.PayrollDow || [];
          const setupProcess = data.SetupProcess && data.SetupProcess[0] || {};

          const element = {
            DowCodeSelection: null,
            BegDate: null,
            EndDate: null,
            DowCode : null
          };
          if (payrollDow.length > 0) {
              const filter = payrollDow.filter(item=>item[MissingInOutConst.KEY.DowCode] == me.CurrentMonth);
              const datapayrollDow = filter.length > 0 ? filter[0] : payrollDow[0];

              element['DowCodeSelection'] = datapayrollDow.DowCode;
              element['BegDate'] = datapayrollDow.BegDay;
              element['EndDate'] = datapayrollDow.EndDay;
              element['DowCode']= element['DowCodeSelection'];
          }
          this.DowCodeSelection =element;
          this.BegDate=element['BegDate'];
          this.EndDate= element['EndDate'];
          this.SetupProcess= setupProcess;
          this.lstDows= payrollDow;
          this.loadDataRequest();
      }

    });
  }

  loadDataRequest(){
    this.api.post(API_LATEEARLY.Alias_GetLateEarlyApprove, API_LATEEARLY.GetLateEarlyApprove,
        {
          BegDate: this.BegDate || "",
          EndDate: this.EndDate || "",
          Status: this.StatusSelection,
          SortBy: this.SortBy,
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
        }).subscribe(result =>{
          if (!result.Error)
          {
            const currentData =  result.Data || [];
            this.listRequest = currentData.Data || [];
            this. currentItems += currentData.Data.length;
            const outputParams = currentData.OutputParams || {};
            const totalPages = outputParams[CommonConst.KEY.TotalPages];
            this.TotalPages = totalPages;
            this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
            const convertedData = this.CommonHandler.convertDataLeave(this.listRequest ,this.SortBy, this.Lang.COMMON.ListStatus);
            this.OldRequestData = this.listRequest ;
             // bổ sung màu sắc cho các phiều
            if (convertedData) {
              for (let i = 0; i < convertedData.length; i++) {
                for (let j = 0; j < convertedData[i].Data.length; j++) {
                  if (convertedData[i].Data[j].Status == 1) // chờ duyệt
                  {
                    convertedData[i].Data[j].BackGroundColor = "#0088CF"
                  }
                  else if (convertedData[i].Data[j].Status == 2) // đã duyệt
                  {
                    convertedData[i].Data[j].BackGroundColor = "#7DBC42"
                  }
                  else if (convertedData[i].Data[j].Status == 3) // ko duyệt
                  {
                    convertedData[i].Data[j].BackGroundColor = "#FF3939"
                  }
                  else if (convertedData[i].Data[j].Status == 5) // xin hủy
                  {
                    convertedData[i].Data[j].BackGroundColor = "#FEA747"
                  }
                  else if (convertedData[i].Data[j].Status == 6) // đã hủy
                  {
                    convertedData[i].Data[j].BackGroundColor = "#F3721C"
                  }
                  else {
                    convertedData[i].Data[j].BackGroundColor = "#DFDFDF"
                  }
                }
              }
            }
            this.RequestData =convertedData;
            this.IsFirstLoad = false;
          };
        });
  }
  eventOnSelectedOrderBy(item) {
    this.IsFirstLoad = true;
    if (item && item[MissingInOutConst.KEY.key]) {
            this.initOption();
            this.SortBy= item[MissingInOutConst.KEY.key];
            this.SortByName= item[MissingInOutConst.KEY.name];
            this.loadDataRequest();
    }
  }
  eventSelectedMonth(item) {
    this.IsFirstLoad = true;
    this.DowCodeSelection = item;
    this.BegDate=item[MissingInOutConst.KEY.BegDay];
    this.EndDate=item[MissingInOutConst.KEY.EndDay];
    this.loadDataRequest();
  }
  loadValueList = () => {
    const listLStatus = HrmStorage.getData(HrmStorageConst.VALUE_LIST.LStatus);
    if (listLStatus && listLStatus.length > 0) {
        const selected = listLStatus[0] && listLStatus[0][MissingInOutConst.KEY.Value] || '';
        const caption = listLStatus[0] && listLStatus[0][MissingInOutConst.KEY.Caption] || '';
            this.StatusItems= listLStatus;
            this.StatusSelection= selected;
            this.StatusSelectionName= caption;
    } else {
        this.api.post(HrmAPIConst.SYSTEM.Alias_GetValueList,HrmAPIConst.SYSTEM.GetValueList,
            { Names: [CommonConst.VALUE_LIST.LStatus] })
            .subscribe(result => {
                if (!result.Error) {
                    const listStatus = result.Data && result.Data[CommonConst.VALUE_LIST.LStatus] || [];
                    const data = listStatus[CommonConst.VALUE_LIST.items] || [];
                    const selected = data[0] && data[0][MissingInOutConst.KEY.Value] || '';
                    const caption = data[0] && data[0][MissingInOutConst.KEY.Caption] || '';
                    HrmStorage.setData(HrmStorageConst.VALUE_LIST.LStatus, data);
                    this.StatusItems= data;
                    this.StatusSelection= selected;
                    this.StatusSelectionName= caption;
                }
            });
    }
  };

  eventOnSelectedStatus(item) {
    this.IsFirstLoad = true;

    if (item && item[MissingInOutConst.KEY.Value]) {
            this.initOption();
            this.StatusSelection = item[MissingInOutConst.KEY.Value];
            this.StatusSelectionName = item[MissingInOutConst.KEY.Caption];
            this.loadDataRequest();
    }
  }
  loadMore(event){
    // this.IsFirstLoad == false;

    // if (this.currentItems < this.TotalItems) {
    //   this.PageIndex++;
    //   this.loadDataRequest();
    // }
    // else{
    //   event.target.complete();
    // }
    event.target.complete();
  }

  onClickEmp = (item) =>{
    this.initOption();
    const params = {
        LeaveApproveData: item,
        itemFunction:this.itemFunction
    };
    this.router.navigate(['/LateEarlyApprove/DetailLateEarlyApprove'],{ state: {...params} });
  };
}

