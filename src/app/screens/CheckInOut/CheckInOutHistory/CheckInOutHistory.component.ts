/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import HrmStorage from 'src/libs/core/HrmStorage.js';

@Component({
  selector: 'app-checkinout-history',
  templateUrl: './CheckInOutHistory.component.html',
  styleUrls: ['./CheckInOutHistory.component.scss'],
})
export class CheckInOutHistoryComponent implements OnInit {
  // eslint-disable-next-line max-len
  CurrentMonth = (new Date().getFullYear()).toString() + '/' + ((new Date().getMonth() + 1) < 10 ? '0'+(new Date().getMonth() + 1).toString():(new Date().getMonth() + 1).toString());
  DowCodeSelection = {};
  lstDows =[];
  Lang: any;
  user: any;
  dataHistory: any[];
  checkInOutHistory: any;
  visibleModal = false;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,private languageService: LanguageService) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());

  }

  ngOnInit() {
    this.getDowCode();
    this.getLanguage();
  }


  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
  };
  getDowCode() {
    const me = this;
    me.api.post(HrmAPIConst.CHECKINOUT.Alias_GetPayrollDow, HrmAPIConst.CHECKINOUT.GetPayrollDow)
        .subscribe((res) => {

            if (!res.Error && res.Data && res.Data.length > 0) {
                const filter = res.Data.filter(item => item.DowCode === me.CurrentMonth);
                if (filter.length > 0) {
                    me.DowCodeSelection= filter[0];
                }
                else {
                    me.DowCodeSelection=res.Data[0];
                }
            }
            me.lstDows = res.Data;
            this.LoadDataHistory();
        });
  }

  LoadDataHistory() {
    const me = this;
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_GetFromToDateFnScanCode, HrmAPIConst.CHECKINOUT.GetFromToDateFnScanCode,
      {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        DowCode: me.DowCodeSelection['DowCode']
      }).subscribe((res) => {
        debugger
            const lstDate = res.Data ? res.Data : [];
            const data = [];
            const typeBackGround = {
              backgroundIsWeekend: '#F79830',
              backgroundIsDayOff: '#2A9FDA',
              backgroundWork: '#7DBC42',
              backgroundEmpty: '#C2C2C2',
            };
            const dayNameOfWeeks = this.Lang?.CHECKINOUT?.DayNameOfWeeks;
            for (let i = 0; i < lstDate.length; i++) {
                const day = lstDate[i].DayDowCode;
                const d = lstDate[i].NameOfWeek;
                const Workdate = lstDate[i].WorkDate;

                const dateNumber = day;
                const hournum = (lstDate[i].HourNum) ? lstDate[i].HourNum.toString() : '0';
                const perCent = (lstDate[i].Percents) ? lstDate[i].Percents : 0;
                const deScription = (lstDate[i].IsWeekend) || (lstDate[i].IsDayOff)
                    ? (this.auth.getLanguage().toLowerCase() === 'en' ?  lstDate[i].mTitle2 : lstDate[i].mTitle) : (this.auth.getLanguage().toLowerCase() === 'en' ?  lstDate[i].mTitle2 : lstDate[i].mTitle) + ': ' + perCent.toString() + '% - ' + hournum.toString() + (this.auth.getLanguage().toLowerCase() === 'en' ? 'Hrs' : ' giờ');
                data.push({
                    DateNumber: dateNumber > 9 ? dateNumber : '0' + dateNumber,
                    //DateName: dayNameOfWeeks[d.getDay()],
                    DateName: dayNameOfWeeks[d],
                    BeginTime: lstDate[i].In,
                    EndTime: lstDate[i].Out,

                    percent: perCent,
                    backgroundColor: typeBackGround[lstDate[i].mBackgroundColor],
                    backgroundColorEmpty: typeBackGround[lstDate[i].mBackgroundColorEmpty],
                    type: i, //types[i % 3].key,

                    description: deScription,
                    lineColor: (hournum >= 9) ? 'green' : '',
                    IsWeekend: (lstDate[i].IsWeekend) ? true : false,
                    IsDayOff: (lstDate[i].IsDayOff) ? true : false,
                    WorkDate: Workdate
                });
            }
            me.dataHistory = data;
        });
}

  eventSelectedMonth(item) {
    this.DowCodeSelection = item;
    this.LoadDataHistory();
  }


  onEventPress(data){
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_GetHistoryCheckInOutInDay, HrmAPIConst.CHECKINOUT.GetHistoryCheckInOutInDay,
    {
        WorkDate: data.WorkDate
    }).subscribe((res) => {
        if (res.Data && res.Data[0]) {
            this.setOpenModal(true);
            this.checkInOutHistory = res.Data;
        }
    });
  }

  setOpenModal(isOpen: boolean) {
    this.visibleModal = isOpen;
  }
}
