/* eslint-disable no-bitwise */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import { BehaviorSubject, Observable } from 'rxjs';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import HrmStorage from '../../../libs/core/HrmStorage';
import HrmStorageConst from '../../../libs/constants/HrmStorageConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { App } from '@capacitor/app';
import { IPConfig } from 'src/IPConfig';

@Component({
  selector: 'app-main-screen',
  templateUrl: './MainApp.component.html',
  styleUrls: ['./MainApp.component.scss'],
})
export class MainAppComponent implements OnInit {
  slideOpts = {
    slidesPerView: 4
  };
  isModalOpen = false;
  pageSize=CommonConst.VALUE.PageSize;
  pageIndex= 0;
  TotalItem= 0;
  current=0;
  listData = [];
  lang = 'vn';
  modalAttachment = false;
  listFunction = [];
  Language: any;
  user = new BehaviorSubject<any>(null);
  appName = '';
  listDefault = [
    {Sorting: 0, FunctionID: 'Mobi.007', Name: ''},
    {Sorting: 1, FunctionID: 'Mobi.012', Name: ''},
    {Sorting: 2, FunctionID: 'Mobi.002', Name: ''},
    {Sorting: 3, FunctionID: 'Mobi.003', Name: ''},
  ];
  constructor(
    private api: ApiHttpService,
    private platform: Platform,
    private router: Router,
    protected auth: AuthStore,
    private activeRoute: ActivatedRoute,
    private notifications: NotificationsService,
    private languageService: LanguageService,
    public translate: TranslateService){
      const browserLang = this.translate.getBrowserLang();
      this.lang = this.auth.getLanguage() || browserLang;
      this.translate.setDefaultLang(this.lang);
      this.auth.SetLanguage(this.lang);
      this.translate.use(this.lang ? this.lang : (browserLang.match(/en|fr/) && browserLang));
  }
  async GetLanguage(){
    this.Language = await this.languageService.getLanguage();
  }
  ngOnInit(): void {
    this.platform.ready().then(() =>{
      this.getConfigApp();
      this.GetLanguage();
      this.user.next(this.auth.get());
      this.getListData().subscribe();
      this.eventShowName();
      this.activeRoute.params.subscribe(val => {
        if(this.auth.get()){
          this.loadFunction();
          this.loadBasicProfile();
        }
      });
    });
  }


  getListData(): Observable<any>{
    const api = HrmAPIConst.NEWS.GetListNews4Apple;
    const take = this.platform.width() > 640 ? 12 : 8;
    const payload = {
      Type: 'events44,news44',
      PageSize: take,
      PageIndex: this.pageIndex,
      SearchText:''
    };
    return this.api.post(api,null,payload).pipe(map(res => {
      if (!res.Error && res.Data) {
        if (res.Data.Data.length > 0) {
          const totalEmps = res.Data.OutputParams.TotalItems ? res.Data.OutputParams.TotalItems : 0;
          this.listData=[...this.listData,...res.Data.Data];
          console.log(this.listData);
          this.TotalItem = totalEmps;
          this.current += res.Data.Data.length;
        }
      }
    }));
  };

  loadMore(event) {
    if (this.current < this.TotalItem) {
      this.pageIndex++;
      this.getListData().subscribe(res => {
        event.target.complete();
      });
    }
    else
    {
      event.target.complete();
    }
  }

  selectedNews(item){
    this.router.navigate([`Main-App-News`],{state:{...item}});
  }

  eventLogin(){
    this.setOpen(false);
    setTimeout(() =>{
    this.router.navigate(['auth/login']);
    },0);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  changeLanguage(lang) {
    this.auth.SetLanguage(lang);
    this.translate.use(lang);
    this.lang = lang;
    this.GetLanguage();
    this.listFunction = [];
    this.loadBasicProfile();
    this.loadFunction();
  }

  loadFunction() {
    this.api.post(HrmAPIConst.HOMEPAGE.FunctionList,null,{ Language: this.auth.getLanguage()})
        .subscribe((res) => {
            // eslint-disable-next-line no-underscore-dangle
            if (res && !res?.Error) {
                const data = res.Data || {};
                const listFunction = data.ListFunction || [];
                const dataDefault = HrmStorage.getData('ListFavorites');
                if(dataDefault && dataDefault.length > 0){
                  this.listDefault = dataDefault;
                }
                const resultListFunction = this.initListFunction(listFunction, 6);
                const newListB = resultListFunction.map(item => {
                  const foundItem = this.listDefault.find(defaultItem => defaultItem.FunctionID === item.id);
                  return { ...item, Sorting: foundItem ? foundItem.Sorting : null };
                }).sort((a,b) => a.Sorting - b.Sorting);
                this.listFunction = newListB;
                if(!dataDefault || dataDefault.length === 0){
                  const ListFavorite = resultListFunction.map((x,i)=> ({
                    Sorting:i,
                    FunctionID:x.id,
                    Name:x.title,
                  }));
                  HrmStorage.setData('ListFavorites',ListFavorite);
                }
            }
        });
  }


  initListFunction(listFunction = [], sliceCount) {
    let tmpList;
    const sliceFunctions = [];
    const lengthList = listFunction && listFunction.length || 0;
    for (let index = 0; index < lengthList; index += sliceCount) {
        tmpList = listFunction.slice(index, index + sliceCount);
        sliceFunctions.push(tmpList);
    }
    const functionList = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < sliceFunctions.length; index++) {
        const groupItem = {
            left: [],
            right: [],
            mid: []
        };
        const itemSliceFunction = sliceFunctions[index];
        let childFunction = {};
        for (let jIndex = 0; jIndex < itemSliceFunction.length; jIndex++) {
            if (itemSliceFunction[jIndex]) {
                childFunction = {
                    [CommonConst.KEY.id]: itemSliceFunction[jIndex][CommonConst.KEY.FunctionID],
                    [CommonConst.KEY.screen]: itemSliceFunction[jIndex][CommonConst.KEY.Url],
                    [CommonConst.KEY.title]: itemSliceFunction[jIndex][CommonConst.KEY.DefaultName],
                    [CommonConst.KEY.icon]: itemSliceFunction[jIndex][CommonConst.KEY.Icon],
                    [CommonConst.KEY.SL]: itemSliceFunction[jIndex][CommonConst.KEY.SL]
                };
                switch (jIndex) {
                }
                functionList.push(childFunction);
            }
        }
    }

      return functionList.filter(x => this.listDefault.some(y => x.id === y.FunctionID));
    }


