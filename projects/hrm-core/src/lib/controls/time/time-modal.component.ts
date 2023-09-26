import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-time-modal',
  templateUrl: './time-modal.component.html',
  styleUrls: ['./time-modal.component.scss'],
})
export class timeModalComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() TextInput: string = '';
  @Input() idtime;
  @Input() idTimeShow;
  @Input() myTime ;
  @Input() KeepTime;
  @Input() textLeft: string = '';
  @Input() IsDefaultValue: boolean = false;

  @Output() selectedItem = new EventEmitter();
  oDatas:Array<any> = [];
  datasOutPut: any[] = [];
  IsVisibleModal = false;
  searchText: string;
  data: any;
  dateValue: any;
  constructor() { }
  ngOnInit() {
    //default time là giá trị đang hiển thị khi ko chọn trên UI
    if(this.IsDefaultValue == true)
    {
      this.selectedItem.emit(moment(new Date()).format('HH:mm'));
    }
    else
    {    
      if(!this.KeepTime || this.KeepTime=="")
      {
        this.myTime = null; this.TextInput = ''
      }
    }
  }
  setOpenModal(isOpen: boolean) {
    this.IsVisibleModal = isOpen;
  }
  FormatTime(time){
    if(time){
      return moment(new Date(`01/01/1970 ${time}`)).format('HH:mm');
    }
    // default là null khi load page nếu có option isdefault
    if(this.IsDefaultValue != true && this.myTime == null)
    {
      return null;
    }
    return moment(new Date()).format('HH:mm');
  }
  startDateChanged(value)
  {
    this.setOpenModal(false)
    this.selectedItem.emit(moment(value).format('HH:mm'));
  }
  selectItem(item) {
    this.setOpenModal(false)
    this.selectedItem.emit(moment(item).format('hh:mm'));
  }
}
