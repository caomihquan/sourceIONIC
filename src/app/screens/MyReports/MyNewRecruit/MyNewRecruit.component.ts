/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import ReportConst from '../../../shared/constants/ReportConst';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { Router } from '@angular/router';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { ReportService } from '../services/Report.service';

const API_REPORT = HrmAPIConst.REPORT;
const KEY_SCENE = CommonConst.SCENE;
@Component({
  selector: 'app-my-appoint',
  templateUrl: './MyNewRecruit.component.html',
  styleUrls: ['./MyNewRecruit.component.scss'],
})
export class MyNewRecruitComponent implements OnInit {
  @ViewChild('chartListWithMonth') chartListWithMonth: ElementRef;
  @ViewChild('chartListWithYear') chartListWithYear: ElementRef;
  @ViewChild('chartListWithYearDetail') chartListWithYearDetail: ElementRef;

  heightListWithMonth = '';
  heightCharListWithYearDetail = '';


  vChartListWithMonth;
  vChartListWithYear;
  vChartListWithYearDetail;


  ListWithMonth = [];
  ListWithYear = [];
  ListWithYearDetail;
  ListWithMonthMax;

  user: any;
  CurrentMonth = moment().format('YYYY') + '/' + moment().format('MM');
  ListWithTrongThang = [];
  ListWithTrongNam = [];
  DowCode= null;
  DepartmentLevelCode= null;
  DepartmentLevelName= '';
  ListDow= [];
  ListDepartment= [];
  Lang;
  FunctionInfo;
  ListWithTrongNamTheoThang;


