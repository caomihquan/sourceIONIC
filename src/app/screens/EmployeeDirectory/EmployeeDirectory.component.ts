/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
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
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
@Component({
  selector: 'app-home',
  templateUrl: './EmployeeDirectory.component.html',
  styleUrls: ['./EmployeeDirectory.component.scss'],
})
export class EmployeeDirectoryComponent implements OnInit {
  user: any;
  segment = 1;
  payload: any;
  page = 0;
  scannedData: any;
  itemFunction: any;
  Lang;
  state = {
    tabName: CommonConst.TAB.Employee,
    TeamManager: [],
    TeamSubManager: [],
    ListEmpDirectories: [],
    searchText: '',
    onScrolling: false,
    PageIndex: 0,
    PageSize: CommonConst.VALUE.PageSize,
    TotalEmps: 0,
    isFull: false,
    isLoading: false,
    isScrollLoading: false,
    isQRCodeVisible: false,
    QRCode: null,
    DepartmentCode: '',
    ListDepartment: [],
    IsVisibleDepartment: false,
    IsFieldVisibleMobile: false,
    IsFieldVisibleScanQRCode: true,
};
  current=0;
  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private languageService: LanguageService,
    private notifications: NotificationsService,
    public CommonHandler: CommonHandlerService,
    private barcodeScanner: BarcodeScanner){
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
    this.getListEmpDirectory().subscribe();
    this.loadConfig();
    this.loadDept();
  };


  scanQRcode = async () => {
    const qrCode = await this.barcodeScanner.scan({
      preferFrontCamera : false, // iOS and Android
      prompt : 'Place a camera inside the scan area', // Android
      formats : 'QR_CODE'
    });
    if(qrCode && qrCode.text){
      this.api.post(HrmAPIConst.EMPLOYEE.GetEmpCodeByQR,null,{
        mText:qrCode.text})
      .subscribe((res) => {
        if (!res.Error && res.Data && res.Data.length > 0) {
          const data = res.Data[0] || {};
          HrmStorage.setData(HrmStorageConst.ItemMyEmployees,data);
          this.router.navigate([`EmployeeDirectory/${CommonConst.SCENE.MyProfile}/${res.Data[0].EmployeeCode}`],{
            state: {
              ...this.itemFunction,
              ...data,
              ...this.state,
              ...{IsVisibleByEmpDirectory:true,flag:3,isPhoneMail:true}
            }});
        } else {
            this.notifications.alert(this.Lang.COMMON.NoDataFound,this.Lang.COMMON.Error);
        }
      });
    }
  };

  getListEmpDirectory(): Observable<any>{
    const me = this;
    this.payload = {
    PageIndex: me.state.PageIndex,
    PageSize: me.state.PageSize,
    SearchText: me.state.searchText,
    DepartmentCode: this.state.DepartmentCode
    };
    return this.api.post(HrmAPIConst.EMPLOYEE.GetEmpDirectory,'',this.payload).pipe(map(response => {
            if (!response.Error && response.Data) {
                const res = response.Data;
                const totalEmps = res && res.length > 0 && res[0].TotalEmps ? res[0].TotalEmps : 0;
                me.state.TotalEmps = totalEmps;

                this.current += res.length;
                // eslint-disable-next-line no-underscore-dangle
                const _findGroup = function(data, name) {
                    // eslint-disable-next-line @typescript-eslint/prefer-for-of
                    for (let i = 0; i < data.length; i++) {
                        const item = data[i];
                        if (item[LeaveAndOTConst.KEY.GroupName] === name) {
                            return item;
                        }
                    }
                    return null;
                };

                const listEmp = me.state.ListEmpDirectories;

                // eslint-disable-next-line max-len
                const keyGroup = me.state.tabName === CommonConst.TAB.Employee ? LeaveAndOTConst.KEY.GroupName : LeaveAndOTConst.KEY.DepartmentName;
                const list = listEmp && listEmp.length > 0 ? listEmp : [];

                // eslint-disable-next-line @typescript-eslint/prefer-for-of
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
                me.state.ListEmpDirectories = [...list];
            }
            return response;
        }
        ));
  };
  loadMore(event) {
    const me =this;
    if (this.current < this.state.TotalEmps) {
      this.state.PageIndex++;
      this.payload = {
        PageIndex: me.state.PageIndex,
        PageSize: me.state.PageSize,
        SearchText: me.state.searchText,
        DepartmentCode: this.state.DepartmentCode
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
    this.state.ListEmpDirectories = [];
    this.state.PageIndex = 0;
    this.current = 0;
    this.state.isQRCodeVisible = false;
    this.state.tabName = tabName === 0 ? this.state.tabName : (tabName === 1 ?CommonConst.TAB.Employee : CommonConst.TAB.Office);
    this.getListEmpDirectory().subscribe();
  };


  eventOnSelectedDepartmentCode(item) {
    if (item && item[ReportConst.KEY.DepartmentCode] != null) {
      this.state.TeamManager= [];
      this.state.TeamSubManager= [];
      this.state.ListEmpDirectories= [];
      this.state.onScrolling= false;
      this.state.PageIndex= 0;
      this.state.TotalEmps= 0;
      this.state.isQRCodeVisible= false;
      this.state.IsVisibleDepartment= false;
      this.state.DepartmentCode= item[CommonConst.KEY.DepartmentCode];
      this.getListEmpDirectory().subscribe();
    }
}

  setOpenModalOffice(isOpen: boolean) {
    this.state.IsVisibleDepartment = isOpen;
  }

  onClickEmp(item){
    HrmStorage.setData(HrmStorageConst.ItemMyEmployees,item);
    this.router.navigate([`EmployeeDirectory/${CommonConst.SCENE.MyProfile}/${item.EmployeeCode}`],
    {
      state: {
      ...this.itemFunction,
      ...item,
      ...this.state,
      ...{IsVisibleByEmpDirectory:true,flag:3,isPhoneMail:true}
    }
  });
  }

  loadDept() {
    this.api.post(HrmAPIConst.EMPLOYEEDIRECTORY.Alias_GetDepartmentTreeForDirectorys,
                  HrmAPIConst.EMPLOYEEDIRECTORY.GetDepartmentTreeForDirectorys)
            .subscribe((res) => {
                const data = res.Data;
                this.state.ListDepartment = data;
                //  () => {
                //     this.refCTreeDepartment && this.refCTreeDepartment.onReloadData(this.state.ListDepartment);
           // }

        });

  }

  loadConfig() {
    this.api.post(HrmAPIConst.EMPLOYEE.Alias_GetConfigEmployeeDirectorys,
                  HrmAPIConst.EMPLOYEE.GetConfigEmployeeDirectorys)
            .subscribe((res) => {
            if (!res.Error) {
                const data = res.Data;
                const isFieldVisibleMobile = this.CommonHandler.getFieldVisible(data, 'Mobile');
                const isFieldVisibleScanQRCode = this.CommonHandler.getFieldVisible(data, 'ScanQRCode');
                this.state.IsFieldVisibleMobile = isFieldVisibleMobile;
                this.state.IsFieldVisibleScanQRCode = isFieldVisibleScanQRCode;
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

