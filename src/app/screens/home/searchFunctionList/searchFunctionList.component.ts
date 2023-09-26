import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { de } from 'date-fns/locale';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import { isEmpty } from 'rxjs/operators';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
@Component({
  selector: 'app-search-function',
  templateUrl: './searchFunction.component.html',
  styleUrls: ['./searchFunctionList.component.scss'],
})
export class SearchFunctionComponent implements OnInit {
  params: any;
  constructor(private api: ApiHttpService,private translate: TranslateService,private auth: AuthStore,private router: Router) {
    this.translate.use(this.auth.getLanguage());
  }

  ngOnInit() {
    this.loadFunction();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  listFunction = [];
  loadFunction() {
    this.api.post(HrmAPIConst.HOMEPAGE.FunctionList,null,{ Language: this.auth.getLanguage()})
        .subscribe((res) => {
         this.listFunction = res.Data.ListFunction || [];
      });
  }

  onClickItem(item: any){
    if(item){
      this.router.navigate([item.Url],{state:{...item,title:item.DefaultName}});
    }
  }
}
