import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CalendarMode, IWeekViewDateRow, Step } from 'ionic2-calendar/calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { Event2, eventCard } from '../../models/calendar.model';
import { ModalController } from '@ionic/angular';

import { format, isThisSecond } from 'date-fns';
import { ApiHttpService, AuthStore } from '../../services';
import { BlockLunarDate, Lunar } from 'lunar-calendar-ts-vi';
import { InputDateModalComponent } from './modals/input-date-modal/input-date-modal.component';
import { DateEventModalComponent } from './modals/date-event-modal/date-event-modal.component';

@Component({
  selector: 'hrm-calendar',
  templateUrl: './hrm-calendar.component.html',
  styleUrls: ['./hrm-calendar.component.scss'],
})
export class HrmCalendarComponent implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @Input() calendarID: string = 'STD';
  @Input() eventTemplate: TemplateRef<any>;
  @Input() noteTemplate: TemplateRef<any>;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() DowCode: EventEmitter<any> = new EventEmitter();
  @Input() templateCalendar : TemplateRef<any>;
  @ViewChild('popover') popover;
  isOpen = false;
  mode: string = "month" as CalendarMode;
  lunarDate: any;
  lunarDateStr!: BlockLunarDate;
  eventCards: eventCard[] = [];
  eventByDate: Event2[] = [];
  inputDate: string = "";
  viewTitle: string;
  selectedDate: any;
  calendar = {
    mode: "month",
    step: 30 as Step,
    currentDate: new Date(),
    formatDate: {
      formatWeekViewDayHeader: function (date: Date) {
        return 'd';
      },
    },
    locale:this.auth.getLanguage() === 'en' ? "en" : 'vi'
  };

  eventSource = [
    { title: 'event1', lunarDate: new Date("2022/10/11 10:00:00"), startTime: new Date("2022/10/11 10:00:00"), endTime: new Date("2022/10/11 13:00:00"), allDay: true, colorCode: "#5494E6" },
  ];
  constructor(private modalCtrl: ModalController, private api: ApiHttpService,private auth: AuthStore,
    @Inject(LOCALE_ID) private locale: string,) {

  }

  ngOnInit() {

  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  onTimeSelected = (ev: { selectedTime: Date, events: any[], disabled: boolean }) => {
    this.eventByDate = []
    this.eventCards = []
    this.eventByDate = ev.events;
    for (var i = 0; i < this.eventByDate.length; i++) {
      let exist = false;
      for (var j = 0; j < this.eventCards.length; j++) {
        if (this.eventByDate[i].startTime.getHours() == this.eventCards[j].key) {
          exist = true;
          this.eventCards[j].list.push(this.eventByDate[i])
          break;
        }
      }
      if (exist == false)
        this.eventCards.push(new eventCard(this.eventByDate[i].startTime.getHours(), [this.eventByDate[i]]));
    }
    this.selectedDate = ev.selectedTime;
    const lunar: Lunar = new Lunar();
    let blockLunar = lunar.getBlockLunarDate(ev.selectedTime);
    this.lunarDate = "AL: " + blockLunar.lunarDate + "/" + blockLunar.lunarMonth + "/" + blockLunar.lunarYear;
    this.valueChange.emit({
      mode: this.mode,
      currentDate: this.selectedDate
    })
  }

  changeTitle(item) {
    const date = new Date(this.myCal['currentDate']) || new Date();
    const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
    const year = date.getFullYear();
    this.DowCode.emit(`${year}/${month}`)
    this.viewTitle = `${year}/${month}`;
  }

  submitDate() {
    if (this.inputDate == "") this.calendar.currentDate = new Date()
    else this.calendar.currentDate = new Date(this.inputDate)
  }

  getHightlightClass(date: IWeekViewDateRow) {
    let className = '';
    if (date.selected) {
      if (className) {
        className += ' ';
      }
      className += 'weekView-selected';
    }
    return className;
  }

  getEvent() {
    this.eventByDate = [];
    this.eventCards = [];
    this.eventSource.forEach(e => {
      if (this.dayCompare(e, this.selectedDate)) {
        this.eventByDate.push(
          new Event2(e.title, e.startTime, e.endTime, true, e.colorCode))
      }
    });
    for (var i = 0; i < this.eventByDate.length; i++) {
      let exist = false;
      for (var j = 0; j < this.eventCards.length; j++) {
        if (this.eventByDate[i].startTime.getHours() == this.eventCards[j].key) {
          exist = true;
          this.eventCards[j].list.push(this.eventByDate[i])
          break;
        }
      }
      if (exist == false)
        this.eventCards.push(new eventCard(this.eventByDate[i].startTime.getHours(), [this.eventByDate[i]]));
    }
    this.openDateEventModal(this.eventCards, this.selectedDate);
  }

  async openInputDateModal() {
    const modal = await this.modalCtrl.create({
      component: InputDateModalComponent,
    });
    modal.present();
    const { data, role} = await modal.onWillDismiss();
    if (role === 'confirm' && data != null) {
      this.inputDate = `${data.EndDay}`
      this.submitDate()
    }
    if (role === 'confirm' && data == null) {
      this.inputDate = ""
      this.submitDate()
    }

  }

  async openDateEventModal(eventCards: any[], date: any) {
    const modal = await this.modalCtrl.create({
      component: DateEventModalComponent,
      componentProps: {
        eventCards: eventCards,
        date: new Date(format(this.selectedDate, 'yyyy-MM-dd'))
      }
    });
    modal.present();
  }

  onTimeSelectWeekmode(day: Date) {
    this.eventByDate = [];
    this.eventCards = [];
    this.eventSource.forEach(e => {
      if (this.dayCompare(e, day)) {
        this.eventByDate.push(
          new Event2(e.title, e.startTime, e.endTime, true, e.colorCode))
      }
    });
    for (var i = 0; i < this.eventByDate.length; i++) {
      let exist = false;
      for (var j = 0; j < this.eventCards.length; j++) {
        if (this.eventByDate[i].startTime.getHours() == this.eventCards[j].key) {
          exist = true;
          this.eventCards[j].list.push(this.eventByDate[i])
          break;
        }
      }
      if (exist == false)
        this.eventCards.push(new eventCard(this.eventByDate[i].startTime.getHours(), [this.eventByDate[i]]));
    }

    this.selectedDate = day;

    const lunar: Lunar = new Lunar();
    let blockLunar = lunar.getBlockLunarDate(day);
    this.lunarDate = "AL: " + blockLunar.lunarDate + "/" + blockLunar.lunarMonth + "/" + blockLunar.lunarYear;
    this.valueChange.emit({
      mode: this.mode,
      currentDate: this.selectedDate
    })
  }

  dayCompare(event: Event2, selected: Date): boolean {
    var start = new Date(format(event.startTime, 'yyyy-MM-dd'))
    var end = new Date(format(event.endTime, 'yyyy-MM-dd'))
    var selecteddate = new Date(format(selected, 'yyyy-MM-dd'))
    return (start <= selecteddate && end >= selecteddate)
  }

  checkifAllday(event: Event2, selected: Date): boolean {
    var start = new Date(format(event.startTime, 'yyyy-MM-dd'))
    var end = new Date(format(event.endTime, 'yyyy-MM-dd'))
    var selecteddate = new Date(format(new Date(selected), 'yyyy-MM-dd'))
    return !(start.getTime() == selecteddate.getTime() || end.getTime() == selecteddate.getTime())
  }

  handlePan(ev) {
    if (this.calendar.mode != "month" && ev.deltaY > 0) {
      this.calendar.mode = 'month'
      this.mode = 'month';
    }
    if (this.calendar.mode != "week" && ev.deltaY < 0) {
      this.calendar.mode = 'week';
      this.mode = 'week';
    }
    this.myCal.loadEvents();
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }
}
