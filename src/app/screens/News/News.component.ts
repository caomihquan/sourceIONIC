/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { Router } from '@angular/router';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { IPConfig } from 'src/IPConfig';
@Component({
  selector: 'app-news',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.scss'],
})
export class NewsComponent implements OnInit {
  user: any;
  COMMON: any;

  listTabs= [];
  listData= [];
  oDatas=[];
  tabName= '';
  defaultName= '';
  pageSize=CommonConst.VALUE.PageSize;
  pageIndex= 0;
  searchText='';
  TotalPage= 0;
  itemFunction;
  page = 'News';
  TotalEmps;
  current=0;
  payload: any;
  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    public CommonHandler: CommonHandlerService,){
    //
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation().extras.state;
    this.page = this.itemFunction.screen || this.itemFunction.Url;


    this.translate.get('COMMON').subscribe(res => this.COMMON = res);
    this.getListTabs();
  }

  getType(tabName) {
    let type = '';
    switch (tabName) {
        case 'SEENEWS_TTC':
            type = CommonConst.TAB[this.page].TTC;
            break;
        case 'SEENEWS_TD':
            type = CommonConst.TAB[this.page].NNNC;
            break;
        case 'SEENEWS_HN':
            type = CommonConst.TAB[this.page].NVHN;
            break;
        case 'SEENEWS_NS':
            type = CommonConst.TAB[this.page].QTNS;
            break;
        case 'SEENEWS_DG':
            type = CommonConst.TAB[this.page].DGNV;
            break;
        case 'SEENEWS_DT':
            type = CommonConst.TAB[this.page].DTTT;
            break;
    }
    return type;
  }

  getListTabs = async () => {
    const apiConfig = IPConfig.IP;
    if (apiConfig && typeof apiConfig === 'string') {
      this.api.post(HrmAPIConst.NEWS.GetListTabs)
      .subscribe((res) => {
        if (res.Data && res.Data.length > 0) {
            this.listTabs= res.Data;
            this.tabName= res.Data[0].FunctionID;
            this.defaultName= res.Data[0].DefaultName;
            this.setType();
        }
      });
    }
  };

  setType() {
    const type = this.getType(this.tabName);
    console.log(type);
    this.getListData(type).subscribe();
  }

  getListData(type): Observable<any>{
    let api = HrmAPIConst.NEWS.GetListNews;
    const apiConfig = IPConfig.IP;
    if (!apiConfig) {
      api = HrmAPIConst.NEWS.GetListNews4Apple;
      const currFunction = this.itemFunction || {};
      type = currFunction[CommonConst.KEY.id];
    }
    this.payload = {
      Type: type,
      PageSize: this.pageSize,
      PageIndex: this.pageIndex,
      SearchText: this.searchText
    };
    return this.api.post(api,null,this.payload).pipe(map(res => {
      if (!res.Error && res.Data) {
        if (res.Data.Data.length > 0) {
          const totalEmps = res.Data.OutputParams.TotalItems ? res.Data.OutputParams.TotalItems : 0;
          this.listData=[...this.listData,...res.Data.Data];
          this.oDatas=[...this.listData];
          this.TotalEmps = totalEmps;
          this.current += res.Data.Data.length;
        }
      }
      return res;
    }));
  };

  loadMore(event) {
    const me =this;
    const type = this.getType(this.tabName);
    if (this.current < this.TotalEmps) {
      this.pageIndex++;
      this.payload = {
        Type:type,
        PageIndex: me.pageIndex,
        PageSize: me.pageSize,
        SearchText: me.searchText,
        };
      this.getListData(type).subscribe(res => {
        event.target.complete();
      });
    } else
      {        event.target.complete();
      }
  }

  eventSelectTab = (tab, name) => () => {
    if (this.tabName === tab) {return;}
    const me = this;
      me.tabName= tab;
      me.defaultName= name;
      me.listData= [];
      me.pageIndex= CommonConst.VALUE.PageIndex;
      me.searchText= '';
      me.setType();
  };

  searchChange(){
    const arraySearch =['Title'];
    this.listData = [];

    if (!this.searchText) {
      this.listData = this.oDatas;
    }
    else{
      const data = JSON.parse(JSON.stringify(this.oDatas));
      const dataFilters = [];
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < arraySearch.length; j++) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < data.length; i++) {
              if (data[i][arraySearch[j]] &&
                data[i][arraySearch[j]].toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 &&
                 dataFilters.indexOf(data[i]) === -1) {
                  dataFilters.push(data[i]);
              }
          }
      }
      this.listData = dataFilters;
    }
  }

  selectedNews(item){
    this.router.navigate([`${this.page}/NewsDetail/${item.RecID}`],{state:{...item,...this.listTabs[0],page:this.page}});
  }

}

