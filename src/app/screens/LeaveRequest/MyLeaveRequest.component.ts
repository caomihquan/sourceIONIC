/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService, } from '@ngx-translate/core';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import LeaveAndOTConst from '../../shared/constants/LeaveAndOTConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';

const API_LEAVE_REQUEST = HrmAPIConst.LEAVE_REQUEST;
@Component({
  selector: 'app-my-leaverequest',
  templateUrl: './MyLeaveRequest.component.html',
  styleUrls: ['./MyLeaveRequest.component.scss'],
})
export class MyLeaveRequestComponent implements OnInit {
  // eslint-disable-next-line max-len
  CurrentMonth = (new Date().getFullYear()).toString() + '/' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString());
  DowCodeSelection = { DowCode: (new Date()).getFullYear() };
  StatusSelection = { key: 'Status', name: 'Status' };
  currentItems = 0;
  TotalItems = 0;
  lstDows = this.commonHandler.getYearsOfDow();
  lstStatus = [
    { key: 'BegDate', name: 'Month' },
    { key: 'Status', name: 'Status' },
    { key: 'KowName', name: 'Type' }
  ];
  IsRegisInstead = false;
  StrRegisInstead =  '';
  Lang: any;
  user: any;
  _isMountedRequestData = false;
  dataHistory: any[];
  checkInOutHistory: any;
  visibleModal = false;
  PageIndex = 0;
  PageSize = CommonConst.VALUE.PageSize;
  RequestData = [];
  OldRequestData: any[];
  RemainLeaveNumber= {};
  ListOfHistRequest= [];
  RemainExtraDayOffNumbe= {};
  SetupProcess={};
  IsVisibleOrderBy = false;
  IsVisibleYear = false;
  IsModalLoading = false;
  YearSelection = (new Date()).getFullYear();
  SortBy = this.StatusSelection.key;
  SortByName = this.StatusSelection.name;
  OrderByItems: [];
  YearItems = (new Date()).getFullYear();
  listRequest = [];
  ReOptions = {
    PageIndex: 0,
    PageSize: CommonConst.VALUE.PageSize,
    TotalPages: 0,
    currentItems:0
  };
  IsLoadFinish = false;
  itemFunction: any;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private variablesService: VariableCommonService,
    private auth: AuthStore, private languageService: LanguageService, public commonHandler: CommonHandlerService) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.variablesService.$reloadFunction.next(false);
    this._isMountedRequestData = true;
    this.getLanguage();
    this.commonHandler.dragElement('dragable');
    this.variablesService.$reloadFunction.subscribe(res => {
      if(res){
        this.loadDataRequest(true).subscribe();
      }
    });
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state;
  }
  CheckRegisInstead(){
    if(this.IsRegisInstead)
    {
        this.StrRegisInstead =  '&HasRegisInstead';
    }
    else
    {
      this.StrRegisInstead='';
    }
    this.initOption();
    this.listRequest = [];
    this.loadDataRequest(true).subscribe();
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.loadDataRequest(true).subscribe();
  };

  eventSelectedMonth(item) {
    this.initOption();
    this.DowCodeSelection = item;
    this.loadDataRequest(true).subscribe();
  }
  eventSelectedStatus(item) {
    this.initOption();
    this.listRequest = [];
    this.StatusSelection = item;
    this.loadDataRequest(true).subscribe();
  }
  initOption() {
    this.PageIndex = 0;
    this.PageSize =  CommonConst.VALUE.PageSize;
    this.TotalItems = 0;
    this.currentItems = 0;
    this.OldRequestData= [];
    this.listRequest =[];
  }

  onClickEmp(evt) {
    this.initOption();
    this.variablesService.$reloadFunction.next(false);
    this.router.navigate(['/LeaveRequest/LeaveRequestDetail'], { state: { RequestData: evt ,itemFunction:this.itemFunction} });
  }
  doAddNewRequest(){
    this.initOption();
    this.variablesService.$reloadFunction.next(false);
    this.router.navigate(['/LeaveRequest/LeaveRequestCreate'], { state:
       { RequestData: [],
       SetupProcess: this.SetupProcess,
       ListOfHistRequest: this.ListOfHistRequest,
       itemFunction:this.itemFunction,
       RemainLeaveNumber: this.RemainLeaveNumber ? this.RemainLeaveNumber : {}
      } });
  }

  loadDataRequest(isGetListOfHistRequest = false, callback = null): Observable<any> {
    return this.api.post(API_LEAVE_REQUEST.Alias_GetLeaveRequestAndDataRemainLeaveNumber,
      API_LEAVE_REQUEST.GetLeaveRequestAndDataRemainLeaveNumber,
      {
        Year: this.DowCodeSelection.DowCode,
        SortBy: this.StatusSelection.key + this.StrRegisInstead,
        IsGetListOfHistRequest: isGetListOfHistRequest,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      })

      .pipe(map(result => {
        if (!result.IsError && this._isMountedRequestData) {
          const data = result.Data;
          const remainLeaveNumber = data[LeaveAndOTConst.RemainLeaveNumber] && data[LeaveAndOTConst.RemainLeaveNumber][0] || {};
          const listOfHistRequest = data[LeaveAndOTConst.ListOfHistRequest] || [];
          const setupProcess = data[LeaveAndOTConst.SetupProcess] && data[LeaveAndOTConst.SetupProcess][0] || {};
          const remainExtraDayOffNumber = data[LeaveAndOTConst.RemainExtraDayOffNumber] || {};
          const currentData = data[LeaveAndOTConst.LeaveResponse] || [];
          this.listRequest = [... this.listRequest,...currentData.Data] || [];
          const outputParams = currentData.OutputParams || {};
          this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
          this.currentItems += currentData.Data.length;
          let KeySort = this.StatusSelection.key;
          if (KeySort === 'Status') {KeySort = 'StatusName';}
          const convertedData = this.commonHandler.convertDataLeave(this.listRequest, KeySort,this.Lang.COMMON.ListStatus);
          this.RemainLeaveNumber = remainLeaveNumber;
          this.ListOfHistRequest = isGetListOfHistRequest ? listOfHistRequest : this.ListOfHistRequest;
          this.SetupProcess = setupProcess;
          this.RemainExtraDayOffNumbe = remainExtraDayOffNumber;
          this.OldRequestData = this.listRequest;
          // bổ sung màu sắc cho các phiều
          if (convertedData) {
            for (let i = 0; i < convertedData.length; i++) {
              for (let j = 0; j < convertedData[i].Data.length; j++) {
                if (convertedData[i].Data[j].Status === 1) // chờ duyệt
                {
                  convertedData[i].Data[j].BackGroundColor = '#0088CF';
                }
                else if (convertedData[i].Data[j].Status === 2) // đã duyệt
                {
                  convertedData[i].Data[j].BackGroundColor = '#7DBC42';
                }
                else if (convertedData[i].Data[j].Status === 3) // ko duyệt
                {
                  convertedData[i].Data[j].BackGroundColor = '#FF3939';
                }
                else if (convertedData[i].Data[j].Status === 5) // xin hủy
                {
                  convertedData[i].Data[j].BackGroundColor = '#FEA747';
                }
                else if (convertedData[i].Data[j].Status === 6) // đã hủy
                {
                  convertedData[i].Data[j].BackGroundColor = '#F3721C';
                }
                else {
                  convertedData[i].Data[j].BackGroundColor = '#DFDFDF';
                }
                convertedData[i].Data[j].drawStatus = this.DrawStrStatus(convertedData[i].Data[j].strStatus);

              }
            }
          }
          this.RequestData = convertedData;
          this.variablesService.$reloadFunction.next(false);
          if(callback) {callback();}
        }
      }));
  }

  loadMore(event){
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.loadDataRequest(true).subscribe(res => {
        setTimeout(() => {
          event.target.complete();
        }, 1000);
      });
    }
    else{
      event.target.complete();
    }

  }
  // // xữ lý vẽ chuỗi status
  DrawStrStatus(strstatus) {
    let html = '';
    //
    if (strstatus && strstatus.length > 0) {
      const arrStatus = strstatus.split(';');
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < arrStatus.length; i++) {
        const strLv = arrStatus[i];
        if (strLv !== '' && strLv.length > 0) {
          const arr = strLv.split(',');
          const Status = arr[1];
          if(Status == 0)
          {
            if (html.length > 0)
              html += '<div style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #CCC; margin-left: 5px;"></div>'
            else
              html = '<div style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #CCC"></div>'
          }
          else if (Status === '2') // đã duyệt
          {
            if (html.length > 0)
              {
                html += '<div style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #7DBC42;"></div>';
              }
            else
              {html = '<div style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #7DBC42;"></div>';
            ;}
          }
          else if (Status === '3') // ko duyệt
          {
            if (html.length > 0)
              {html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FF3939;"></div>';
            ;}
            else
              {html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FF3939;"></div>';
            ;}
          }
          else if (Status === '5') // xin hủy
          {
            if (html.length > 0)
              {html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FEA747;"></div>';}
            else
              {html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FEA747;"></div>';}
          }
          else if (Status === '6') // đã hủy
          {
            if (html.length > 0)
              {
                html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #F3721C;"></div>';}
            else
              {html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #F3721C;"></div>';}
          }
          else {
            if (html.length > 0)
              {html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #DFDFDF;"></div>';}
            else
              {html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #DFDFDF;"></div>';}
          }
        }
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}



