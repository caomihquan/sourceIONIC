/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { Router,NavigationExtras } from '@angular/router';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import * as moment from 'moment';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import HrmStorage from '../../../libs/core/HrmStorage';
import HrmStorageConst from '../../../libs/constants/HrmStorageConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import MyTimesheetConst from 'src/app/shared/constants/MyTimesheetConst';
import  LeaveAndOTConst from 'src/app/shared/constants/LeaveAndOTConst.js';
import { AlertController } from '@ionic/angular';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';

const API_EXTRA_REQUEST = HrmAPIConst.EXTRADAYOFF_REQUEST;
@Component({
  selector: 'app-my-timesheet',
  templateUrl: './MyTimeSheet.component.html',
  styleUrls: ['./MyTimeSheet.component.scss'],
})
export class MyTimeSheetComponent implements OnInit {
  user: any;
  itemFunction: any;
  tabName ='inout';
  YearSelection = moment().year();
  LinkFunction: any[];
  RemainExtraDayOffNumber: any;
  IsTemplateDefault: boolean;
  DowCodeSelection = '';
  timesheetData: any;
  CurrentMonth = moment().format('YYYY') + '/' + moment().format('MM');
  listKow: any;
  listLeaveToday: any;
  top3ListLeave: any;
  top3ListOT: any;
  top3ListBusinessTrip: any;
  checkIn: any;
  checkOut: any;
  isDetailNote = false;
  Lang: any;
  renderContentScanTime: string;
  fullScan: any;
  isDisableEvent = false;
  LinkFunctionActive: any;
  EmployeeCode: string;