  eventLogout(){
    this.notifications.alert(
      this.Language.COMMON.Alert,
      this.Language.LOGIN.DoUWantSignOut,
      ()=>this.onLogOut(),[this.Language.COMMON.OK,this.Language.COMMON.Close],['custombtnAlert']);
  }
  onLogOut(){
    this.api.post(HrmAPIConst.HOMEPAGE.Logout).subscribe(() => {
      this.isModalOpen = false;
      HrmStorage.deleteData(HrmStorageConst.FunctionList);
      HrmStorage.deleteData(HrmStorageConst.LoginInfo);
      HrmStorage.deleteData(HrmStorageConst.MessageError);
      HrmStorage.deleteData(HrmStorageConst.VALUE_LIST.LeavePeriod);
      HrmStorage.deleteData(HrmStorageConst.ConfigWithUser);
      HrmStorage.deleteData(HrmStorageConst.BasicProfile);
      HrmStorage.deleteData(CommonConst.SecureStore.UserPassword);
      this.auth.remove();
      this.user.next(null);
      this.listFunction = [];
      //this.router.navigate(['/']);
    });
  }
  onSelectFunction(item){
    if (item.screen) {
        HrmStorage.setData(HrmStorageConst.ItemMyEmployees, null);
        this.notifications.showLoading(null,500);
        this.router.navigate([item.screen],{state:item});
    }
  };
  loadBasicProfile() {
    this.api.post(HrmAPIConst.HOMEPAGE.BasicProfile)
      .subscribe(result =>{
          if (result && !result?.Error) {
              const basicProfile = result?.Data?.DataEmpBasicInfoProfile && result?.Data?.DataEmpBasicInfoProfile[0];
              HrmStorage.setData(HrmStorageConst.BasicProfile,basicProfile);
    }});
  };

  NavigateToHomePage() {
    this.router.navigate(['/home']);
  }

  eventShowName = async () => {
    try{
      this.appName = (await App.getInfo()).name;
    }catch(e) {
    }
  };


  stringToColour = (str: string) =>{
    str = this.convertLastName(str);
    if(!str) {return;}
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  };

  convertLastName(name: string){
    if(!!name){
      return name.split(' ').slice(-1).join(' ');
    }
    return '';
  }


  getConfigApp = async () => {
    this.api.post('HrmMobileApp/ConfigMobile/GetConfigApp').subscribe(res =>{
      if(res && !res.Error){
          HrmStorage.setData('ConfigApp',res.Data);
          this.excuteDataService(res.Data);
      }
    },err => {
    });
  };


  excuteDataService(data){
    let serviceSelected = HrmStorage.getData('serviceApp');
    let linkIPInternal = '';
    try {
      linkIPInternal = atob(data.IPInternal);
    } catch{
      linkIPInternal = data.IPInternal;
    }
    const DataServices = [
      {
        ID:1,
        IPName:'Mặc định',
        IPName2:'Default',
        IPUrl:IPConfig.IP,
        IsDefault:true
      }
    ];
    if(data.IPInternal){
      if(serviceSelected && !serviceSelected.IsDefault && serviceSelected.IPUrl !== linkIPInternal){
        serviceSelected.IPUrl =  linkIPInternal;
        HrmStorage.setData('serviceApp',serviceSelected);
      }
      const mainSite =  {
        ID:2,
        IPName:'Site Chính',
        IPName2:'Main Site',
        IPUrl:linkIPInternal,
        IsDefault:false
      };
      DataServices.push(mainSite);
    }
    else{
      if(serviceSelected && !serviceSelected.IsDefault){
        serviceSelected = DataServices[0];
      }
    }
    if(DataServices.length < 2){
      DataServices[0].IPName = 'Demo';
      DataServices[0].IPName2 = 'Demo';
    }

    if(serviceSelected && serviceSelected.IPUrl){
      if(!serviceSelected.IsDefault){
        IPConfig.IP = serviceSelected.IPUrl;
      }
    }
    else{
      serviceSelected = DataServices?.length > 0 ? DataServices[0] : null;
      if(!serviceSelected.IsDefault){
        IPConfig.IP = serviceSelected.IPUrl;
      }
    }
    HrmStorage.setData('serviceApp',serviceSelected);
  }

}

