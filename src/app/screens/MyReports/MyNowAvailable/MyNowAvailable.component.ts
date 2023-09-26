/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import ReportConst from '../../../shared/constants/ReportConst';

import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { ReportService } from '../services/Report.service';

const API_REPORT = HrmAPIConst.REPORT;
const KEY_SCENE = CommonConst.SCENE;

@Component({
  selector: 'app-my-nowavailable',
  templateUrl: './MyNowAvailable.component.html',
  styleUrls: ['./MyNowAvailable.component.scss'],
})
export class MyNowAvailableComponent implements OnInit,AfterViewInit {
  @ViewChild('chartTongHop') chartTongHop: ElementRef;
  @ViewChild('chartGender') chartGender: ElementRef;
  @ViewChild('chartHopDongLaoDong') chartHopDongLaoDong: ElementRef;
  @ViewChild('chartTrinhDoHocVan') chartTrinhDoHocVan: ElementRef;
  @ViewChild('chartThamNien') chartThamNien: ElementRef;
  //height
  user: any;
  Lang;
  ChartListWithTongHop: any;
  ChartListWithGender: any;
  ChartListWithHopDongLaoDong: any;
  ChartListWithTrinhDoHocVan: any;
  ChartListWithThamNien: any;
  FromDate;
  DepartmentLevelCode = null;
  DepartmentLevelName = '';
  ListDepartment = [];
  IsVisibleYear = false;
  IsVisibleDepartment = false;
  IsModalLoading = false;

  ListWithTongHop = [];
  ListWithGender = [];
  ListWithHopDongLaoDong = [];
  ListWithTrinhDoHocVan = [];
  ListWithThamNien = [];
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  FunctionInfo;

