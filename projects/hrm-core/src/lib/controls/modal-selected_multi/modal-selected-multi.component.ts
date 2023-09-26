import { Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-modal-selected-multi',
  templateUrl: './modal-selected-multi.component.html',
  styleUrls: ['./modal-selected-multi.component.scss'],
})
export class HrmModelSelectedMultiComponent implements OnInit {
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
  @Output() onSubmitDialog = new EventEmitter();
  @Output() afterSearch = new EventEmitter();
  CheckAll  = false;
  //local params
  oDatas: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }
  selectMember(event){
     this.CheckAll =  event.target.checked;
     if(this.CheckAll)
     {
        for(let i=0; i< this.datas.length; i++)
        {
            this.datas[i]['checked'] = true;
        }
     }
     else
     {
        for(let i=0; i< this.datas.length; i++)
        {
            this.datas[i]['checked'] = false;
        }
     }
  }
  selectItem(event, item){
 }
 refreshDialog()
 {
    this.CheckAll = false;
    for(let i=0; i< this.datas.length; i++)
    {
        this.datas[i]['checked'] = false;
    }
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
              if (data[i][this.arraySearch[j]] && data[i][this.arraySearch[j]].toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 && dataFilters.indexOf(data[i]) == -1) {
                  dataFilters.push(data[i]);
              }
          }
      }
      this.datas = dataFilters
    }
    this.afterSearch.emit(this.datas);
  }

  onClickItem(item){
    this.selectedItem.emit(item);
  }
  SubmitDialog(callback){
    let data  = this.datas.filter(n=>n.checked == true);
    this.onSubmitDialog.emit(data)
    //this.refreshDialog()
    if(callback)
      callback;
  }
  CancelDialog(callback){
    //this.refreshDialog()
    if(callback)
      callback
  }
}
