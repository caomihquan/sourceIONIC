import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import * as moment from 'moment';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { AuthStore } from '../../services';

@Component({
  selector: 'app-datetime-modal',
  templateUrl: './datetime-modal.component.html',
  styleUrls: ['./datetime-modal.component.scss'],
})
export class datetimeModalComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() template: TemplateRef<any>;

  @Input() iddatetime:any;
  @Input() iddatetimetrigger:any;
  @Input() datas: Array<any> = [];
  @Input() TextInput: string = '';
  @Input() inputText = moment().format();
  @Input() textLeft: string = '';
  @Input() arraySearch: Array<string> = [];
  @Output() selectedItem = new EventEmitter();
  @ViewChild('popoverDatetime') popoverDatetime:any;
  oDatas:Array<any> = [];
  datasOutPut: any[] = [];
  IsVisibleModal = false;
  searchText: string;
  chosenDate:any;
  data: any;
  date: any;
  dateValue: any;
  oldVal = null;
  locale = this.auth.getLanguage() === 'en' ? "en" : 'vi';
  constructor(public languageService : LanguageService,private auth:AuthStore) { }

  ngOnInit() {

  }

  startDateChanged(value)
  {
    this.oldVal = this.inputText;
    this.date = value
    this.inputText = value ? value : null;
    this.selectedItem.emit(value);
  }

  confirm(isok){
    this.popoverDatetime.confirm(true)
  }
  reset(isok){
    this.oldVal = this.inputText;
    if(!isok)
    {
      this.date = this.oldVal;
      this.inputText= this.oldVal;
      this.selectedItem.emit(this.oldVal);
      this.popoverDatetime.cancel(true)
    }
  }
}
