/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import  LeaveAndOTConst from 'src/app/shared/constants/LeaveAndOTConst.js';
import HrmStorage from '../../../libs/core/HrmStorage';
import HrmStorageConst from '../../../libs/constants/HrmStorageConst';
import  ReportConst from 'src/app/shared/constants/ReportConst.js';
import { Router } from '@angular/router';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Camera} from '@capacitor/camera';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { HrmTreeviewComponent } from 'projects/hrm-core/src/lib/controls/treeview/treeview.component';
@Component({
  selector: 'app-home',
  templateUrl: './Manager.component.html',
  styleUrls: ['./Manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  @ViewChild('treePostNew') treePostNew: HrmTreeviewComponent;
  user: any;
  hasCameraPermission = false;
  TotalEmps = 0;
  ListEmpDirectories =[];
  current=0;
  Lang;
  ListDepartment = [];
  searchText = '';
  PageIndex= 0;
  PageSize= CommonConst.VALUE.PageSize;
  DepartmentCode='';
  isQRCodeVisible = false;
  ListType;
  TypeSelected;
  IsVisibleDepartment= false;
  tabName = CommonConst.TAB.Employee;
  DepartmentCodePostNew;
  DepartmentNamePostNew;
  IsVisibleDepartmentPostNew = false;
  txtSubject = '';
  txtContent = '';
  IsActiveSubmitButton = true;
  //
  segment = 1;
  payload: any;
  page = 0;
  scannedData: any;
  itemFunction: any;

  state = {
    TeamManager: [],
    TeamSubManager: [],
    onScrolling: false,
    isFull: false,
    isLoading: false,
    isScrollLoading: false,

    QRCode: null,
  };
  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private notifications: NotificationsService,
    public CommonHandler: CommonHandlerService,
    private languageService: LanguageService,
    private barcodeScanner: BarcodeScanner){
    //
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() {

    this.itemFunction = this.router.getCurrentNavigation().extras.state;

    //this.translate.get('COMMON').subscribe(res => this.COMMON = res);
    //this.getPermissionsAsync();
    //this.getListEmpDirectory().subscribe();
    // this.loadConfig();
    // this.loadDept();
    this.getLanguage();
  }

  ClearTree(){
    this.treePostNew.clear();
    this.DepartmentCodePostNew =  null;
    this.DepartmentNamePostNew =  null;
  }

  getPermissionsAsync = async () => {
    const { camera } = await Camera.checkPermissions();
    this.hasCameraPermission =  camera === 'granted' ? true : false;
  };
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.getListEmpDirectory().subscribe();
    this.loadConfig();
    this.initFunctionListType();
  };

  handlerSearch() {
    this.ListEmpDirectories = [];
    this.PageIndex = 0;
    this.TotalEmps = 0;
    this.isQRCodeVisible = false;
    this.getListEmpDirectory().subscribe();
  }

  getListEmpDirectory(): Observable<any>{
        return this.api.post(HrmAPIConst.EMPLOYEE.Alias_GetEmpDirectoryForManager, HrmAPIConst.EMPLOYEE.GetEmpDirectoryForManager,
            {
                PageIndex: this.PageIndex,
                PageSize: this.PageSize,
                SearchText: this.searchText,
                DepartmentCode: this.DepartmentCode
            }).pipe(map(response => {
                if (!response.IsError && response.Data) {
                    const res = response.Data;
                    const totalEmps = res && res.length > 0 && res[0].TotalEmps ? res[0].TotalEmps : 0;
                    this.TotalEmps = totalEmps;
                    this.current += res.length;
                    const _findGroup = function(data, name) {
                      for (let i = 0; i < data.length; i++) {
                          const item = data[i];
                          if (item[LeaveAndOTConst.KEY.GroupName] === name) {
                              return item;
                          }
                      }
                      return null;
                    };

                    const listEmp = this.ListEmpDirectories;
                    const keyGroup = this.tabName === CommonConst.TAB.Employee ?
                                                        LeaveAndOTConst.KEY.GroupName :
                                                        LeaveAndOTConst.KEY.DepartmentName;
                    const list = listEmp && listEmp.length > 0 ? listEmp : [];

                    for (let i = 0; i < res.length; i++) {
                        const item = res[i];
                        if (item[keyGroup]) {
                            const groupName = (item[keyGroup] + '').toLocaleUpperCase();
                            if (list.length === 0) {
                                list.push({
                                    GroupName: groupName,
                                    Items: [item]
                                });
                            } else {
                                const group = _findGroup(list, groupName);
                                if (group) {
                                    group.Items.push(item);
                                } else {
                                    list.push({
                                        GroupName: groupName,
                                        Items: [item]
                                    });
                                }
                            }
                        }
                    }
                    this.ListEmpDirectories = [...list];
                }
            }));
  }


  initFunctionListType =  () => {
    this.api.post(HrmAPIConst.NEWS.Alias_GetFunctionListPostNew, HrmAPIConst.NEWS.GetFunctionListPostNew,
        { Language: this.authStore.getLanguage() })
        .subscribe(result => {
            if (!result.IsError && result.Data && Object.keys(result.Data).length > 0) {
                const data = result.Data || [];
                this.ListType=data;
                this.TypeSelected=data[0];
            }
        });
  };

  eventSelectedType = (item) => {
    if (item) {
      this.TypeSelected=item;
    }
  };

  eventCancelPostNew = () => {
    const listType = this.ListType;
    const typeSelected = listType && Object.keys(listType).length > 0 ? listType[0] : {};
    this.txtSubject=null;
    this.txtContent=null;
    this.TypeSelected=typeSelected;
  };

  eventSubmitPostNew = () => {
    if (!this.IsActiveSubmitButton) {return;}
    let isError = false;
    let messageAlert = '';
    if (!this.TypeSelected || !this.TypeSelected[LeaveAndOTConst.KEY.Value]) {
        isError = true;
        messageAlert = this.Lang.NOTIFY.EnterType;
    } else if (!this.txtSubject) {
        isError = true;
        messageAlert = this.Lang.NOTIFY.EnterSubject;
    } else if (!this.txtContent) {
        isError = true;
        messageAlert = this.Lang.NOTIFY.EnterContent;
    }

    if (isError) {
        this.notifications.alert(this.Lang.COMMON.Error,messageAlert);
        return;
    }
    const type = this.TypeSelected[LeaveAndOTConst.KEY.Value];
    const listType = this.ListType;
    const successTypeSelected = listType && Object.keys(listType).length > 0 ? listType[0] : {};
    this.IsActiveSubmitButton=false;
    this.api.post(HrmAPIConst.NEWS.Alias_CreatePostNew, HrmAPIConst.NEWS.CreatePostNew,
        {
            Type: type,
            Subject: this.txtSubject,
            Content: this.txtContent,
            BUCodes: this.DepartmentCodePostNew
        })
        .subscribe(result => {
            this.IsActiveSubmitButton = true;
            if (result && !result.IsError) {
                this.TypeSelected=successTypeSelected;
                this.txtSubject=null;
                this.txtContent=null;
                this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.CreateSuccess);
            }
    });
  };



  scanQRcode = async () => {
    const qrCode = await this.barcodeScanner.scan({
      preferFrontCamera : false, // iOS and Android
      prompt : 'Place a camera inside the scan area', // Android
      formats : 'QR_CODE'
    });
    if(qrCode && qrCode.text){
      //alert(JSON.stringify(qrCode));
      this.api.post(HrmAPIConst.EMPLOYEE.GetEmpCodeByQR,null,{
        mText:qrCode.text})
      .subscribe((res) => {
        if (!res.Error && res.Data && res.Data.length > 0) {
            const data = res.Data[0] || {};
            HrmStorage.setData(HrmStorageConst.ItemMyEmployees,data);
            const params={
              showFull: false,
              showBenefit: false,
              showMyTeam: false,
              flag: 3,
              isChildren: true,
              data
            };
            this.router.navigate([`Manager/${CommonConst.SCENE.EmployeeItem}/${data.EmployeeCode}`],{state:params});
        } else {
            this.notifications.alert(this.Lang.COMMON.NoDataFound,this.Lang.COMMON.Error);
        }
      });
    }
  };


  loadMore(event) {
    const me =this;
    if (this.current < this.TotalEmps) {
      this.PageIndex++;
      this.payload = {
        PageIndex: me.PageIndex,
        PageSize: me.PageSize,
        SearchText: me.searchText,
        DepartmentCode: this.DepartmentCode
        };
      this.getListEmpDirectory().subscribe(res => {
        event.target.complete();
      });
    } else
      {event.target.disabled = true;}
  }

  eventSelectedTab(tabName){
    this.state.TeamManager = [];
    this.state.TeamSubManager = [];
    this.ListEmpDirectories = [];
    this.PageIndex = 0;
    this.current = 0;
    this.isQRCodeVisible = false;
    switch (tabName) {
      case 1:
        this.tabName = CommonConst.TAB.Employee;
        break;
      case 2:
        this.tabName = CommonConst.TAB.Office;
        break;
      case 3:
        this.tabName = CommonConst.TAB.PostNew;
        break;
      default:
        break;
    }
    this.getListEmpDirectory().subscribe();
  };


  eventOnSelectedDepartmentCode(item) {
    if (item && item[ReportConst.KEY.DepartmentCode] != null) {
      this.state.TeamManager= [];
      this.state.TeamSubManager= [];
      this.ListEmpDirectories = [];
      this.PageIndex= 0;
      this.TotalEmps= 0;
      this.isQRCodeVisible= false;
      this.IsVisibleDepartment = false;
      this.DepartmentCode= item[CommonConst.KEY.DepartmentCode];
      this.getListEmpDirectory().subscribe();
    }
  }

  eventOnSelectedDepartmentCodePostNew(item) {
    if (item && item[CommonConst.KEY.MultiSelectedItems] != null) {
        const buCodes = (`${item[CommonConst.KEY.MultiSelectedItems]}`).replace(/;+$/, '').replace(/;/g, ',');
        const buCodesName = (`${item[CommonConst.KEY.MultiSelectedItemsName]}`).replace(/;+$/, '').replace(/;/g, ', ');
        this.DepartmentCodePostNew =  buCodes;
        this.DepartmentNamePostNew =  buCodesName;
    } else {
      this.DepartmentCodePostNew =  null;
      this.DepartmentNamePostNew =  null;
    }
  }

  setOpenModalOffice(isOpen: boolean) {
    this.IsVisibleDepartment = isOpen;
  }
  setOpenModalPostNew(isOpen: boolean) {
    this.IsVisibleDepartmentPostNew = isOpen;
  }

  onClickEmp(item){
    HrmStorage.setData(HrmStorageConst.ItemMyEmployees,item);
    const params={
        showFull: false,
        showBenefit: false,
        showMyTeam: false,
        flag: 3,
        isChildren: true,
        data:item
    };
    this.router.navigate([`Manager/${CommonConst.SCENE.EmployeeItem}/${item.EmployeeCode}`],
    {
      state: params
    });
  }

  // loadDept() {
  //   this.api.post(HrmAPIConst.EMPLOYEEDIRECTORY.Alias_GetDepartmentTreeForDirectorys,
  //                 HrmAPIConst.EMPLOYEEDIRECTORY.GetDepartmentTreeForDirectorys)
  //           .subscribe((res) => {
  //               const data = res.Data;
  //               this.state.ListDepartment = data;
  //               //  () => {
  //               //     this.refCTreeDepartment && this.refCTreeDepartment.onReloadData(this.state.ListDepartment);
  //          // }

  //       });

  // }

  loadConfig() {
    this.api.post(HrmAPIConst.EMPLOYEE.Alias_GetDepartmentTree, HrmAPIConst.EMPLOYEE.GetDepartmentTree)
            .subscribe((res) => {
            if (res && !res.IsError) {
              this.ListDepartment = res.Data;
            }
        });
  }

  onPressShowCall = async (mobile,e) => {
    if (!mobile) {return;}
    e.stopPropagation();
    const messege = 'tel:' + mobile;
    window.location.href = messege;
  };
  onPressShowMail = async (mail,e) => {
    if (!mail) {return;}
    e.stopPropagation();
      const messege = 'mailto:' + mail;
      window.location.href = messege;
  };
}

