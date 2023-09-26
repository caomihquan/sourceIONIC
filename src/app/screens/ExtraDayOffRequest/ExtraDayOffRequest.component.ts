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

//const API_LEAVE_REQUEST = HrmAPIConst.LEAVE_REQUEST;
const API_LEAVE_REQUEST = HrmAPIConst.EXTRADAYOFF_REQUEST;

@Component({
  selector: 'app-extradayoffequest',
  templateUrl: './ExtraDayOffRequest.component.html',
  styleUrls: ['./ExtraDayOffRequest.component.scss'],
})
export class ExtraDayOffRequestComponent implements OnInit {
  // eslint-disable-next-line max-len
  CurrentMonth = (new Date().getFullYear()).toString() + '/' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString());
  DowCodeSelection = { DowCode: (new Date()).getFullYear() };
  StatusSelection = { key: 'Status', name: 'Status' };

  lstDows = this.commonHandler.getYearsOfDow();
  lstStatus = [
    { key: 'BegDate', name: 'Month' },
    { key: 'Status', name: 'Status' },
    { key: 'KowName', name: 'Type' }
  ];

  Lang: any;
  user: any;
  _isMountedRequestData = false;
  dataHistory: any[];
  checkInOutHistory: any;
  visibleModal = false;

  RequestData: any[];
  OldRequestData: any[];
  RemainLeaveNumber: {};
  modelConfigTSEmp = {};
  ListOfHistRequest: [];
  RemainExtraDayOffNumber: {};
  SetupProcess = {};
  IsVisibleOrderBy = false;
  IsVisibleYear = false;
  IsModalLoading = false;
  YearSelection = (new Date()).getFullYear();
  SortBy = this.StatusSelection['key'];
  SortByName = this.StatusSelection['name'];
  OrderByItems: [];
  YearItems = (new Date()).getFullYear();
  ReOptions = {
    PageIndex: 0,
    PageSize: 20,
    TotalPages: 0,
    IsFull: false,
    OnScrolling: false,
  };
  IsLoadFinish = false;
  IsRegisInstead : boolean = false;
  StrRegisInstead: string =''
  itemFunction;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthStore, private languageService: LanguageService, public commonHandler: CommonHandlerService) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.getLanguage();
    this.commonHandler.dragElement('dragable');
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
    this.loadDataRequest(true);
  }

  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.activeRoute.params.subscribe(val => {
      this.loadDataRequest(true);
    });
  };

  eventSelectedMonth(item) {
    this.DowCodeSelection = item;
    this.loadDataRequest(true);
  }
  eventSelectedStatus(item) {
    this.StatusSelection = item;
    this.loadDataRequest(true);
  }
  initReOption() {
    return {
      PageIndex: 0,
      PageSize: 10,
      TotalPages: 0,
      IsFull: false,
      OnScrolling: false,
    };
  }
  onClickEmp(evt) {
    this.router.navigate(['/ExtraDayOffRequest/ExtraDayOffRequestDetail'], { state: { RequestData: evt,itemFunction:this.itemFunction } });
  }
  doAddNewRequest(){
    this.router.navigate(['/ExtraDayOffRequest/ExtraDayOffRequestCreate'], { state:
      {
          RequestData: {},
          SetupProcess: this.SetupProcess,
          ListOfHistRequest: this.ListOfHistRequest,
          RemainLeaveNumber: this.RemainLeaveNumber ? this.RemainLeaveNumber : {},
          modelConfigTSEmp: this.modelConfigTSEmp ? this.modelConfigTSEmp : {},
          itemFunction:this.itemFunction
      }
    });
  }
  loadMore(event) {
    let me =this;
    if (!this.ReOptions.IsFull) {
      this.loadDataRequest(true, ()=>{event.target.complete();});
    }
    else{
      event.target.complete();
    }

  }
  loadDataRequest(isGetListOfHistRequest = false, callback = null) {
    const options = this.initReOption();
    this.api.post(API_LEAVE_REQUEST.Alias_GetExtraDayOffRequestAndDataRemainLeaveNumber,
      API_LEAVE_REQUEST.GetExtraDayOffRequestAndDataRemainLeaveNumber,
      {
        Year: this.DowCodeSelection.DowCode,
        SortBy: this.StatusSelection['key']+ this.StrRegisInstead,
        IsGetListOfHistRequest: isGetListOfHistRequest,
        PageIndex: options.PageIndex,
        PageSize: options.PageSize
      })

      .subscribe(result => {
        if (!result.IsError) {
          const data = result.Data;

          const listOfHistRequest = data[LeaveAndOTConst.ListOfHistRequest] || [];
          const remainExtraDayOffNumber = data['RemainLeaveNumber'] || {};

          const currentData = data['ListResponse'] || [];
          const listRequest = currentData.Data || [];
          const outputParams = currentData.OutputParams || {};
          const totalPages = outputParams[CommonConst.KEY.TotalPages] >= 999999999 ? outputParams[CommonConst.KEY.TotalPages] - 999999999 : outputParams[CommonConst.KEY.TotalPages];
          options.TotalPages = totalPages;
          options.OnScrolling = false;
          options.IsFull = options.PageIndex + 1 >= totalPages;

          let KeySort = this.StatusSelection['key'];
          if (KeySort == 'Status') KeySort = 'StatusName';
          const convertedData = this.commonHandler.convertDataLeave(listRequest, KeySort,this.Lang.COMMON.ListStatus);
          this.RemainLeaveNumber = remainExtraDayOffNumber;

          this.ListOfHistRequest = true == isGetListOfHistRequest ? listOfHistRequest : this.ListOfHistRequest;

          this.SetupProcess = outputParams[CommonConst.KEY.TotalPages] >= 999999999 ? true : false;
          this.RemainExtraDayOffNumber = remainExtraDayOffNumber;
          this.OldRequestData = listRequest;
          this.modelConfigTSEmp= data.modelConfigTSEmp;
          // bổ sung màu sắc cho các phiều
          if (convertedData) {
            for (let i = 0; i < convertedData.length; i++) {
              for (let j = 0; j < convertedData[i].Data.length; j++) {
                if (convertedData[i].Data[j].Status == 1) // chờ duyệt
                {
                  convertedData[i].Data[j].BackGroundColor = '#0088CF'
                }
                else if (convertedData[i].Data[j].Status == 2) // đã duyệt
                {
                  convertedData[i].Data[j].BackGroundColor = '#7DBC42'
                }
                else if (convertedData[i].Data[j].Status == 3) // ko duyệt
                {
                  convertedData[i].Data[j].BackGroundColor = '#FF3939'
                }
                else if (convertedData[i].Data[j].Status == 5) // xin hủy
                {
                  convertedData[i].Data[j].BackGroundColor = '#FEA747'
                }
                else if (convertedData[i].Data[j].Status == 6) // đã hủy
                {
                  convertedData[i].Data[j].BackGroundColor = '#F3721C'
                }
                else {
                  convertedData[i].Data[j].BackGroundColor = '#DFDFDF'
                }
                //vẽ chuỗi html
                convertedData[i].Data[j].drawStatus = this.DrawStrStatus(convertedData[i].Data[j].strStatus)
              }
            }
          }

          this.RequestData = convertedData;
          this.ReOptions = {...options};
          this.IsLoadFinish = true;
          if(callback) callback();
        }
      });
  }
  // // xữ lý vẽ chuỗi status
  DrawStrStatus(strstatus) {
    let html = ''
    //
    if (strstatus && strstatus.length > 0) {
      let arrStatus = strstatus.split(';');
      for (let i = 0; i < arrStatus.length; i++) {
        let strLv = arrStatus[i];
        if (strLv != '' && strLv.length > 0) {
          let arr = strLv.split(',');
          let Status = arr[1];
          if(Status == 0)
          {
            if (html.length > 0)
            html += '<div style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #CCC; margin-left: 5px;"></div>'
            else
              html = '<div style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #CCC"></div>'
          }
          else if (Status == 2) // đã duyệt
          {
            if (html.length > 0)
              html += '<div style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #7DBC42;"></div>'
            else
              html = '<div style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #7DBC42;"></div>'
          }
          else if (Status == 3) // ko duyệt
          {
            if (html.length > 0)
              html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FF3939;"></div>'
            else
              html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FF3939;"></div>'
          }
          else if (Status == 5) // xin hủy
          {
            if (html.length > 0)
              html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FEA747;"></div>'
            else
              html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #FEA747;"></div>'
          }
          else if (Status == 6) // đã hủy
          {
            if (html.length > 0)
              html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #F3721C;"></div>'
            else
              html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #F3721C;"></div>'
          }
          else {

            if (html.length > 0)
              html += '<div  style="margin-left: 5px;width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #DFDFDF;"></div>'
            else
              html = '<div  style="width: 70px;height: 70px;line-height: 70px;border-radius: 50%;font-size: 70px;color: #fff;text-align: center;background: #000;width: 15px;height: 15px;line-height: 15px;border-radius: 50%;font-size: 15px;color: #fff;text-align: center;background: #000;background-color: #DFDFDF;"></div>'
          }
        }
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}



