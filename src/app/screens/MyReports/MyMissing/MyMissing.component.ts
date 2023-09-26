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
import  FormatHandler from '../../../shared/handlers/FormatHandler.js';
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
  selector: 'app-my-missing',
  templateUrl: './MyMissing.component.html',
  styleUrls: ['./MyMissing.component.scss'],
})
export class MyMissingComponent implements OnInit {
  @ViewChild('chartTrongNgay') chartTrongNgay: ElementRef;
  @ViewChild('chartTrongNgayLoaiCong') chartTrongNgayLoaiCong: ElementRef;
  @ViewChild('chartTrongNgayCongTac') chartTrongNgayCongTac: ElementRef;
  @ViewChild('chartTrongThang') chartTrongThang: ElementRef;
  @ViewChild('chartTrongThangLoaiCong') chartTrongThangLoaiCong: ElementRef;
  @ViewChild('chartTrongThangCongTac') chartTrongThangCongTac: ElementRef;

  user: any;
  Lang;

  ChartListWithTrongNgay: any;
  ChartListWithTrongNgayLoaiCong: any;
  ChartListWithTrongNgayCongTac: any;
  ChartListWithTrongThang: any;
  ChartListWithTrongThangLoaiCong: any;
  ChartListWithTrongThangCongTac: any;

  FromDate;
  DepartmentLevelCode = null;
  DepartmentLevelName = '';
  ListDepartment = [];
  IsVisibleYear = false;
  IsVisibleDepartment = false;
  IsModalLoading = false;

