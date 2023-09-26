import { Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-modal-selected',
  templateUrl: './modal-selected.component.html',
  styleUrls: ['./modal-selected.component.scss'],
})
export class HrmModelSelectedComponent implements OnInit {
  //use
  // <ion-button id="open-modal" expand="block">Open Modal</ion-button>
  // <app-modal-selected title="test" idOpen="open-modal"></app-modal-selected>
  @HostBinding('attr.width') width = '100%';
  @Input() searchText:any;
  @Input() title:string;
  @Input() idOpen: string;
  @Input() template: TemplateRef<any>;
  @Input() lines: boolean = true;
  @Input() height:string;
  @Input() datas: Array<any> = [];
  @Input() classListItem = '';
  @Input() textLeft;
  @Input() arraySearch: Array<string>=[];
  @Output() selectedItem = new EventEmitter();
  @Output() afterSearch = new EventEmitter();
  //local params
  oDatas: Array<any> = [];
  constructor() { }

  ngOnInit() {
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
              if (data[i][this.arraySearch[j]] && data[i][this.arraySearch[j]].toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 && dataFilters.indexOf(data[i]) == -1) {
                  dataFilters.push(data[i]);
              }
          }
      }
      this.datas = dataFilters
    }
    this.afterSearch.emit(this.datas);
  }

  onClickItem(item,dismiss){
    this.selectedItem.emit(item);
  }
}
