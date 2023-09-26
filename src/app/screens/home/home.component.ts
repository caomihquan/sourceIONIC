/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import HomePageConst from 'src/app/shared/constants/HomePageConst.js';
import HrmStorage from '../../../libs/core/HrmStorage';
import HrmStorageConst from '../../../libs/constants/HrmStorageConst';
import { ActivatedRoute, Router } from '@angular/router';
import { IPConfig } from '../../../IPConfig';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { AuthService } from 'projects/hrm-core/src/lib/services/auth/auth.service';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { App } from '@capacitor/app';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[InAppBrowser]
})
export class HomeComponent implements OnInit {
  COMMON;
  isPushPage = true;
  unsubscribe = null;
  itemsFunctionBottom=[];
  Lang;
  flag = 0;
  state = {
    FunctionList: [],
    modalFabIconsVisible: false,
    Items: [],
    basicProfile: {PhotoID:null,FullName:null,JobWName:null},
    isClearAll: false,
    isNoteDetail: false,
    IsVisibleFunctionList: false,
    CurrentCountError: 0,
    CountNofication: 0,
    CompanyKey: '',
    IsModalLoading: false,
    IsHideChangePass: 0,
    SSID: ''
};


// options: InAppBrowserOptions = {
//   location : 'yes',//Or 'no'
//   toolbar:'yes',
//   hidden : 'no', //Or  'yes'
//   zoom : 'no',//Android only ,shows browser zoom controls
//   hardwareback : 'yes',
//   closebuttoncaption : 'Đóng', //iOS only
//   closebuttoncolor:'#FFFFFF',
//   hideurlbar:'yes',//Or 'no',
//   toolbarcolor:'#02a0f2',
//   navigationbuttoncolor: '#02a0f2',
//   fullscreen:'no'
// };
  show = false;
  params: any;
  user: any;
  fab = false;
  constructor(public authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private notifications: NotificationsService,
    private authService: AuthService,
    public CommonHandler: CommonHandlerService,
    private variablesService: VariableCommonService,
    private languageService: LanguageService,
    private activeRoute: ActivatedRoute,
    private iab: InAppBrowser,
  ) {
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
    this.variablesService.$countNotification.subscribe(res =>{
      this.state.CountNofication = res;
    });

    // if(this.platform.is('ios')){
    //   const optionsios: InAppBrowserOptions = {
    //     toolbarposition:'top',
    //     lefttoright:'yes',
    //     hidenavigationbuttons:'yes',
    //     location : 'no'
    //   };
    //   this.options = {...this.options,optionsios};
    // }
  }
  ngOnInit() {
    this.getConfig();
    this.activeRoute.params.subscribe(val => {
      const lang = this.authStore.getLanguage();
      this.changeLanguage(lang);
    });
    //this.getListError();
  }