  showAlertDialog = false;
  showAlert = false;
  message = '';
  title = '';
  Vacation = null;
  IsPageMissing;
  IsPageLateEarly;
  IsPageExtraWorkDay;
  IsPageExtraDayOff;
  IsViewPageMissing;
  IsViewPageLateEarly;
  IsViewPageExtraWorkDay;
  IsViewPageExtraDayOff;

  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private variablesService: VariableCommonService,
    public CommonHandler: CommonHandlerService,
    private alertController: AlertController,
    private languageService: LanguageService,
    private notificationsService: NotificationsService){
    //
    this.user = this.authStore.get();
    this.EmployeeCode = this.user.EmployeeCode;
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation().extras.state;
    this.getLanguage();
  }

  getLanguage = async () =>{
    this.variablesService.$reloadFunction.next(false);
    this.Lang = await this.languageService.getLanguage();
    this.getConfigData(()=>{
      this.InitLinkFunction();
    });
    this.variablesService.$reloadFunction.subscribe(res => {
      if(res && this.tabName === CommonConst.TAB.MyTimesheet){
        this.getTimeSheet();
        this.getTimesheetTopThree();
      }
    });
  };

  eventSelectedTab(name){
    if(this.tabName !== name){
      this.tabName = name;
    }

    this.isDisableEvent = (name === CommonConst.TAB.Timesheet.Working ? true : false);
    this.getTimeSheet();

  }

  getConfigData(callback){
    this.api.post(HrmAPIConst.MYTIMESHEET.Alias_GetTimeSheetConfig, HrmAPIConst.MYTIMESHEET.GetTimeSheetConfig,
        {
            Year: this.YearSelection
        })
        .subscribe((res) => {
            if (!res.Error) {

                const data = res.Data || {};
                const linkFunction = data.LinkFunction || [];
                const remainExtraDayOffNumber = data.RemainExtraDayOffNumber || {};
                const IsTemplateDefault = data.IsTemplateDefault;
                this.LinkFunction = linkFunction;
                this.RemainExtraDayOffNumber=remainExtraDayOffNumber;
                this.IsTemplateDefault=IsTemplateDefault;
            }
            callback();
        });
  };


  getTimeSheet = () => {
    const key = this.tabName === 'working' ? 1 : 0;
    this.api.post(HrmAPIConst.MYTIMESHEET.Alias_GetTimeSheet, HrmAPIConst.MYTIMESHEET.GetTimeSheet,{
        DowCode:this.DowCodeSelection,
        Kind: key,
        EmployeeCode: this.EmployeeCode
    }).subscribe((res) => {
        if (!res.Error) {
            const timesheet = {};
            const data = res.Data || {};
            const listScanTime = data.ListScanTime || [];
            const listScanTimeKow = data.ListScanTimeKow || [];
            listScanTime.forEach(item => {
                timesheet[item.WorkDate.slice(0, 10)] = {
                    In: item.In,
                    Out: item.Out,
                    Vacation: item.Vacation,
                    DowCode: this.DowCodeSelection,
                    WorkDate: item.WorkDate,
                    Half: item.Half,
                    NPPeriod: item.NPPeriod,
                    CTPeriod: item.CTPeriod,
                    CDPeriod: item.CDPeriod,
                    IsViewScan: item.IsViewScan,
                    FullScan: item.FullScan,
                    IsNotUsedEventCalendar: item.IsNotUsedEventCalendar
                };
            });
              this.timesheetData=timesheet;
              this.listKow=listScanTimeKow;
        }
    });
  };


  getTimesheetTopThree(){
    const me = this;
    me.api.post(HrmAPIConst.MYTIMESHEET.Alias_GetTimesheetTopThree, HrmAPIConst.MYTIMESHEET.GetTimesheetTopThree,{
        DowCode: me.DowCodeSelection,
        EmployeeCode: this.EmployeeCode
    }).subscribe((res) => {
        if (!res.Error) {
                me.listLeaveToday = res.Data.ListLeaveToday && res.Data.ListLeaveToday.length > 0 ? res.Data.ListLeaveToday : [];
                me.top3ListLeave = res.Data.ListLeave && res.Data.ListLeave.length > 0 ? res.Data.ListLeave : [];
                me.top3ListOT = res.Data.ListOT && res.Data.ListOT.length > 0 ? res.Data.ListOT : [];
                me.top3ListBusinessTrip = res.Data.ListBusinessTrip && res.Data.ListBusinessTrip.length > 0 ? res.Data.ListBusinessTrip : [];
        }
    });
  };

  getDateStyle(item) {
    const yourDate = item.toISOString().split('T')[0];
    let marking;
    try {
      marking = this.timesheetData[yourDate];
    } catch (e) {};
    const bgColor= {
      Work: '#FFFFFF',
      Holiday: '#0088CF',
      Leave: '#FB9D36',
      Travel: '#7DBC42',
      Missing: '#FF3939',
      LateEarly: '#AC36FB',
      LateEarlyAndMissing: '#CFC100',
      Text:'#FFFFFF',
      Current:'#A9A9A9'
    };
    const styles = { color: '',background:'' };
    //let dayofmonth =0;
    const today = new Date().getDate() < 10 ? '0'+new Date().getDate() : new Date().getDate();
    const tomonth =(new Date().getMonth() + 1) < 10 ? '0'+ (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
    const toyear = new Date().getFullYear();
    const strdate = toyear + '-' + tomonth + '-' + today;
    let compare = false;
    if (marking && marking?.WorkDate && new Date(marking?.WorkDate) <= new Date()) {
        compare = true;
    }
    if (this.tabName === CommonConst.TAB.Timesheet.Working) {return styles;}
    else if (marking?.Vacation === 0 && compare) {
        styles.background = bgColor.Work;
    } else if (marking?.Vacation === 3 && compare) {
        styles.background = bgColor.Holiday;
        styles.color = bgColor.Text;
    } else if (marking?.Vacation === 5 && compare) {
        styles.background = bgColor.Leave;
        styles.color = bgColor.Text;
    } else if (marking?.Vacation === 6 && compare) {
        styles.background = bgColor.Travel;
        styles.color = bgColor.Text;
    } else if ((marking?.Vacation === 7 || marking?.Vacation === 8) && compare) {
        styles.background = bgColor.Missing;
        styles.color = bgColor.Text;
    }
    else if ((marking?.Vacation === 9 || marking?.Vacation === 10) && compare) {
        styles.background = bgColor.LateEarly;
        styles.color = bgColor.Text;
    }
    else if (((marking?.Vacation >= 11 && marking?.Vacation <= 14) || (marking?.Vacation >= 15 && marking?.Vacation <= 19)) && compare) {
        styles.background = bgColor.LateEarlyAndMissing;
        styles.color = bgColor.Text;
    }
    else if (marking?.Vacation === 100 && compare) {
        styles.background = bgColor.Current;
        styles.color = bgColor.Text;
    }
    if (compare && marking?.WorkDate.split('T')[0] === strdate) {
        styles.background = bgColor.Current;
        styles.color = bgColor.Text;
    }
    if (marking?.Half > 0) {
        const styles2 = {color:'',morning: {background:''}, afternoon: {background:''},background:'' };
        //Công tác sáng - đi làm chiều
        if (marking?.CTPeriod === 2) {
            styles2.morning.background = bgColor.Travel;
        }
        //Công tác chiều - đi làm sáng
        if (marking?.CTPeriod === 3) {
            styles2.afternoon.background = bgColor.Travel;
        }
        //Nghỉ phép sáng - đi làm chiều
        if (marking?.NPPeriod === 2) {
            styles2.morning.background = bgColor.Leave;
        }
        //Nghỉ phép chiều - đi làm sáng
        if (marking?.NPPeriod === 3) {
            styles2.afternoon.background = bgColor.Leave;
        }
        //Nghỉ phép sáng - đi làm chiều
        if (marking?.CDPeriod === 2) {
            styles2.morning.background = bgColor.Holiday;
        }
        //Nghỉ chế độ chiều - đi làm sáng
        if (marking?.CDPeriod === 3) {
            styles2.afternoon.background = bgColor.Holiday;
        }
        if (!styles2.morning.background) {
          styles2.morning.background ='#fff';
        }
        if (!styles2.afternoon.background) {
          styles2.afternoon.background = '#fff';
        }
        styles2.background = `linear-gradient(${styles2.morning.background} 50%, ${styles2.afternoon.background} 50%)`;
        return styles2;

    }

    return styles;
  }

  ChangeDowCode(dowCode){
    const myPromise = new Promise((resolve, reject) => {
      if(dowCode){
        resolve(dowCode);
      }
    });

    myPromise.then(x => this.DowCodeSelection = x.toString())
    .then(() => this.getTimeSheet())
    .then(() => this.getTimesheetTopThree());
  }

  onChangeEmployee(emp) {
      const myPromise = new Promise((resolve, reject) => {
        if(emp){
          resolve(emp);
        }
      });
      myPromise.then(x => this.EmployeeCode = x.toString())
      .then(() => this.getTimeSheet())
      .then(() => this.getTimesheetTopThree());
  }

  InitStateInOut(marking) {
    const yourDate = marking.toISOString().split('T')[0];
    try {
      marking = this.timesheetData[yourDate];
    } catch (e) {};
    const configMobile = HrmStorage.getData(HrmStorageConst.ConfigMobile);
    const isFourTimeLine = (configMobile && configMobile.IsFourTimeLine) || false;
    let In = [];
    let Out = [];
    let htmlInout='';
    if (this.tabName === CommonConst.TAB.Timesheet.InOut) {
      In = isFourTimeLine ? this.getCheckIn(marking,' - ').split('-') : [this.getCheckIn(marking,'')];
      Out = isFourTimeLine ? this.getCheckOut(marking,' - ').split('-') : [this.getCheckOut(marking,'')];

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < In.length; i++){
        htmlInout += `<div>${In[i]}</div>`;
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < Out.length; i++){
        htmlInout += `<div>${Out[i]}</div>`;
      }
      return htmlInout;
    }
    if (this.tabName === CommonConst.TAB.Timesheet.Working) {
        In = this.getWorking(marking);
        return In.join('</br>');
    }
  }

  getIsViewScan(item) {
    let marking;
    const yourDate = item.toISOString().split('T')[0];
    try {
      marking = this.timesheetData[yourDate];
    } catch (e) {};
    if (typeof marking === 'object') {
        if(marking.IsNotUsedEventCalendar === '1'){
          return false;
        }
        if (marking.IsViewScan) {
            return true;
        }
    }
    return false;
  }

  // getFullScan() {
  //   const marking = this.state.Marking;
  //   if (typeof marking === 'object') {
  //       if (marking.FullScan) {
  //           return marking.FullScan;
  //       }
  //   }
  //   return;
  // }


  getCheckIn(marking,character) {
    if (typeof marking === 'object') {
        if (marking.In) {
            return marking.In;
        }
    }
    return character;
  }

  getCheckOut(marking,character) {
    if (typeof marking === 'object') {
        if (marking.Out) {
            return marking.Out;
        }
    }
    return character;
  }

  getWorking(marking) {
    if (typeof marking === 'object') {
        if (marking.In) {
            const splitArr = marking.In.split('-');
            const len = splitArr.length;
            if (len > 2) {
                const data = splitArr.splice(0, 2);
                return data;
            }
            else {
                const newArr = new Array(2 - len).fill('');
                const result = splitArr.concat(newArr);
                return result;
            }
        }
    }
    return new Array(2).fill('');
  }

  showNote(){
    this.isDetailNote = !this.isDetailNote;
  }


  onScanTimeMore(item){
    let marking;
    const yourDate = item.toISOString().split('T')[0];
    try {
      marking = this.timesheetData[yourDate];
    } catch (e) {};
    if (typeof marking === 'object') {
      if(marking.IsNotUsedEventCalendar === '1'){
        return;
      }
    }
    if (marking?.IsViewScan){
      setTimeout(() => {
          const title = (this.tabName === CommonConst.TAB.Timesheet.Working) ? this.Lang?.MYTIMESHEET?.TsKowNameDay : this.Lang?.MYTIMESHEET?.InOutInDay;
          this.notificationsService.alert(title,marking.FullScan);
      }, 300);
    }
  }


  pushPageMissingRequestCreate(marking) {
    if (marking.DowCode && marking.WorkDate) {
        const params = {
            //EventOnReloadPage: this.props.OnReloadPage,
            DowCode: marking.DowCode,
            WorkDate: marking.WorkDate,
            IsPageTimeSheet: true
        };
        this.router.navigate(['MissingInOutRequest/MissingInOutRequestCreate'], {state:params});
    }
  }
  pushPageLateEarlyRequestCreate(marking) {
    if (marking.WorkDate) {
        const params = {
            BegDate: marking.WorkDate,
            IsPageTimeSheet: true
        };
        this.router.navigate(['LateEarlyRequest/LateEarlyRequestCreate'], {state:params});
    }
  }

  conditionVacation(vacation, activeCheck,markingDate) {
    let showAlert = false;
    let showAlertDialog = false;
    let title = '';
    let message = '';
    //7 - MissingInOut chưa đăng ký
    if (vacation === 7 && activeCheck.IsViewPageMissing) {
        this.pushPageMissingRequestCreate(markingDate);
    }
    //8 - MissingInOut đã đăng ký
    else if (vacation === 8) {
        showAlert = true;
        title = this.Lang.COMMON.Alert;
        message = this.Lang.MYTIMESHEET.MissingCreated;
    }
    //9
    if (vacation === 9) {
        // LateEarly chưa đăng ký
        if (activeCheck.IsViewPageLateEarly) {
            this.pushPageLateEarlyRequestCreate(markingDate);
        }
        // ExtraWorkDay chưa đăng ký && ExtraDayOff chưa đăng ký
        else if (activeCheck.IsViewPageExtraWorkDay && activeCheck.IsViewPageExtraDayOff) {
            showAlertDialog = true;
            title = this.Lang.MYTIMESHEET.RedirectPage;
        }
        // ExtraWorkDay chưa đăng ký
        else if (activeCheck.IsViewPageExtraWorkDay) {
            //this.pushPageExtraWorkDayCreate(markingDate);
        }
    }
    //10 - LateEarly đã đăng ký
    else if (vacation === 10) {
        showAlert = true;
        title = this.Lang.COMMON.Alert;
        message = this.Lang.MYTIMESHEET.LateEarlyCreated;
    }
    //16 - ExtraDayOff/ExtraDayOff chưa đăng ký & MissingInOut chưa đăng ký
    if ([11, 16].indexOf(vacation) > -1) {
        showAlertDialog = true;
        title = this.Lang.MYTIMESHEET.RedirectPage;
    }
    //12 - LateEarly đã đăng ký & MissingInOut chưa đăng ký
    if (vacation === 12) {
        showAlertDialog = true;
        title =this.Lang.MYTIMESHEET.RedirectPage;
    }
    //13 - LateEarly chưa đăng ký & MissingInOut đã đăng ký
    //18 - ExtraDayOff/ExtraDayOff chưa đăng ký & MissingInOut đã đăng ký
    if ([13, 18].indexOf(vacation) > -1) {
        showAlertDialog = true;
        title = this.Lang.MYTIMESHEET.RedirectPage;
    }
    //14 LateEarly đã đăng ký & MissingInOut đã đăng ký
    else if (vacation === 14) {
        showAlert = true;
        title = this.Lang.COMMON.Alert;
        message = this.Lang.MYTIMESHEET.MissingAndLateEarlyCreated;
    }

    return {
      showAlert,
      showAlertDialog,
      title,
      message,
    };
  }

