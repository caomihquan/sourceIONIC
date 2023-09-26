/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { IPConfig } from 'src/IPConfig';
import { DomSanitizer } from '@angular/platform-browser';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import ReportConst from '../../../shared/constants/ReportConst';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import { Router } from '@angular/router';
import { ReportService } from '../services/Report.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import FormatHandler from '../../../shared/handlers/FormatHandler.js';
const API_REPORT = HrmAPIConst.REPORT;
@Component({
  selector: 'app-report-detail',
  templateUrl: './ReportDetail.component.html',
  styleUrls: ['./ReportDetail.component.scss'],
})
export class ReportDetailComponent implements OnInit {
  user: any;
  Lang;
  Alias = this.router.getCurrentNavigation()?.extras?.state?.Alias || null;
  Path = this.router.getCurrentNavigation()?.extras?.state?.Path || null;
  ListDepartment =this.router.getCurrentNavigation()?.extras?.state?.ListDepartment || null;
  ListDow = this.router.getCurrentNavigation()?.extras?.state?.ListDow || null;
  DepartmentLevelCode =this.router.getCurrentNavigation()?.extras?.state?.DepartmentLevelCode || null;
  DepartmentLevelName =this.router.getCurrentNavigation()?.extras?.state?.DepartmentLevelName || null;
  DowCode = this.router.getCurrentNavigation()?.extras?.state?.DowCode;
  FromDate = this.router.getCurrentNavigation()?.extras?.state?.FromDate;
  KeyGroup = this.router.getCurrentNavigation()?.extras?.state?.KeyGroup;
  KeyGroupChild = this.router.getCurrentNavigation()?.extras?.state?.KeyGroupChild;
  Title = this.router.getCurrentNavigation()?.extras?.state?.Title;
  PageIndex = 0;
  PageSize =  CommonConst.VALUE.PageSize;
  txtSearch = '';
  Params = this.router.getCurrentNavigation()?.extras?.state?.Params;
  FormatDate = CommonConst.FormatDate.toLocaleUpperCase();
  currentItems = 0;
  totalItems = 0;
  Fields = this.router.getCurrentNavigation()?.extras?.state?.Fields;
  Data = [];
  Loading : boolean = false;
  constructor(
    private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private report: ReportService,
    private languageService: LanguageService,
    public CommonHandler: CommonHandlerService,
  ) {
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() {
    this.getLanguage();
  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.loadData().subscribe();
  };

  format(data, style){
    if (data != null && style && style.format) {
        let fm;
        switch (style.format) {
            case CommonConst.KEY.DateFormat:
                fm = FormatHandler.formatDate(data,this.user);
                break;
            case CommonConst.KEY.DayString:
                fm = data + ' ' + this.Lang.COMMON.Day;
                break;
        }
        return fm;
    }
    else{
        return data;
    }
  }
  stringIfy(item){
    return '';
  }
  loadData(): Observable<any> {
    this.Loading = true;
    if (!this.Alias || !this.Path) {
      return of(null);
    }
    let params = {
      Level: this.DepartmentLevelCode,
      DowCode: this.DowCode || '',
      FromDate: this.FromDate
        ? moment(this.FromDate, this.FormatDate).format(
            CommonConst.FormatSQLDate
          )
        : null,
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      FilterText: this.txtSearch,
    };

    if (this.Params && Object.keys(this.Params).length > 0) {
      params = { ...params, ...this.Params };
    }

    return this.api.post(this.Alias, this.Path, params).pipe(map(result => {
      if (result && !result.IsError) {
        const data = result.Data;
        const currentData = data.Data;
        const outputParams = data[CommonConst.KEY.OutputParams] || {};
        const stateData = this.Data;
        const list = stateData && stateData.length > 0 ? stateData : [];
        if (currentData && currentData.length > 0) {
          if (!this.KeyGroupChild) {
            this.groupOneLevel(currentData, list, this.KeyGroup);
          } else {
            this.groupTwoLevel(
              currentData,
              list,
              this.KeyGroup,
              this.KeyGroupChild
            );
          }
        }
        this.Data = [...list] || [];
        this.totalItems = outputParams[CommonConst.KEY.TotalItems];
        this.currentItems += currentData.length;
        this.Loading = false;
      }
    }));
  }

  groupData(data, name) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item[ReportConst.KEY.GroupName] === name) {
        return item;
      }
    }
    return null;
  }

  groupChildData(data, groupName, groupChildName) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item[ReportConst.KEY.GroupName] === groupName) {
        for (let y = 0; y < item.Items.length; y++) {
          const itemChild = item.Items[y];
          if (itemChild[ReportConst.KEY.GroupChildName] === groupChildName) {
            return itemChild;
          }
        }
      }
    }
    return null;
  }

  groupOneLevel(data, result, keyGroup) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item[keyGroup]) {
        const name = (item[keyGroup] + '').toLocaleUpperCase();
        if (result.length === 0) {
          result.push({
            [ReportConst.KEY.GroupName]: name,
            Items: [item],
          });
        } else {
          const group = this.groupData(result, name);
          if (group && group.Items) {
            group.Items.push(item);
          } else {
            result.push({
              [ReportConst.KEY.GroupName]: name,
              Items: [item],
            });
          }
        }
      }
    }
    return result;
  }

  groupTwoLevel(data, result, keyGroup, keyGroupChild) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item[keyGroup]) {
        let childName = null;
        const Name = (item[keyGroup] + '').toLocaleUpperCase();
        const IsChildGroup = item[keyGroupChild] && keyGroupChild;
        if (IsChildGroup) {
          childName = (item[keyGroupChild] + '').toLocaleUpperCase();
        }
        if (result.length === 0) {
          result.push({
            [ReportConst.KEY.GroupName]: Name,
            Items: [
              {
                [ReportConst.KEY.GroupChildName]: childName,
                Items: [item],
              },
            ],
          });
        } else {
          const group = this.groupData(result, Name);
          if (group) {
            const groupChild = this.groupChildData(result, Name, childName);
            if (groupChild && groupChild.Items) {
              groupChild.Items.push(item);
            } else {
              group.Items.push({
                [ReportConst.KEY.GroupChildName]: childName,
                Items: [item],
              });
            }
          } else {
            result.push({
              [ReportConst.KEY.GroupName]: Name,
              Items: [
                {
                  [ReportConst.KEY.GroupChildName]: childName,
                  Items: [item],
                },
              ],
            });
          }
        }
      }
    }
    return result;
  }

  eventOnSelectedDepartment(item) {
    this.initOption();
    if (item && item[ReportConst.KEY.Value]) {
      this.DepartmentLevelCode = item[ReportConst.KEY.Value];
      this.DepartmentLevelName = item[ReportConst.KEY.Caption];
      const param = {
        DepartmentLevelCode: this.DepartmentLevelCode,
        DepartmentLevelName: this.DepartmentLevelName,
        DowCode: this.DowCode,
        FromDate: this.FromDate,
      };
      this.report.eventReloadData(param);
    }
  }

  eventOnSelectedDowCode(item) {
    this.initOption();
    if (item && item[ReportConst.KEY.DowCode]) {
      this.DowCode = item[ReportConst.KEY.DowCode];
      const param = {
        DepartmentLevelCode: this.DepartmentLevelCode,
        DepartmentLevelName: this.DepartmentLevelName,
        DowCode: this.DowCode,
        FromDate: this.FromDate,
      };
      this.report.eventReloadData(param);
    }
  }

  eventOnSelectedFromDate(date) {
    this.initOption();
    if (date) {
      this.FromDate = moment(date).format(this.FormatDate);
      const param = {
        DepartmentLevelCode: this.DepartmentLevelCode,
        DepartmentLevelName: this.DepartmentLevelName,
        DowCode: this.DowCode,
        FromDate: this.FromDate,
      };
      this.report.eventReloadData(param);
    }
  }

  initOption() {
    this.PageIndex = 0;
    this.PageSize = CommonConst.VALUE.PageSize;
    this.totalItems = 0;
    this.currentItems = 0;
    this.Data = [];
  }

  eventOnRead() {
    this.initOption();
    this.loadData().subscribe();
  }

  loadMore(event) {
    if (this.currentItems < this.totalItems) {
        this.PageIndex++;
        this.loadData().subscribe(res => {
          setTimeout(() => {
            event.target.complete();
          }, 1000);
        });
      }
      else{
        event.target.complete();
      }
  }
}