  getLanguage = async () => {
    this.loadFunction();
    this.loadBasicProfile();
    this.Lang = await this.languageService.getLanguage();
  };
  loadCountFunctionList(listFunction) {
    if (!listFunction || listFunction.length === 0) {return;}
    this.api.post(HrmAPIConst.HOMEPAGE.GetCountFunctionList,'','').subscribe(async (result) => {
            if (!result.Error) {
                const resultCount = result.Data || [];
                listFunction = listFunction.map(item => {
                    const id = (item[CommonConst.KEY.FunctionID] + '').replace('.', '_');
                    const functionID = item[CommonConst.KEY.FunctionID] + '';
                    const processID = HomePageConst.PROCESS_ID[id];
                    const itemCount = resultCount.find(element => element[CommonConst.KEY.ProcessID] === processID
                        || element[CommonConst.KEY.FunctionID] === functionID) || [];
                    item[CommonConst.KEY.SL] = itemCount[CommonConst.KEY.SL];
                    return item;
                });
                const resultListFunction = this.initListFunction(listFunction, 6);
                this.state.Items= resultListFunction[CommonConst.KEY.FunctionGroupList];
                this.state.FunctionList= resultListFunction[CommonConst.KEY.FunctionList];
            }
        });
  }
  onCloseFab(){
    this.fab = false;
    if(!this.fab){
      document.querySelector('ion-fab-button').click();
    }
    this.fab = false;
  }
  onOpenFab(){
    this.fab = !this.fab;
  }
  onOpenSearchFunctionList(){
    this.onCloseFab();
    this.router.navigate(['home/searchfunctions']);

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
    const functionGroupList = [];
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
                    case 0:
                    case 3:
                        groupItem.mid.push(childFunction);
                        break;
                    case 1:
                    case 4:
                        groupItem.left.push(childFunction);
                        break;
                    case 2:
                    case 5:
                        groupItem.right.push(childFunction);
                        break;
                    default:
                        break;
                }
                functionList.push(childFunction);
            }
        }
        if (groupItem.mid.length > 0) {
            functionGroupList.push(groupItem);
        }
    }
    return {
        [CommonConst.KEY.FunctionList]: functionList,
        [CommonConst.KEY.FunctionGroupList]: functionGroupList
    };
  }

  loadListError(currentCountError) {
    // eslint-disable-next-line no-underscore-dangle
        const result = HrmStorage.getData(HrmStorageConst.MessageError);
        if (result) {
            const currentData = result || {};
            const countDataError = result.CountDataError;
            if (currentCountError !== countDataError) {
                this.getListError();
            }
            else {
                this.initHrmi18n(currentData);
            }
        }
        else {
            this.getListError();
        }
  }

  changeLanguage(lang) {
      this.translate.use(lang);
      this.authStore.SetLanguage(lang);
      this.api.post(HrmAPIConst.LOGIN.Alias_ChangeLanguage, HrmAPIConst.LOGIN.ChangeLanguage,{Language: lang}).subscribe(res=>{
        this.getLanguage();
        this.CommonHandler.getLanguage();
      });
  }
  getListError() {
        this.api.post(HrmAPIConst.SYSTEM.Alias_GetDataError, HrmAPIConst.SYSTEM.GetDataError).subscribe((result) => {
          // eslint-disable-next-line no-underscore-dangle
          if (!result.Error && result.Data) {
              const data = result.Data || [];
              const messageError = { CountDataError: 0, VN: {}, EN: {} };
              data.map((item) => {
                  if (item.LanguageCode === CommonConst.VN)
                    {messageError[CommonConst.VN][item.MsgCode] = item.MsgCaption;}
                  if (item.LanguageCode === CommonConst.EN)
                      {messageError[CommonConst.EN][item.MsgCode] = item.MsgCaption;}
              });
              messageError.CountDataError = Object.keys(messageError.VN).length;
              //this.initHrmi18n(messageError);
              HrmStorage.setData(HrmStorageConst.MessageError,messageError[this.authStore.getLanguage().toUpperCase()]);
              //HrmStorage.setData('MSGError',messageError);
          }
      });
  }
  initHrmi18n(data) {
    // if (!data) {return;}
    // const vn = data[CommonConst.VN] || {};
    // const en = data[CommonConst.EN] || {};
    // this.translate.setTranslation('vn',vn);

    // this.translate.getTranslation('vn').subscribe(x=>console.log(x)
    // );
    // const en = data[CommonConst[this.authStore.getLanguage().toLowerCase()]]|| {};
    // this.translate.get('ERROR').subscribe(res => res[en]);
  }
  getConfig(){
    this.api.post(HrmAPIConst.HOMEPAGE.Alias_GetSettingForCustomer, HrmAPIConst.HOMEPAGE.GetSettingForCustomer)
    .subscribe(res => {
        if (res && res.Data && res.Data.length > 0) {
            this.state.IsHideChangePass = res.Data[0].IsHide;
        }

    });
  }
  loadFunction() {
    this.api.post(HrmAPIConst.HOMEPAGE.FunctionList,null,{ Language: this.authStore.getLanguage()})
        .subscribe((res) => {
            // eslint-disable-next-line no-underscore-dangle
            if (res && !res?.Error) {
                const data = res.Data || {};
                const listFunction = data.ListFunction || [];
                const currentCountError = data.CountDataError && data.CountDataError[0] && data.CountDataError[0].Count || 0;
                const resultListFunction = this.initListFunction(listFunction, 6);
                const ConfigWithUser = data.ConfigWithUser ? data.ConfigWithUser[0] : null;
                HrmStorage.setData(HrmStorageConst.ConfigWithUser,listFunction);
                HrmStorage.setData(HrmStorageConst.ConfigWithUser,ConfigWithUser);
                this.state.Items=resultListFunction[CommonConst.KEY.FunctionGroupList];
                this.state.FunctionList=resultListFunction[CommonConst.KEY.FunctionList];
                this.state.CurrentCountError=currentCountError;
                this.getListError();
                this.loadCountFunctionList(listFunction);
            }
            this.state.modalFabIconsVisible = false;
        });
      }
  loadBasicProfile() {
        this.api.post(HrmAPIConst.HOMEPAGE.BasicProfile)
          .subscribe(result =>{
              if (result && !result?.Error) {
                  const basicProfile = result?.Data?.DataEmpBasicInfoProfile && result?.Data?.DataEmpBasicInfoProfile[0];
                  const countNofication = result?.Data?.DataCountNofication && result?.Data?.DataCountNofication[0];
                  HrmStorage.setData(HrmStorageConst.BasicProfile,basicProfile);
                  this.state.basicProfile = basicProfile;
                  this.variablesService.UpdateCountNotification(countNofication.TotalItems);
        }});
  }

    // Function Bottom
  onSelectFunction(item){
    if (item.screen && this.isPushPage) {
        this.notifications.showLoading(null,500);
        this.router.navigate([item.screen],{state:item});
        //this.props.changeFunctionInfo && this.props.changeFunctionInfo(item);
        HrmStorage.setData(HrmStorageConst.ItemMyEmployees, null);
        setTimeout(() => this.isPushPage = true, 1000);
    }
  };
  eventLogOut(){
    this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.LOGIN.DoUWantSignOut,()=>this.onLogOut(),[this.Lang.COMMON.OK,this.Lang.COMMON.Close],['custombtnAlert']);
  }
  onLogOut(){
    this.api.post(HrmAPIConst.HOMEPAGE.Logout).subscribe(() => {
      this.onCloseFab();
      HrmStorage.deleteData(HrmStorageConst.FunctionList);
      HrmStorage.deleteData(HrmStorageConst.LoginInfo);
      HrmStorage.deleteData(HrmStorageConst.MessageError);
      HrmStorage.deleteData(HrmStorageConst.VALUE_LIST.LeavePeriod);
      HrmStorage.deleteData(HrmStorageConst.ConfigWithUser);
      HrmStorage.deleteData(HrmStorageConst.BasicProfile);
      HrmStorage.deleteData(CommonConst.SecureStore.UserPassword);
      this.authService.logout();
    });
  }
  onChangePassword(){
    this.onCloseFab();
    this.router.navigate(['/auth/changepassword']);
  }
  eventClearAllToken = () => {
    this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.COMMON.ClearAllToken,()=>this.ClearAllToken(),[this.Lang.COMMON.OK,this.Lang.COMMON.Close]);
  };
  ClearAllToken(){
    this.api.post(HrmAPIConst.HOMEPAGE.ClearTokenByUser,'','')
    .subscribe((res) => {
        this.onLogOut();
    });
  }
  onclearToken(){
    const token = HrmStorage.getData('TokenFireBase');
    this.api.post(HrmAPIConst.HOMEPAGE.ClearTokenByPhone,'',{ ExpoToken: token})
          .subscribe((res) => {
              this.onLogOut();
          });
  }

  eventClearToken = () => {
    this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.COMMON.ClearToken,()=>this.onclearToken(),[this.Lang.COMMON.OK,this.Lang.COMMON.Close]);

  };

  onClickNotification(){
      this.onCloseFab();
      this.router.navigate([CommonConst.SCENE.ListNotification],{state:{CountNofication:this.state.CountNofication}});
  }

  oneventPushMyProfile(item){
    HrmStorage.setData(HrmStorageConst.ItemMyEmployees, null);
    if(item && item.EmployeeCode){
      this.notifications.showLoading(null,500);
      this.router.navigate([`EmployeeDirectory/${CommonConst.SCENE.MyProfile}/${item.EmployeeCode}`],{state:item});
    }
  }
  eventShowVersion = async () => {
        const appInfo = await App.getInfo();
        const config =  HrmStorage.getData(HrmStorageConst.ConfigWithUser);
        if (config && (config.CheckInOutType === '1' || config.CheckInOutType === '3')) {
            //this.getNetworkInfo();
            this.notifications.alert('','Version: v' + appInfo?.version +' \n URL: ' + IPConfig.IP);
        }
        else {
            this.notifications.alert('','Version: v' + appInfo?.version + ' \n URL: ' + IPConfig.IP);
        }
  };

  eventFaceConfig(){
    this.router.navigate(['/FaceConfig']);
  }
}

