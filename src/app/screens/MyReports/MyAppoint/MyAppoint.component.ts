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
  templateUrl: './MyAppoint.component.html',
  styleUrls: ['./MyAppoint.component.scss'],
})
export class MyAppointComponent implements OnInit {
  @ViewChild('chartBoNhiem') chartBoNhiem: ElementRef;
  @ViewChild('chartDieuDong') chartDieuDong: ElementRef;
  @ViewChild('chartKiemNhiem') chartKiemNhiem: ElementRef;
  @ViewChild('chartMienNhiem') chartMienNhiem: ElementRef;
  @ViewChild('chartThuyenChuyen') chartThuyenChuyen: ElementRef;
  @ViewChild('chartListTrongThang') chartListTrongThang: ElementRef;

  heightCharBoNhiem = '';
  heightCharDieuDong = '';
  heightCharKiemNhiem = '';
  heightCharMienNhiem = '';
  heightCharThuyenChuyen = '';
  heightTrongThang = '';

  BarChartBoNhiem;
  BarChartDieuDong;
  BarChartKiemNhiem;
  BarChartMienNhiem;
  BarChartThuyenChuyen;
  BarChartchartListTrongThang;



  user: any;
  CurrentMonth = moment().format('YYYY') + '/' + moment().format('MM');
  ListWithTrongThang = [];
  ListWithTrongNam;
  DowCode= null;
  DepartmentLevelCode= null;
  DepartmentLevelName= '';
  ListDow= [];
  ListDepartment= [];
  Lang;
  FunctionInfo;


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

