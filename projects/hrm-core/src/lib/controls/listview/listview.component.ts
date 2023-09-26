import { ApiHttpService } from './../../services/apihttp/apihttp.service';
import { Component, HostBinding, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthStore } from '../../services';
@Component({
  selector: 'listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss'],
})
export class HrmListviewComponent implements OnInit {
  @HostBinding('attr.width') width = '100%';
  @Input() datas: Array<any> = [];
  @Input() arraySearch: Array<string>=[];
  @Input() template: TemplateRef<any>;
  @Input() templateGroup: TemplateRef<any>;
  @Input() isGroup: boolean;
  @Input() lines: boolean = true;
  @Input() autoLoad: boolean = false;
  @Input() height:string;
  @Input() classDivContainer = '';
  @Input() classListItem = '';
  @Input() fieldGroupChild = 'Items';
  @Input() fieldGroup = 'GroupName';
  @Input() classGroup;
  @Input() lazyload=false;
  //Param api
  @Input() url: string;
  @Input() funcID: string = '';
  @Input() params: any;
  @Input() page: number = 0;
  @Input() pageSize: number = 20;


  //Output
  @Output() afterSearch = new EventEmitter();
  @Output() selectedItem = new EventEmitter();
  //local params
  oDatas: Array<any> = [];
  payload: any;
  total: number = 0;
  current: number = 0;
  searchText: string = '';
  selectItem: any
  user: any;

  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private authStore: AuthStore) {
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.setDefaultLang(this.authStore.getLanguage().toLowerCase());
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.authStore.getLanguage() ? this.authStore.getLanguage().toLowerCase() : (browserLang.match(/en|fr/) ? browserLang : 'vn'));
  }

  ngOnInit() {
    if (this.autoLoad) {
      this.payload = {
        PageIndex: this.page,
        PageSize: this.pageSize,
        SearchText: this.searchText,
      }
        this.loadData().subscribe();
    }
    else{
      this.oDatas = this.datas
    }
  }
  loadData() {
    if (this.params) {
      this.payload = Object.assign(this.params, this.payload);
    }
    return this.api.post(this.url, this.funcID, this.payload).pipe(map(res => {
      if (res && !res.Error) {
        let data = res.Data;
        let keyGroup = 'GroupName';
        this.total = res && data.length > 0 && data[0].TotalEmps ? data[0].TotalEmps : 0;
        this.current += data.length;
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (item[keyGroup]) {
            const groupName = (item[keyGroup] + "").toLocaleUpperCase();
            if (this.datas.length == 0) {
              this.datas.push({
                GroupName: groupName,
                Items: [item]
              });
            } else {
              let group = this.findGroup(this.datas, groupName);
              if (group) {
                group.Items.push(item);
              } else {
                this.datas.push({
                  GroupName: groupName,
                  Items: [item]
                });
              }
            }
          }
        }
        this.oDatas = this.datas;
      }
      return res;
    }))
  }
  findGroup = function (data, name) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item['GroupName'] == name) {
        return item;
      }
    }
    return null;
  };

  loadMore(event) {
    if (this.current < this.total) {
      this.page++;
      this.payload = {
        PageIndex: this.page,
        PageSize: this.pageSize,
        SearchText: this.searchText,
      }
      this.loadData().subscribe(res => {
        event.target.complete();
      });
    } else
      event.target.disabled = true;
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
    this.afterSearch.next(this.datas);
  }

  onClickItem(item){
    this.selectedItem.next(item);
  }
}
