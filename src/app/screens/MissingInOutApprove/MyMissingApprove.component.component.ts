/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import LeaveAndOTConst from '../../shared/constants/LeaveAndOTConst';
import MissingInOutConst from '../../shared/constants/MissingInOutConst';
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
const API_MISSINGINOUT = HrmAPIConst.MISSINGINOUT;
const KEY_SCENE = CommonConst.SCENE;
@Component({
  selector: 'app-missing-approve',
  templateUrl: './MyMissingApprove.component.html',
  styleUrls: ['./MyMissingApprove.component.scss'],
})
export class MissingApproveComponent implements OnInit {
  user: any;
  itemFunction: any;
  OrderByItems = [
    { key: MissingInOutConst.KEY.BegDate, name: MissingInOutConst.KEY.Day },
    { key: MissingInOutConst.KEY.Status, name: MissingInOutConst.KEY.Status },
  ];
  OldRequestData: any;
  RequestData = [];
  SortBy=LeaveAndOTConst.KEY.Status;
  Lang;
  CurrentMonth = moment().format('YYYY') + '/' + moment().format('MM');
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


  DowCodeSelection;
  BegDay;
  EndDay;
  SetupProcess;
  lstDows = [];
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
    this.getDowCode(() =>{
      this.activeRoute.params.subscribe(res =>{
        this.loadDataRequest().subscribe();
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

  getDowCode(callback) {
    this.api.post(API_MISSINGINOUT.Alias_GetPayrollDow, API_MISSINGINOUT.GetPayrollDow,
        {
            ProcessID: 14
        })
        .subscribe((res) => {
            if (res && !res.IsError) {
                const data = res.Data || {};
                const payrollDow = data.PayrollDow || [];
                const setupProcess = data.SetupProcess && data.SetupProcess[0] || {};
                if (payrollDow.length > 0) {
                    const filter = payrollDow.filter(x => x[MissingInOutConst.KEY.DowCode] === this.CurrentMonth);
                    const dataA = filter.length > 0 ? filter[0] : payrollDow[0];
                    this.DowCodeSelection= dataA[MissingInOutConst.KEY.DowCode];
                    this.BegDay= dataA[MissingInOutConst.KEY.BegDay];
                    this.EndDay= dataA[MissingInOutConst.KEY.EndDay];
                    this.SetupProcess= setupProcess;
                    this.lstDows= payrollDow;
                }
            }
            if (callback)
                {callback();}
        });
  }

  loadDataRequest(): Observable<any>{
    return this.api.post(API_MISSINGINOUT.Alias_GetMissingInOutApprove, API_MISSINGINOUT.GetMissingInOutApprove,
        {
            Status: this.StatusSelection,
            SortBy: this.SortBy,
            BegDate: this.BegDay || '',
            EndDate: this.EndDay || '',
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

  eventOnSelectedDowCode(item) {
    if (item && item[MissingInOutConst.KEY.DowCode]) {
        this.initOption();
        this.DowCodeSelection = item[MissingInOutConst.KEY.DowCode];
        this.BegDay = item[MissingInOutConst.KEY.BegDay];
        this.EndDay = item[MissingInOutConst.KEY.EndDay];
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
        this.api.post(HrmAPIConst.SYSTEM.Alias_GetValueList,HrmAPIConst.SYSTEM.GetValueList,
            { Names: [CommonConst.VALUE_LIST.LStatus] })
            .subscribe(result => {
                if (!result.Error) {
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
    this.router.navigate([`MissingInOutApprove/${KEY_SCENE.MissingApproveDetail}`],{ state: {...params} });
  };
}

