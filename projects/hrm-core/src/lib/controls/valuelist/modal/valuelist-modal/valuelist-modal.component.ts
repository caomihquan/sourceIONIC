import { CacheService } from './../../../../services/cache/cache.service';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-valuelist-modal',
  templateUrl: './valuelist-modal.component.html',
  styleUrls: ['./valuelist-modal.component.scss'],
})
export class ValuelistModalComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() template: TemplateRef<any>;
  @Input() datas: Array<any> = [];
  @Input() FieldKeyInput: string = '';
  @Input() inputText;
  @Input() placeholder = '';
  @Input() textLeft: string = '';
  @Input() arraySearch: Array<string> = [];
  @Input() IsFreeText:boolean = false;

  @Output() selectedItem = new EventEmitter();
  oDatas:Array<any> = [];
  datasOutPut: any[] = [];
  IsVisibleModal = false;
  searchText: string;

  constructor() { }

  ngOnInit() {
  }
  setOpenModal(isOpen: boolean) {
    this.IsVisibleModal = isOpen;
  }
  selectItem(item) {

    this.inputText = this.FieldKeyInput ? item[this.FieldKeyInput] : null;
    this.setOpenModal(false)
    this.selectedItem.emit(item);
  }
  search() {
    if(this.oDatas.length === 0){
      this.oDatas = this.datas
    }
    if (!this.searchText) {
      this.datas = this.oDatas
    }
    else{
      var data = JSON.parse(JSON.stringify(this.oDatas))
      var dataFilters = [];
      for (var j = 0; j < this.arraySearch.length; j++) {
          for (var i = 0; i < data.length; i++) {
              if (data[i][this.arraySearch[j]] && data[i][this.arraySearch[j]].toString().toLowerCase().indexOf(this.searchText.toString().toLowerCase()) !== -1 && dataFilters.indexOf(data[i]) == -1) {
                  dataFilters.push(data[i]);
              }
          }
      }
      this.datas = dataFilters
    }
  }


 //multi
  confirm(){
    //chua lam
    this.inputText = this.datasOutPut.map(x=>x.DowCode).join(',');
    this.setOpenModal(false)
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  selectItemMulti(item){
    //chua lam
  }

  changeFreeText(event:any){
    this.selectedItem.emit(event.target.value)
  }

}
