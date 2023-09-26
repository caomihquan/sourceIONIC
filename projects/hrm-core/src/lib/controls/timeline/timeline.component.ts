import { ApiHttpService } from './../../services/apihttp/apihttp.service';
import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthStore } from '../../services';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class HrmTimeLineComponent implements OnInit {
  @Input() idOpen :string
  @Input() RecordID :string
  @Input() ProcessID :Number
  @Input() title :string
  @Input() templateLeft: TemplateRef<any>;
  @Input() templateRight: TemplateRef<any>;

  @Output() selectedItem = new EventEmitter();
  //local params
  oDatas: Array<any> = [];
  user: any;
  datas: Array<any> = [];

  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private authStore: AuthStore) {
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }
  ngOnInit() {
    this.loadData();
  }

  onClickItem(item){
    this.selectedItem.next(item);
  }


  loadData(){
    if(this.RecordID){
      this.api.post(HrmAPIConst.LEAVE_REQUEST.Alias_GetListKows,HrmAPIConst.LEAVE_REQUEST.GetListKows,
      {
         ProcessID:this.ProcessID,
         RecordID:this.RecordID,
         IsGetListOfHistRequest : true
      }).subscribe(result =>{
          if(result && !result.Error){
            this.datas = result.Data;
          }
      });
    }
  }
}