    this.api.post(API_REPORT.Alias_GetDataThongKeBoNhiem, API_REPORT.GetDataThongKeBoNhiem,
        {
            Level: this.DepartmentLevelCode,
            DowCode: this.DowCode,
        })
        .subscribe((res) => {
            loading.dismiss();
            if (res && !res.IsError) {
                const data = res.Data;
                const listWithTrongThang = this.CommonHandler.ConvertDataGroupGender(data.ListWithTrongThang, ReportConst.KEY.DepartmentName, ReportConst.KEY.Gender);
                const listWithTrongNamBoNhiem = data.ListWithTrongNamBoNhiem || [];
                const listWithTrongNamDieuDong = data.ListWithTrongNamDieuDong || [];
                const listWithTrongNamThuyenChuyen = data.ListWithTrongNamThuyenChuyen || [];
                const listWithTrongNamMienNhiem = data.ListWithTrongNamMienNhiem || [];
                const listWithTrongNamKiemNhiem = data.ListWithTrongNamKiemNhiem || [];
                this.ListWithTrongThang= data.ListWithTrongThang;
                this.ListWithTrongNam= {
                    [ReportConst.KEY.BoNhiem]: listWithTrongNamBoNhiem,
                    [ReportConst.KEY.DieuDong]: listWithTrongNamDieuDong,
                    [ReportConst.KEY.ThuyenChuyen]: listWithTrongNamThuyenChuyen,
                    [ReportConst.KEY.MienNhiem]: listWithTrongNamMienNhiem,
                    [ReportConst.KEY.KiemNhiem]: listWithTrongNamKiemNhiem,
                };
                if(callback){
                  callback();
                }
            }
        });
  };

  eventRead(){
    this.loadData(()=>{
      this.ListTrongThangChart();
      this.ListBoNhiemChart();
      this.ListDieuDongChart();
      this.ListKiemNhiemChart();
      this.ListMienNhiemChart();
      this.ListThuyenChuyenChart();
    });
  }
  ObjectIsEmpty(obj){
    return JSON.stringify(obj) === '{}';
  }

  ListBoNhiemChart() {
    if(this.BarChartBoNhiem)
    {
      this.BarChartBoNhiem.destroy();
    }
    this.heightCharBoNhiem = (12 * 24 + 300) + 'px';
    const YYYYMM = this.ListWithTrongNam ? [...new Set(this.ListWithTrongNam.BoNhiem.map(x => x.YYYYMM))].reverse() : [];
    //
    const DepartmentName = this.ListWithTrongNam ? this.ListWithTrongNam.BoNhiem.map(x => x.DepartmentName).filter((value, index, array) => array.indexOf(value) === index).reverse() : [];
    const datasetLabel = DepartmentName.map((x,i) =>({
      label: x,
      data: this.ListWithTrongNam.BoNhiem.filter(z => x === z.DepartmentName).map(y => y.SL).reverse(),
      backgroundColor: this.ColorPieChart[i],
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
    }));
    const data = {labels:YYYYMM,datasets:datasetLabel};
    this.BarChartBoNhiem = new Chart(this.chartBoNhiem.nativeElement,{
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
            formatter:value => value > 0 ? value : '',
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
          },
        }
      }
    });
  }
  ListDieuDongChart() {
    if(this.BarChartDieuDong)
    {
      this.BarChartDieuDong.destroy();
    }
    this.heightCharDieuDong = (12 * 24 + 300) + 'px';
    const YYYYMM = this.ListWithTrongNam ? [...new Set(this.ListWithTrongNam.DieuDong.map(x => x.YYYYMM))].reverse() : [];
    //
    const DepartmentName = this.ListWithTrongNam ? this.ListWithTrongNam.DieuDong.map(x => x.DepartmentName).filter((value, index, array) => array.indexOf(value) === index).reverse() : [];
    const datasetLabel = DepartmentName.map((x,i) =>({
      label: x,
      data: this.ListWithTrongNam.DieuDong.filter(z => x === z.DepartmentName).map(y => y.SL).reverse(),
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: this.ColorPieChart[i],
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
    }));

    const data = {labels:YYYYMM,datasets:datasetLabel};
    this.BarChartDieuDong = new Chart(this.chartDieuDong.nativeElement,{
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
            formatter:value => value > 0 ? value : '',
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
          },
        }
      }
    });
  }
  ListKiemNhiemChart() {
    if(this.BarChartKiemNhiem)
    {
      this.BarChartKiemNhiem.destroy();
    }
    this.heightCharKiemNhiem = (12 * 24 + 300) + 'px';
    const YYYYMM = this.ListWithTrongNam ? [...new Set(this.ListWithTrongNam.KiemNhiem.map(x => x.YYYYMM))].reverse() : [];
    //
    const DepartmentName = this.ListWithTrongNam ? this.ListWithTrongNam.KiemNhiem.map(x => x.DepartmentName).filter((value, index, array) => array.indexOf(value) === index).reverse() : [];
    const datasetLabel = DepartmentName.map((x,i) =>({
      label: x,
      data: this.ListWithTrongNam.KiemNhiem.filter(z => x === z.DepartmentName).map(y => y.SL).reverse(),
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: this.ColorPieChart[i],
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
    }));

    const data = {labels:YYYYMM,datasets:datasetLabel};
    this.BarChartKiemNhiem = new Chart(this.chartKiemNhiem.nativeElement,{
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
            formatter:value => value > 0 ? value : '',
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
          },
        }
      }
    });
  }

  ListMienNhiemChart() {
    if(this.BarChartMienNhiem)
    {
      this.BarChartMienNhiem.destroy();
    }
    this.heightCharMienNhiem = (12 * 24 + 300) + 'px';
    const YYYYMM = this.ListWithTrongNam ? [...new Set(this.ListWithTrongNam.MienNhiem.map(x => x.YYYYMM))].reverse() : [];
    //
    const DepartmentName = this.ListWithTrongNam ? this.ListWithTrongNam.MienNhiem.map(x => x.DepartmentName).filter((value, index, array) => array.indexOf(value) === index).reverse() : [];

    const datasetLabel = DepartmentName.map((x,i) =>({
      label: x,
      data: this.ListWithTrongNam.MienNhiem.filter(z => x === z.DepartmentName).map(y => y.SL).reverse(),
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor:this.ColorPieChart[i],
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
    }));

    const data = {labels:YYYYMM,datasets:datasetLabel};
    this.BarChartMienNhiem = new Chart(this.chartMienNhiem.nativeElement,{
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
            formatter:value => value > 0 ? value : '',
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
          },
        }
      }
    });
  }
  ListThuyenChuyenChart() {
    if(this.BarChartThuyenChuyen)
    {
      this.BarChartThuyenChuyen.destroy();
    }
    this.heightCharThuyenChuyen = (12 * 24 + 300) + 'px';
    const YYYYMM = this.ListWithTrongNam ? [...new Set(this.ListWithTrongNam.ThuyenChuyen.map(x => x.YYYYMM))].reverse() : [];
    //
    const DepartmentName = this.ListWithTrongNam ? this.ListWithTrongNam.ThuyenChuyen.map(x => x.DepartmentName).filter((value, index, array) => array.indexOf(value) === index).reverse() : [];

    const datasetLabel = DepartmentName.map((x,i) =>({
      label: x,
      data: this.ListWithTrongNam.ThuyenChuyen.filter(z => x === z.DepartmentName).map(y => y.SL).reverse(),
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor:this.ColorPieChart[i],
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
    }));

    const data = {labels:YYYYMM,datasets:datasetLabel};
    this.BarChartThuyenChuyen = new Chart(this.chartThuyenChuyen.nativeElement,{
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
            formatter:value => value > 0 ? value : '',
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
          },
        }
      }
    });
  }

  eventOpenDetail(type) {
    if (type !== -1) {
        const rs = ReportConst.KEY.Appoint.indexOf(type);
        type = rs > -1 ? rs + 1 : rs;
    }
    const params = {
        Alias: API_REPORT.Alias_GetDataThongKeBoNhiem_getEmpDetail,
        Path: API_REPORT.GetDataThongKeBoNhiem_getEmpDetail,
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
            infoLeft2: ReportConst.KEY.JobWNameOld,
            infoLeft3: ReportConst.KEY.DepartmentNameOld,
            infoLeft4: ReportConst.KEY.JobWNameNew,
            infoLeft5: ReportConst.KEY.DepartmentNameNew,
            infoLeft6: ReportConst.KEY.FromToTime,
            hideInfoRight: true,
            styleRight1: {
                format: CommonConst.KEY.DateFormat,
                color:'#FB9D36',
            },
            iconLeft2: ReportConst.Icon.JobWokingOld,
            iconLeft3: ReportConst.Icon.DepartmentOld,
            iconLeft4: ReportConst.Icon.JobWoking,
            iconLeft5: ReportConst.Icon.Department,
            iconLeft6: ReportConst.Icon.Calendar,
        },
        KeyGroup: ReportConst.KEY.GroupDepartmentName,
        KeyGroupChild: type === -1 ? ReportConst.KEY.AppointName : null,
        Title: this.Lang.MYREPORT.AppointList
    };
    this.router.navigate([`Appoint/${KEY_SCENE.ReportDetail}`], {state:params});
  }
  ListTrongThangChart() {
    if(this.BarChartchartListTrongThang)
    {
      this.BarChartchartListTrongThang.destroy();
    }
    this.heightTrongThang = this.ListWithTrongThang ? [...new Set(this.ListWithTrongThang.map(x => x.DepartmentName))].length * 128 + 400 + 'px' : '400px';
    const Department = this.ListWithTrongThang ? [...new Set(this.ListWithTrongThang.map(x => x.DepartmentName))] : [];
    const dataset = [
      {
        label: this.Lang.MYREPORT.BoNhiem,
        backgroundColor:'#267DB3',
        stack:this.Lang.MYREPORT.Male,

        borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data: this.ListWithTrongThang.filter(x => x.GT === '0').map(x => x.BoNhiem)
      },
      {
        label: this.Lang.MYREPORT.BoNhiem,
        backgroundColor:'#267DB3',
        stack:this.Lang.MYREPORT.Female,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data: this.ListWithTrongThang.filter(x => x.GT === '1').map(x => x.BoNhiem)
      },///////Bộ nhiệm
      {
        label: this.Lang.MYREPORT.DieuDong,
        backgroundColor:'#68C182',
        stack:this.Lang.MYREPORT.Male,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data:this.ListWithTrongThang.filter(x => x.GT === '0').map(x => x.DieuDong)
      },
      {
        label: this.Lang.MYREPORT.DieuDong,
        backgroundColor:'#68C182',
        stack:this.Lang.MYREPORT.Female,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data:this.ListWithTrongThang.filter(x => x.GT === '1').map(x => x.DieuDong)
      },
      {
        label: this.Lang.MYREPORT.KiemNhiem,
        stack:this.Lang.MYREPORT.Male,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        backgroundColor:'#FAD55C',
        data:this.ListWithTrongThang.filter(x => x.GT === '0').map(x => x.KiemNhiem)
      },
      {
        label: this.Lang.MYREPORT.KiemNhiem,
        stack:this.Lang.MYREPORT.Female,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        backgroundColor:'#FAD55C',
        data:this.ListWithTrongThang.filter(x => x.GT === '1').map(x => x.KiemNhiem)
      },
      {
        label: this.Lang.MYREPORT.MienNhiem,
        backgroundColor:'#ED6647',
        stack:this.Lang.MYREPORT.Male,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data:this.ListWithTrongThang.filter(x => x.GT === '0').map(x => x.MienNhiem)
      },
      {
        label: this.Lang.MYREPORT.MienNhiem,
        backgroundColor:'#ED6647',
        stack:this.Lang.MYREPORT.Female,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data:this.ListWithTrongThang.filter(x => x.GT === '1').map(x => x.MienNhiem)
      },
      {
        label: this.Lang.MYREPORT.ThuyenChuyen,
        backgroundColor:'#8561C8',
        stack:this.Lang.MYREPORT.Male,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data:this.ListWithTrongThang.filter(x => x.GT === '0').map(x => x.ThuyenChuyen)
      },
      {
        label: this.Lang.MYREPORT.ThuyenChuyen,
        backgroundColor:'#8561C8',
        stack:this.Lang.MYREPORT.Female,

       borderColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      barThickness: 50,
      maxBarThickness: 20,
        data:this.ListWithTrongThang.filter(x => x.GT === '1').map(x => x.ThuyenChuyen)
      }
    ];
    const data = {
      labels:Department,
      datasets:dataset
    };

    this.BarChartchartListTrongThang = new Chart(this.chartListTrongThang.nativeElement, {
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
            display:false,
          }
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              mirror: true,
            },
            stacked:true,
          },
          x: {
            stacked: true,
          },
        },
        animation: {
          onComplete: ({ chart }) =>{
            const ctx = chart.ctx;
            ctx.fillStyle = 'black';
            ctx.textAlign = 'end';
            chart.config.data.datasets.forEach((datasett, i) => {
              const meta = chart.getDatasetMeta(i);
              const stackLabel = datasett.stack;
              meta.data.forEach((bar) => {
                if (i === chart.config.data.datasets.length - 2 || (i === chart.config.data.datasets.length - 1 && chart.config.data.datasets[i - 1].stack !== datasett.stack)) {
                  ctx.fillText(stackLabel,chart.width - 5, bar.y+5);
                }
              });
            });
          }
        }
      }
    });
  }
}