  heightCharTongHop = '';
  heightCharGender = '';
  heightCharTrinhDoHocVan = '';


  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private report: ReportService,
    private notification: NotificationsService,
    private languageService: LanguageService,
    private router: Router,
    public CommonHandler: CommonHandlerService){
    //
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());

  }

  ngOnInit() {
    this.FromDate = moment(new Date()).format(this.FormatDate);
    this.getLanguage();
    this.FunctionInfo = this.router.getCurrentNavigation()?.extras?.state;
    this.report.$params.subscribe((item) => {
      if (item) {
        this.DepartmentLevelCode = item[ReportConst.KEY.DepartmentLevelCode];
        this.DepartmentLevelName = item[ReportConst.KEY.DepartmentLevelName];
        this.FromDate = item[ReportConst.KEY.FromDate];
      }
    });
  }

  ngAfterViewInit(){
    //this.barChartMethod();
  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.loadConfig();
  };


  eventOnSelectedDepartment(item) {
    if (item && item[ReportConst.KEY.Value]) {
            this.DepartmentLevelCode= item[ReportConst.KEY.Value];
            this.DepartmentLevelName= item[ReportConst.KEY.Caption];
    }
  }

  loadConfig() {
    const me = this;
    this.api.post(API_REPORT.Alias_GetConfigReport, API_REPORT.GetConfigReport)
        .subscribe((res) => {
            if (res && !res.IsError) {
                const data = res.Data;
                const listDepartment = data.ListDepartment || [];
                const dept = listDepartment.length > 0 ? listDepartment[0] : {};
                this.DepartmentLevelCode= dept[ReportConst.KEY.Value];
                this.DepartmentLevelName= dept[ReportConst.KEY.Caption];
                this.ListDepartment= listDepartment;
            }
        });
  }

  eventOnSelectedFromDate(date) {
    if (date) {
        this.FromDate = moment(date).format(this.FormatDate);
    }
  }

  loadData = async (callback) => {
    const formatDate = this.FormatDate;
    const selectedFromDate = this.FromDate;
    if (!this.DepartmentLevelCode) {
        this.notification.alert(this.Lang.COMMON.Error,this.Lang.MYREPORT.EnterDepartmentLevelCode);
        return;
    }
    else if (!selectedFromDate || !moment(selectedFromDate, formatDate).isValid()) {
      this.notification.alert(this.Lang.COMMON.Error,this.Lang.MYREPORT.EnterDowCode);
      return;
    }
    const loading = await this.notification.showLoading();
    this.api.post(API_REPORT.Alias_GetDataThongKeHienCo, API_REPORT.GetDataThongKeHienCo,
        {
          Level: this.DepartmentLevelCode,
          FromDate: moment(this.FromDate,this.FormatDate).format(CommonConst.FormatSQLDate)
        })
        .subscribe((res) => {
            loading.dismiss();
            if (res && !res.IsError) {
              const colorArray = ReportConst.Color;
              const data = res.Data;
              const listWithTongHop = data.ListWithTongHop;
              const listWithGender = data.ListWithGender || [];
              const listWithHopDongLaoDong = this.CommonHandler.ConvertDataColor(data.ListWithHopDongLaoDong, colorArray);
              const listWithTrinhDoHocVan = data.ListWithTrinhDoHocVan || [];
              const listWithThamNien = this.CommonHandler.ConvertDataColor(data.ListWithThamNien, colorArray);
              this.ListWithTongHop= listWithTongHop;
              this.ListWithGender= listWithGender;
              this.ListWithHopDongLaoDong= listWithHopDongLaoDong;
              this.ListWithTrinhDoHocVan= listWithTrinhDoHocVan;
              this.ListWithThamNien= listWithThamNien;
            }
            if(callback){
              callback();
            }
        });
  };

  eventRead(){
    this.loadData(()=>{
      this.ListWithTongHopChart();
      this.ListWithGenderChart();
      this.ListWithHopDongLaoDongChart();
      this.ListWithTrinhDoHocVanChart();
      this.ListWithThamNienChart();
    });
  }
  ListWithTongHopChart() {
    if(this.ChartListWithTongHop)
    {
    this.ChartListWithTongHop.destroy();
    }
    this.heightCharTongHop = (this.ListWithTongHop.map(x => x.DepartmentName).length * 128 + 300) + 'px';
    const lable = this.ListWithTongHop ? this.ListWithTongHop.map(x => x.DepartmentName) : [];
    const SLNew =  this.ListWithTongHop ? this.ListWithTongHop.map(x => x.SLNew) : [];
    const SL =  this.ListWithTongHop ? this.ListWithTongHop.map(x => x.SL) : [];
    const SLOff =  this.ListWithTongHop ? this.ListWithTongHop.map(x => x.SLOff): [];
    const data = {
      labels:lable ,
      datasets: [{
        label: this.Lang.MYREPORT.NewRecruit,
        data: SLNew,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#68C182',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      },
      {
        data: SLOff,
        label:  this.Lang.MYREPORT.Leave,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#FAD55C',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      },
      {
        data: SL,
        label:  this.Lang.MYREPORT.Total,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#267DB3',
        borderWidth: 2,
        barThickness: 20,
        maxBarThickness: 20,
      }]
    };

    this.ChartListWithTongHop = new Chart(this.chartTongHop.nativeElement,{
      type: 'bar',
      data,
      plugins: [ChartDataLabels],
      options: {
        indexAxis: 'y',
        layout:{
          padding:{
            right:30
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            display:true,
          },

          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        },
        maintainAspectRatio: false,
        responsive:true,
        scales: {
          y: {
            ticks: {
              mirror: true,
              align:'center',
              labelOffset:50,
            },

          },

        }
      }
    });
  }

  ListWithGenderChart() {
    if(this.ChartListWithGender)
    {
    this.ChartListWithGender.destroy();
    }
    this.heightCharGender = (this.ListWithGender.map(x => x.DepartmentName).length * 128 + 300) + 'px';
    const lable = this.ListWithGender ? this.ListWithGender.map(x=>x.DepartmentName) : [];
    const Nam =  this.ListWithGender ? this.ListWithGender.map(x=>x.Nam) : [];
    const Nu =  this.ListWithGender ? this.ListWithGender.map(x=>x.Nu) : [];
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
      }]
    };
    this.ChartListWithGender = new Chart(this.chartGender.nativeElement, {
      type: 'bar',
      data,
      plugins: [ChartDataLabels],
      options: {
        indexAxis: 'y',
        layout:{
          padding:{
            right:30
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            display:true,
          },
          datalabels: {
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
              labelOffset:100
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

  ListWithHopDongLaoDongChart() {
    if(this.ChartListWithHopDongLaoDong)
    {
    this.ChartListWithHopDongLaoDong.destroy();
    }
    const ConTypeName = this.ListWithHopDongLaoDong ? this.ListWithHopDongLaoDong.map(x=>x.ConTypeName) : [];
    const Color =  this.ListWithHopDongLaoDong ? this.ListWithHopDongLaoDong.map(x=>x.Color) : [];
    const SL =  this.ListWithHopDongLaoDong ? this.ListWithHopDongLaoDong.map(x=>x.SL) : [];
    const data = {
      labels:ConTypeName,
      datasets: [{
        label: '', //this.Lang.MYREPORT.Male,
        data: SL,
        backgroundColor:Color
      }]
    };
    this.ChartListWithHopDongLaoDong = new Chart(this.chartHopDongLaoDong.nativeElement, {
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
            position: 'bottom',
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

  ListWithTrinhDoHocVanChart() {
    if(this.ChartListWithTrinhDoHocVan)
    {
    this.ChartListWithTrinhDoHocVan.destroy();
    }
    this.heightCharTrinhDoHocVan = (this.ListWithTrinhDoHocVan.map(x => x.DepartmentName).length * 128 + 300) + 'px';
    const lable = this.ListWithTrinhDoHocVan ? this.ListWithTrinhDoHocVan.map(x=>x.TrainLevelName) : [];
    const Nam =  this.ListWithTrinhDoHocVan ? this.ListWithTrinhDoHocVan.map(x=>x.Nam) : [];
    const Nu =  this.ListWithTrinhDoHocVan ? this.ListWithTrinhDoHocVan.map(x=>x.Nu) : [];
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
      }]
    };

    this.ChartListWithTrinhDoHocVan = new Chart(this.chartTrinhDoHocVan.nativeElement, {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        layout:{
          padding:{
            right:40
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            display:true,
          },
        },
        maintainAspectRatio: false,
        animation: {
          duration: 1,
          onComplete: ({ chart }) =>{
            const ctx = chart.ctx;
            chart.config.data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const data123 = dataset.data[index].toString();
                ctx.fillText(data123, bar.x + 10, bar.y);
              });
            });
          }
        },
        scales: {
          y: {
            ticks: {
              mirror: true,
              labelOffset:60,
            },
            beginAtZero:true,

          },
        },
      }
    });
  }


  ListWithThamNienChart() {
    if(this.ChartListWithThamNien)
    {
    this.ChartListWithThamNien.destroy();
    }
    const SeniorityName = this.ListWithThamNien ? this.ListWithThamNien.map(x=>x.SeniorityName) : [];
    const Color =  this.ListWithThamNien ? this.ListWithThamNien.map(x=>x.Color) : [];
    const SL =  this.ListWithThamNien ? this.ListWithThamNien.map(x=>x.SL) : [];
    const data = {
      labels:SeniorityName,
      datasets: [{
        label: '', //this.Lang.MYREPORT.Male,
        data: SL,
        backgroundColor:Color
      }]
    };
    this.ChartListWithThamNien = new Chart(this.chartThamNien.nativeElement, {
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
            position: 'bottom',
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


  eventOpenDetail(type){
    const params = {
        Alias: HrmAPIConst.REPORT.Alias_GetDataThongKeHienCo_getEmpDetail,
        Path: HrmAPIConst.REPORT.GetDataThongKeHienCo_getEmpDetail,
        Params: {
            Type: type
        },
        ListDepartment: this.ListDepartment,
        FromDate: this.FromDate,
        DepartmentLevelCode: this.DepartmentLevelCode,
        DepartmentLevelName: this.DepartmentLevelName,
        Fields: {
            infoLeft1: ReportConst.KEY.EmployeeName,
            infoLeft2: ReportConst.KEY.JobWName,
            infoLeft3: ReportConst.KEY.DepartmentName,
            infoLeft4: type === 4 ? ReportConst.KEY.SeniorityName : ReportConst.KEY.ConTypeName,
            infoLeft5: type === 4 ? null : ReportConst.KEY.TrainLevelName,
            infoRight1: ReportConst.KEY.JoinDate,
            hideInfoRight: true,
            styleRight1: {
                format: CommonConst.KEY.DateFormat,
                color: '#FB9D36',
            },
            iconLeft2: ReportConst.Icon.JobWoking,
            iconLeft3: ReportConst.Icon.Department,
            iconLeft4: type === 4 ? ReportConst.Icon.Seniority : ReportConst.Icon.Contract,
            iconLeft5: type === 4 ? null : ReportConst.Icon.Graduation,
        },
        KeyGroup: ReportConst.KEY.GroupDepartmentName,
        Title: this.Lang.MYREPORT.NowAvailableList
    };

    this.router.navigate([`NowAvailable/${KEY_SCENE.ReportDetail}`], {state:params});
  };

}