onDayPress(item){
    if (this.isDisableEvent) {return;}
    let marking;
    const yourDate = item.toISOString().split('T')[0];
    try {
      marking = this.timesheetData[yourDate];
    } catch (e) {};
    const activeCheck = this.onActiveCheck(marking);
    if (marking.IsNotUsedEventCalendar === '1') {
        return;
    }
    if (marking && marking.Vacation != null) {
        const conditionVacation = this.conditionVacation(marking.Vacation, activeCheck,marking);
        this.showAlert= conditionVacation.showAlert;
        this.showAlertDialog= conditionVacation.showAlertDialog;
        this.title= conditionVacation.title;
        this.message= conditionVacation.message;
        this.Vacation= marking.Vacation;
        this.IsPageMissing= activeCheck.IsPageMissing;
        this.IsPageLateEarly= activeCheck.IsPageLateEarly;
        this.IsPageExtraWorkDay= activeCheck.IsPageExtraWorkDay;
        this.IsPageExtraDayOff= activeCheck.IsPageExtraDayOff;
        this.IsViewPageMissing= activeCheck.IsViewPageMissing;
        this.IsViewPageLateEarly= activeCheck.IsViewPageLateEarly;
        this.IsViewPageExtraWorkDay= activeCheck.IsViewPageExtraWorkDay;
        this.IsViewPageExtraDayOff= activeCheck.IsViewPageExtraDayOff;
    }
  };

  onActiveCheck(marking){
    const me = this;
    const activeView = me.onActiveView(marking);
    let isPageMissing = false;
    let isPageLateEarly = false;
    let isPageExtraWorkDay = false;
    let isPageExtraDayOff = false;
    if (activeView.IsViewPageMissing) {
        isPageMissing = true;
    } else if (activeView.IsViewPageLateEarly) {
        isPageLateEarly = true;
    } else if (activeView.IsViewPageExtraWorkDay) {
        isPageExtraWorkDay = true;
    } else if (activeView.IsViewPageExtraDayOff) {
        isPageExtraDayOff = true;
    }
    return {
        IsPageMissing: isPageMissing,
        IsPageLateEarly: isPageLateEarly,
        IsPageExtraWorkDay: isPageExtraWorkDay,
        IsPageExtraDayOff: isPageExtraDayOff,
        IsViewPageMissing: activeView.IsViewPageMissing,
        IsViewPageLateEarly: activeView.IsViewPageLateEarly,
        IsViewPageExtraWorkDay: activeView.IsViewPageExtraWorkDay,
        IsViewPageExtraDayOff: activeView.IsViewPageExtraDayOff
    };
  };

  onActiveView = (marking) => {
    const vacation = marking && marking.Vacation;
    const TotalLeave = this.RemainExtraDayOffNumber.CurrLeave + this.RemainExtraDayOffNumber.LastLeave;
    const IsRemainExtraDayOffNumber = TotalLeave > 0 ? true : false;
    const IsViewPageMissing = this.LinkFunctionActive.IsActivePageMissing && (vacation === 12 || vacation === 11 || vacation === 7);
    const IsViewPageLateEarly = this.LinkFunctionActive.IsActivePageLateEarly && (vacation === 13 || vacation === 11 || vacation === 9);
    const IsViewPageExtraWorkDay = this.LinkFunctionActive.IsActivePageExtraWorkDay && (vacation === 18 || vacation === 16 || vacation === 9);
    const IsViewPageExtraDayOff = this.LinkFunctionActive.IsActivePageExtraDayOff && IsRemainExtraDayOffNumber && (vacation === 18 || vacation === 16 || vacation === 9);
    return {
        IsViewPageMissing,
        IsViewPageLateEarly,
        IsViewPageExtraWorkDay,
        IsViewPageExtraDayOff,
    };
  };

  InitLinkFunction() {
    let linkFunctionActive = this.LinkFunctionActive;
    if (linkFunctionActive && typeof linkFunctionActive == 'object' && linkFunctionActive.length > 0) {return;}
    const linkFunction = this.LinkFunction;
    const isActivePageMissing = linkFunction.filter(item => item.LinkFunctionID === CommonConst.FUNCTION.MissingInOutRequest).length > 0;
    const isActivePageLateEarly = linkFunction.filter(item => item.LinkFunctionID === CommonConst.FUNCTION.LateEarlyRequest).length > 0;
    const isActivePageExtraDayOff = linkFunction.filter(item => item.LinkFunctionID === CommonConst.FUNCTION.ExtraDayOffRequest).length > 0;
    const isActivePageExtraWorkDay = linkFunction.filter(item => item.LinkFunctionID === CommonConst.FUNCTION.ExtraworkDayRequest).length > 0;
    linkFunctionActive = {
        IsActivePageMissing: isActivePageMissing,
        IsActivePageLateEarly: isActivePageLateEarly,
        IsActivePageExtraWorkDay: isActivePageExtraWorkDay,
        IsActivePageExtraDayOff: isActivePageExtraDayOff,
    };
    this.LinkFunctionActive = linkFunctionActive;
  }


  pushPageExtraDayOffCreate(marking) {
    this.api.post(API_EXTRA_REQUEST.Alias_GetDataRemainLeaveNumber, API_EXTRA_REQUEST.GetDataRemainLeaveNumber,
        {
            Year: this.YearSelection
        })
        .subscribe(result => {
            if (result && !result.IsError) {
                const data = result.Data;
                const listOfHistRequest = data[LeaveAndOTConst.ListOfHistRequest] || [];
                const remainLeaveNumber = data[LeaveAndOTConst.RemainLeaveNumber] || {};
                const modelConfigTSEmp = data[LeaveAndOTConst.ModelConfigTSEmp] || {};
                const params = {
                    //EventOnReloadPage: this.eventOnReloadPage,
                    RemainLeaveNumber: remainLeaveNumber,
                    ListOfHistRequest: listOfHistRequest,
                    modelConfigTSEmp,
                    DefaultFromDate: marking.WorkDate,
                    DefaultToDate: marking.WorkDate,
                };
                this.router.navigate(['ExtraDayOffRequest/ExtraDayOffRequestCreate'], {state:params});
            }
        });
  }
  submitButton = () => {
    this.showAlert = false;
    this.title = '';
    this.message ='';
  };

  submitButtonDialog = (data,marking) => {
    this.IsPageMissing = data.some(x => x === MyTimesheetConst.STATUS.E_PageMissing);
    this.IsPageLateEarly = data.some(x => x === MyTimesheetConst.STATUS.E_PageLateEarly);
    this.IsPageExtraWorkDay = data.some(x => x === MyTimesheetConst.STATUS.E_PageExtraWorkDay);
    this.IsPageExtraDayOff = data.some(x => x === MyTimesheetConst.STATUS.E_PageExtraDayOff);
    if (this.IsPageMissing && marking) {
        this.pushPageMissingRequestCreate(marking);
    }
    else if (this.IsPageLateEarly && marking) {
        this.pushPageLateEarlyRequestCreate(marking);
    }
    else if (this.IsPageExtraWorkDay && marking) {
        ///this.pushPageExtraWorkDayCreate(marking);
    }
    else if (this.IsPageExtraDayOff && marking) {
        this.pushPageExtraDayOffCreate(marking);
    }
    this.showAlertDialog=false;
    this.title='';
    this.message='';
    this.IsPageMissing=false;
    this.IsPageLateEarly=false;
    this.IsPageExtraWorkDay=false;
    this.IsPageExtraDayOff=false;
  };

  async presentAlert(okFunc,marking) {
    const input = [];
    if(this.IsViewPageMissing){
      input.push({
        type: 'checkbox',
        label:this.Lang.MISSINGINOUT.New,
        name: this.Lang.MISSINGINOUT.New,
        value:MyTimesheetConst.STATUS.E_PageMissing
      });
    }
    if(this.IsViewPageLateEarly){
      input.push({
        type: 'checkbox',
        label:this.Lang.LATEEARLY.New,
        name: this.Lang.LATEEARLY.New,
        value:MyTimesheetConst.STATUS.E_PageLateEarly
      });
    }
    if(this.IsViewPageExtraWorkDay){
      input.push({
        type: 'checkbox',
        label:this.Lang.EXTRAWORKDAY_REQUEST.New,
        name: this.Lang.EXTRAWORKDAY_REQUEST.New,
        value:MyTimesheetConst.STATUS.E_PageExtraWorkDay
      });
    }
    if(this.IsViewPageExtraDayOff){
      input.push({
        type: 'checkbox',
        label:this.Lang.EXTRADAYOFF_REQUEST.New,
        name: this.Lang.EXTRADAYOFF_REQUEST.New,
        value:MyTimesheetConst.STATUS.E_PageExtraDayOff
      });
    }
    const alert = await this.alertController.create({
      header:this.Lang.COMMON.Alert,
      buttons:[
        {
          text: this.Lang.COMMON.Cancel,
          role: 'cancel',
          handler:()=>{
            this.buttonCancelDialog();
          }
        },
        {
          text:this.Lang.COMMON.OK,
          handler: (data) => {
            okFunc(data,marking);
          }
        }
      ],
      mode:'ios',
      inputs:input
    });
    await alert.present();
  }

  buttonCancelDialog = () => {
    this.showAlertDialog=  false;
    this.title='';
    this.message='';
    this.IsPageMissing = false;
    this.IsPageLateEarly=false;
  };

}