  ColorPieChart = ['#267DB3', '#68C182', '#FAD55C', '#ED6647', '#8561C8'];
  Appoint = ['BoNhiem', 'DieuDong', 'KiemNhiem' , 'MienNhiem','ThuyenChuyen'];

  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private notification: NotificationsService,
    private languageService: LanguageService,
    private router: Router,
    public CommonHandler: CommonHandlerService,private report: ReportService){
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() {
    this.FunctionInfo = this.router.getCurrentNavigation()?.extras?.state;
    this.getLanguage();
    this.report.$params.subscribe((item) => {
      if (item) {
        this.DepartmentLevelCode = item[ReportConst.KEY.DepartmentLevelCode];
        this.DepartmentLevelName = item[ReportConst.KEY.DepartmentLevelName];
        this.DowCode = item[ReportConst.KEY.DowCode];
      }
    });
  }

  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.loadConfig();
  };

  eventOnSelectedDowCode(item) {
    if (item && item[ReportConst.KEY.DowCode]) {
        this.DowCode =  item[ReportConst.KEY.DowCode];
    }
  }
  eventOnSelectedDepartment(item) {
    if (item && item[ReportConst.KEY.Value]) {
            this.DepartmentLevelCode= item[ReportConst.KEY.Value];
            this.DepartmentLevelName= item[ReportConst.KEY.Caption];
    }
  }

  loadConfig() {
    this.api.post(API_REPORT.Alias_GetConfigReport, API_REPORT.GetConfigReport)
        .subscribe((res) => {
            if (res && !res.IsError) {
                const data = res.Data;
                const listDow = data.ListDow || [];
                const listDepartment = data.ListDepartment || [];
                const filter = listDow.filter(item => item[ReportConst.KEY.DowCode] === this.CurrentMonth);
                const dow = filter.length > 0 ? filter[0] : listDow.length > 0 ? listDow[0] : {};
                const dept = listDepartment.length > 0 ? listDepartment[0] : {};

                this.DowCode=dow[ReportConst.KEY.DowCode];
                this.ListDow=listDow;
                this.DepartmentLevelCode=dept[ReportConst.KEY.Value];
                this.DepartmentLevelName=dept[ReportConst.KEY.Caption];
                this.ListDepartment=listDepartment;
            }
        });
  }


  loadData = async (callback) =>  {
    if (!this.DepartmentLevelCode) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.MYREPORT.EnterDepartmentLevelCode);
        return;
    }
    else if (!this.DowCode) {
      this.notification.alert(this.Lang.COMMON.Error,this.Lang.MYREPORT.EnterDowCode);
      return;
    }
    const loading = await this.notification.showLoading();

    this.api.post(API_REPORT.Alias_GetDataThongKeTuyenMoi, API_REPORT.GetDataThongKeTuyenMoi,
        {
            Level: this.DepartmentLevelCode,
            DowCode: this.DowCode,
        })
        .subscribe((res) => {
            loading.dismiss();
            if (res && !res.IsError) {
              const colorArray = ReportConst.Color;
              const data = res.Data;
              const listWithMonth = data.ListWithMonth || [];
              const listWithMonthMax = listWithMonth.reduce((max, p) => p[ReportConst.KEY.Amount] > max ? p[ReportConst.KEY.Amount] : max, 0);
              const listWithYear = this.CommonHandler.ConvertDataColor(data.ListWithYear, colorArray);
              //const listWithYearDetail = this.CommonHandler.ConvertDataGroupChart(data.ListWithYearDetail, colorArray, ReportConst.KEY.DepartmentName);
              this.ListWithMonth =listWithMonth;
              this.ListWithYear =listWithYear;
              this.ListWithYearDetail = data.ListWithYearDetail;
              this.ListWithMonthMax = listWithMonthMax;
              if(callback){
                callback();
              }
            }
        });
  };

  eventRead(){
    this.loadData(()=>{
      this.fnListWithMonth();
      this.fnChartListWithTrongNam();
      this.fnListWithYearDetail();
    });
  }

  fnListWithMonth() {
    if(this.vChartListWithMonth)
    {
    this.vChartListWithMonth.destroy();
    }
    this.heightListWithMonth = (this.ListWithMonth.map(x => x.DepartmentName).length * 128 + 300) + 'px';
    const lable = this.ListWithMonth ? this.ListWithMonth.map(x=>x.DepartmentName) : [];
    const Nam =  this.ListWithMonth ? this.ListWithMonth.map(x=>x.Nam) : [];
    const Nu =  this.ListWithMonth ? this.ListWithMonth.map(x=>x.Nu) : [];
    const SL =  this.ListWithMonth ? this.ListWithMonth.map(x=>x.SL) : [];
    const data = {
      labels:lable,
      datasets: [{
        label: this.Lang.MYREPORT.Male,
        data: Nam,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#267DB3',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      },
      {
        data: Nu,
        label:  this.Lang.MYREPORT.Female,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#68C182',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      },
      {
        data: SL,
        label:  this.Lang.MYREPORT.Total,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#FAD55C',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      }]
    };
    this.vChartListWithMonth = new Chart(this.chartListWithMonth.nativeElement, {
      type: 'bar',
      data,
      plugins: [ChartDataLabels],
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'bottom',
            display:true,
          },
          datalabels: {
            formatter:(value) => value > 0 ? value : '',
            anchor: 'end',
            align: 'start',
            color:'#fff',
          }
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              mirror: true,
              align:'center',
              labelOffset:60
            },
            stacked:true
          },
          x: {
            stacked: true,
          },
        }
      }
    });
  }

  fnChartListWithTrongNam() {
    if(this.vChartListWithYear)
    {
    this.vChartListWithYear.destroy();
    }
    const DepartmentName = this.ListWithYear ? this.ListWithYear.map(x=>x.DepartmentName) : [];
    const Color =  this.ListWithYear ? this.ListWithYear.map(x=>x.Color) : [];
    const SL =  this.ListWithYear ? this.ListWithYear.map(x=>x.SL) : [];
    const data = {
      labels:DepartmentName,
      datasets: [{
        label:'',
        data: SL,
        backgroundColor:Color,
        borderWidth: [0]
      }]
    };
    this.vChartListWithYear = new Chart(this.chartListWithYear.nativeElement, {
      type: 'pie',
      data,
      plugins: [ChartDataLabels],
      options: {
        maintainAspectRatio: false,
        layout:{
          padding:{
            top:40
          }
        },
        plugins:{
          legend: {
            position:'bottom',
            display:true,
            align:'center',
            labels:{
              padding:12
          },
          title: {
            display: true,
            padding: 10,
          }
        },
        datalabels: {
          formatter:(value) => value,
          anchor:'end',
          align:'end'
        },
       }}
    }
    );
  }

  fnListWithYearDetail() {
    if(this.vChartListWithYearDetail)
    {
      this.vChartListWithYearDetail.destroy();
    }
    const listWithYearDetail = this.CommonHandler.ConvertDataGroupChart(this.ListWithYearDetail, ReportConst.Color, ReportConst.KEY.DepartmentName);
    const YYYYMM = this.ListWithYearDetail ? [...new Set(this.ListWithYearDetail.map(x => x.YYYYMM))].reverse() : [];
    const DepartmentName = Object.keys(listWithYearDetail);
    this.heightCharListWithYearDetail = (12 * 24 + 300) + 'px';
    const datasetLabel = DepartmentName.map(x =>({
      label: x,
      data: listWithYearDetail[x].Data.map(item => item.SL).reverse(),
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: listWithYearDetail[x].Color,
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
    }));

    const data = {labels:YYYYMM,datasets:datasetLabel};
    this.vChartListWithYearDetail = new Chart(this.chartListWithYearDetail.nativeElement,{
      type: 'bar',
      data,
      plugins: [ChartDataLabels],
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'bottom',
            display:true
          },
          datalabels: {
            formatter:(value) => value > 0 ? value : '',
            anchor: 'end',
            align: 'start',
            color:'#fff'
          }
        },
        maintainAspectRatio: false,
        responsive:true,
        scales: {
          y: {
            stacked:true,
          },
          x: {
            stacked: true,
          }
        }
      }
    });
  }

  eventOpenDetail = (type)  => {
    const params = {
      Alias: HrmAPIConst.REPORT.Alias_GetDataThongKeTuyenMoi_getEmpDetail,
      Path: HrmAPIConst.REPORT.GetDataThongKeTuyenMoi_getEmpDetail,
      Params: {
          Type: type
      },
      ListDepartment: this.ListDepartment,
      ListDow: this.ListDow,
      DowCode: this.DowCode,
      DepartmentLevelCode: this.DepartmentLevelCode,
      DepartmentLevelName: this.DepartmentLevelName,
      Fields: {
          infoLeft1: ReportConst.KEY.EmployeeName,
          infoLeft2: ReportConst.KEY.JobWName,
          infoLeft3: ReportConst.KEY.DepartmentName,
          infoRight1: ReportConst.KEY.JoinDate,
          hideInfoRight: true,
          styleRight1: {
              format: CommonConst.KEY.DateFormat,
              color: '#FB9D36',
          },
          iconLeft2: ReportConst.Icon.JobWoking,
          iconLeft3: ReportConst.Icon.Department,
      },
      KeyGroup: ReportConst.KEY.GroupDepartmentName,
      Title: type === 1 ? this.Lang.MYREPORT.NewRecruitInMonth : this.Lang.MYREPORT.NewRecruitInYear
    };
    this.router.navigate([`NewRecruit/${KEY_SCENE.ReportDetail}`], {state:params});
  };

}