  ListWithTrongNgay = [];
  ListWithTrongNgayLoaiCong = [];
  ListWithTrongNgayCongTac = [];
  ListWithTrongThang = [];
  ListWithTrongThangLoaiCong = [];
  ListWithTrongThangCongTac = [];
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  FunctionInfo;
  heightCharTrongThang = '';
  heightCharTrongNgay = '';


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
    this.FromDate = FormatHandler.formatDate(new Date(), this.user);
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
    this.api.post(API_REPORT.Alias_GetDataThongKeVangMat, API_REPORT.GetDataThongKeVangMat,
        {
            Level: this.DepartmentLevelCode,
            FromDate: moment(this.FromDate,this.FormatDate).format(CommonConst.FormatSQLDate),
        })
        .subscribe((res) => {
            loading.dismiss();
            if (res && !res.IsError) {
                const colorArray = ReportConst.Color;
                const data = res.Data;
                const listWithTrongNgay = data.ListWithTrongNgay || [];
                const listWithTrongNgayLoaiCong = this.CommonHandler.ConvertDataColor(data.ListWithTrongNgayLoaiCong, colorArray);
                const listWithTrongNgayCongTac = this.CommonHandler.ConvertDataColor(data.ListWithTrongNgayCongTac, colorArray);
                const listWithTrongThang = data.ListWithTrongThang || [];
                const listWithTrongThangLoaiCong = this.CommonHandler.ConvertDataColor(data.ListWithTrongThangLoaiCong, colorArray);
                const listWithTrongThangCongTac = this.CommonHandler.ConvertDataColor(data.ListWithTrongThangCongTac, colorArray);
                this.ListWithTrongNgay=listWithTrongNgay;
                this.ListWithTrongNgayLoaiCong=listWithTrongNgayLoaiCong;
                this.ListWithTrongNgayCongTac=listWithTrongNgayCongTac;
                this.ListWithTrongThang=listWithTrongThang;
                this.ListWithTrongThangLoaiCong=listWithTrongThangLoaiCong;
                this.ListWithTrongThangCongTac=listWithTrongThangCongTac;
            }
            if(callback){
              callback();
            }
        });
  };

  eventRead(){
    this.loadData(()=>{
      this.fnChartListWithTrongNgay();
      this.fnChartListWithTrongNgayLoaiCong();
      this.fnChartListWithTrongNgayCongTac();
      this.fnChartListWithTrongThang();
      this.fnChartListWithTrongThangLoaiCong();
      this.fnChartListWithTrongThangCongTac();
    });
  }
  eventOpenDetail(type){
    const params = {
      Alias: API_REPORT.Alias_GetDataThongKeVangMat_getEmpDetail,
      Path: API_REPORT.GetDataThongKeVangMat_getEmpDetail,
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
          infoLeft4: ReportConst.KEY.LeavePeriod,
          infoLeft5: ReportConst.KEY.FromToTime,
          infoRight1: ReportConst.KEY.DayNum,
          hideInfoRight: true,
          styleRight1: {
              format: CommonConst.KEY.DayString,
              color: '#FB9D36',
          },
          iconLeft2: ReportConst.Icon.JobWoking,
          iconLeft3: ReportConst.Icon.Department,
          iconLeft4: ReportConst.Icon.Time,
          iconLeft5: ReportConst.Icon.Calendar,
      },
      KeyGroup: ReportConst.KEY.GroupDepartmentName,
      Title: this.Lang.MYREPORT.MissingList
    };
    this.router.navigate([`Missing/${KEY_SCENE.ReportDetail}`], {state:params});
  };

  fnChartListWithTrongNgay() {
    if(this.ChartListWithTrongNgay)
    {
    this.ChartListWithTrongNgay.destroy();
    }
    this.heightCharTrongNgay = (this.ListWithTrongNgay.map(x => x.DepartmentName).length * 256 + 300) + 'px';
    const lable = this.ListWithTrongNgay ? this.ListWithTrongNgay.map(x=>x.DepartmentName) : [];
    const Nam =  this.ListWithTrongNgay ? this.ListWithTrongNgay.map(x=>x.Nam) : [];
    const Nu =  this.ListWithTrongNgay ? this.ListWithTrongNgay.map(x=>x.Nu) : [];
    const SL =  this.ListWithTrongNgay ? this.ListWithTrongNgay.map(x=>x.SL) : [];
    const data = {
      labels:lable,
      datasets: [
      {
        label: this.Lang.MYREPORT.Total,
        data: SL,
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
        label: this.Lang.MYREPORT.Male,
        data: Nam,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#FAD55C',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      }
      ]
    };
    this.ChartListWithTrongNgay = new Chart(this.chartTrongNgay.nativeElement, {
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
        scales: {
          y: {
            ticks: {
              mirror: true,
              align:'start',
              labelOffset:70
            },
          },

        }
      }
    });
  }
  fnChartListWithTrongThang() {
    if(this.ChartListWithTrongThang)
    {
    this.ChartListWithTrongThang.destroy();
    }
    this.heightCharTrongThang = (this.ListWithTrongThang.map(x => x.DepartmentName).length * 256 + 300) + 'px';
    const lable = this.ListWithTrongThang ? this.ListWithTrongThang.map(x=>x.DepartmentName) : [];
    const Nam =  this.ListWithTrongThang ? this.ListWithTrongThang.map(x=>x.Nam) : [];
    const Nu =  this.ListWithTrongThang ? this.ListWithTrongThang.map(x=>x.Nu) : [];
    const SL =  this.ListWithTrongThang ? this.ListWithTrongThang.map(x=>x.SL) : [];
    const data = {
      labels:lable,
      datasets: [
      {
        label: this.Lang.MYREPORT.Total,
        data: SL,
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
        label: this.Lang.MYREPORT.Male,
        data: Nam,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: '#FAD55C',
        borderWidth: 2,
        barThickness: 50,
        maxBarThickness: 20,
      }
      ]
    };
    this.ChartListWithTrongThang = new Chart(this.chartTrongThang.nativeElement, {
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
        scales: {
          y: {
            ticks: {
              mirror: true,
              align:'start',
              labelOffset:70
            },
          },

        }
      }
    });
  }


  fnChartListWithTrongNgayLoaiCong() {

    if(this.ChartListWithTrongNgayLoaiCong)
    {
    this.ChartListWithTrongNgayLoaiCong.destroy();
    }
    const KowName = this.ListWithTrongNgayLoaiCong ? this.ListWithTrongNgayLoaiCong.map(x=>x.KowName) : [];
    const Color =  this.ListWithTrongNgayLoaiCong ? this.ListWithTrongNgayLoaiCong.map(x=>x.Color) : [];
    const SL =  this.ListWithTrongNgayLoaiCong ? this.ListWithTrongNgayLoaiCong.map(x=>x.SL) : [];
    const data = {
      labels:KowName,
      datasets: [{
        label:'',
        data: SL,
        backgroundColor:Color,
        borderWidth: [0]
      }]
    };
    this.ChartListWithTrongNgayLoaiCong = new Chart(this.chartTrongNgayLoaiCong.nativeElement, {
      type: 'pie',
      data,
      plugins: [ChartDataLabels],
      options: {
        layout:{
          padding:{
            top:40
          }
        },
        maintainAspectRatio: false,
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
       },

      }
    }
    );
  }
  fnChartListWithTrongThangLoaiCong() {

    if(this.ChartListWithTrongThangLoaiCong)
    {
    this.ChartListWithTrongThangLoaiCong.destroy();
    }
    const KowName = this.ListWithTrongThangLoaiCong ? this.ListWithTrongThangLoaiCong.map(x=>x.KowName) : [];
    const Color =  this.ListWithTrongThangLoaiCong ? this.ListWithTrongThangLoaiCong.map(x=>x.Color) : [];
    const SL =  this.ListWithTrongThangLoaiCong ? this.ListWithTrongThangLoaiCong.map(x=>x.SL) : [];
    const data = {
      labels:KowName,
      datasets: [{
        label:'',
        data: SL,
        backgroundColor:Color,
        borderWidth: [0]
      }]
    };
    this.ChartListWithTrongThangLoaiCong = new Chart(this.chartTrongThangLoaiCong.nativeElement, {
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
       },

      }
    }
    );
  }

  fnChartListWithTrongNgayCongTac() {
    if(this.ChartListWithTrongNgayCongTac)
    {
    this.ChartListWithTrongNgayCongTac.destroy();
    }
    const KowName = this.ListWithTrongNgayCongTac ? this.ListWithTrongNgayCongTac.map(x=>x.KowName) : [];
    const Color =  this.ListWithTrongNgayCongTac ? this.ListWithTrongNgayCongTac.map(x=>x.Color) : [];
    const SL =  this.ListWithTrongNgayCongTac ? this.ListWithTrongNgayCongTac.map(x=>x.SL) : [];
    const data = {
      labels:KowName,
      datasets: [{
        label:'',
        data: SL,
        backgroundColor:Color,
        borderWidth: [0]
      }]
    };
    this.ChartListWithTrongNgayCongTac = new Chart(this.chartTrongNgayCongTac.nativeElement, {
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
  fnChartListWithTrongThangCongTac() {
    if(this.ChartListWithTrongThangCongTac)
    {
    this.ChartListWithTrongThangCongTac.destroy();
    }
    const KowName = this.ListWithTrongThangCongTac ? this.ListWithTrongThangCongTac.map(x=>x.KowName) : [];
    const Color =  this.ListWithTrongThangCongTac ? this.ListWithTrongThangCongTac.map(x=>x.Color) : [];
    const SL =  this.ListWithTrongThangCongTac ? this.ListWithTrongThangCongTac.map(x=>x.SL) : [];
    const data = {
      labels:KowName,
      datasets: [{
        label:'',
        data: SL,
        backgroundColor:Color,
        borderWidth: [0]
      }]
    };
    this.ChartListWithTrongThangCongTac = new Chart(this.chartTrongThangCongTac.nativeElement, {
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

}

