/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import LeaveAndOTConst from '../../shared/constants/LeaveAndOTConst';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import HrmStorageConst from 'src/libs/constants/HrmStorageConst.js';
import HrmStorage from 'src/libs/core/HrmStorage.js';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';


const primaryMoment = moment();
const API_SYSTEM = HrmAPIConst.SYSTEM;
const API_OT_GROUP_REQUEST = HrmAPIConst.OT_GROUP_REQUEST;
const KEY_SCENE = CommonConst.SCENE;
@Component({
  selector: 'app-ot-approve',
  templateUrl: './MyOTGroupApprove.component.html',
  styleUrls: ['./MyOTGroupApprove.component.scss'],
})
export class OTGroupApproveComponent implements OnInit {
  user: any;
  itemFunction: any;
  OrderByItems = [
    { key: LeaveAndOTConst.KEY.BegDate, name: LeaveAndOTConst.KEY.Month },
    { key: LeaveAndOTConst.KEY.Status, name: LeaveAndOTConst.KEY.Status },
    { key: LeaveAndOTConst.KEY.KowName, name: LeaveAndOTConst.KEY.Type }
  ];
  OldRequestData: any;
  RequestData = [];
  SortBy=LeaveAndOTConst.KEY.Status;
  Lang;
  CommonConst=CommonConst;
  SortByName: any;
  IsVisibleOrderBy: any;
  IsModalLoading: any;
  Options: any;
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
  }

  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation().extras.state;
    this.getLanguage();

  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.loadValueList();
    this.activeRoute.params.subscribe(res =>{
      this.loadDataRequest().subscribe();
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
  loadDataRequest(): Observable<any>{
    return this.api.post(API_OT_GROUP_REQUEST.Alias_GetOTGroupApprove, API_OT_GROUP_REQUEST.GetOTGroupApprove,
        {
            Year: this.YearSelection,
            Status: this.StatusSelection,
            SortBy: this.SortBy,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        })
        .pipe(map(result => {
            if (result && !result.Error) {
                // const data = result.Data;
                // const remainLeaveNumber = data[LeaveAndOTConst.RemainLeaveNumber] && data[LeaveAndOTConst.RemainLeaveNumber][0] || {};
                const currentData = result.Data || {};
                this.listRequest = [...this.listRequest,...currentData.Data] || [];
                this. currentItems += currentData.Data.length;

                const outputParams = currentData.OutputParams || {};
                const totalPages = outputParams[CommonConst.KEY.TotalPages];
                this.TotalPages = totalPages;
                this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
                const convertedData = this.CommonHandler.convertDataLeave(this.listRequest ,this.SortBy, this.Lang.COMMON.ListStatus);
                this.OldRequestData = this.listRequest ;
                this.RequestData =convertedData;
          };
        }));
  }
  eventOnSelectedOrderBy(item) {
    if (item && item[LeaveAndOTConst.KEY.key]) {
            this.initOption();
            this.SortBy= item[LeaveAndOTConst.KEY.key];
            this.SortByName= item[LeaveAndOTConst.KEY.name];
            this.loadDataRequest().subscribe();
    }
  }
  eventOnSelectedYear(item) {
    if (item && item[LeaveAndOTConst.KEY.key]) {
            this.initOption();
            this.YearSelection= item[LeaveAndOTConst.KEY.key];
            this.loadDataRequest().subscribe();
    }
  }
  loadValueList = () => {
    const listLStatus = HrmStorage.getData(HrmStorageConst.VALUE_LIST.LStatus);

    if (listLStatus && listLStatus.length > 0) {
        const selected = listLStatus[0] && listLStatus[0][LeaveAndOTConst.KEY.Value] || '';
        const caption = listLStatus[0] && listLStatus[0][LeaveAndOTConst.KEY.Caption] || '';
            this.StatusItems= listLStatus;
            this.StatusSelection= selected;
            this.StatusSelectionName= caption;
    }
    else {
        this.api.post(API_SYSTEM.Alias_GetValueList, API_SYSTEM.GetValueList,
            { Names: [CommonConst.VALUE_LIST.LStatus] })
            .subscribe(result => {
                if (result && !result.Error) {
                    const listStatus = result.Data && result.Data[CommonConst.VALUE_LIST.LStatus] || [];
                    const data = listStatus[CommonConst.VALUE_LIST.items] || [];
                    const selected = data[0] && data[0][LeaveAndOTConst.KEY.Value] || '';
                    const caption = data[0] && data[0][LeaveAndOTConst.KEY.Caption] || '';
                    HrmStorage.setData(HrmStorageConst.VALUE_LIST.LStatus, data);
                    this.StatusItems= data;
                    this.StatusSelection= selected;
                    this.StatusSelectionName= caption;
                }
            });
    }
  };

  eventOnSelectedStatus(item) {
    if (item && item[LeaveAndOTConst.KEY.Value]) {
            this.initOption();
            this.StatusSelection = item[LeaveAndOTConst.KEY.Value];
            this.StatusSelectionName = item[LeaveAndOTConst.KEY.Caption];
            this.loadDataRequest().subscribe();
    }
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

  eventOnDetailRequest = (item) =>{
    this.initOption();
    const params = {
        LeaveApproveData: item,
        itemFunction:this.itemFunction
    };
    this.router.navigate([`OTGroupApprove/${CommonConst.SCENE.DetailOTGroupApprove}`],{ state: {...params} });
  };
}

