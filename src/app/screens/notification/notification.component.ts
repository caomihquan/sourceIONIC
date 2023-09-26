/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @ViewChild('pageTop') pageTop: any;
  params: any;
  listNotfictions: Array<any>=[];
  totalRecord = 0;
  current = 0;
  pageIndex = 0;
  payload: any;
  pageSize = CommonConst.VALUE.PageSize;
  countNotfictions;
  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private router: Router,
    private variablesService: VariableCommonService,
    private commonHandler: CommonHandlerService) {

    this.translate.addLangs(['en', 'vn']);

    this.translate.use(this.auth.getLanguage());
  }
  initOptions(){
    this.totalRecord = 0;
    this.current = 0;
    this.pageIndex = 0;
  }
  ngOnInit() {
    this.getData().subscribe();
    this.commonHandler.dragElement('dragable');
    this.countNotfictions = this.router.getCurrentNavigation().extras.state.CountNofication;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  stringNoHtlm(text: string){
    const cssStr='body, p, table{font-family: Arial, Helvetica, sans-serif;font-size: 15px;line-height: 1.5;}';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let strBody_notHTML = text;
    strBody_notHTML = strBody_notHTML.replace(cssStr,'');
    return strBody_notHTML;
  }
  getData(): Observable<any> {
        const data ={
          pageIndex: this.pageIndex,
          pageSize:this.pageSize,
        };
        return this.api.post(HrmAPIConst.NOTIFICATION.Alias_GetListNotification,null,data).pipe(map(result => {
           if(result && !result.Error){
              if(result.Data?.Data){
                result.Data?.Data.map(x=>{
                  x.Body_notHTML = this.stringNoHtlm(x.Body_notHTML);
                  return x;
                });
              }
            this.listNotfictions=[...this.listNotfictions,...result.Data?.Data];
            const totalEmps = result.Data && result.Data.OutputParams.TotalItems ? result.Data.OutputParams.TotalItems : 0;
            this.totalRecord = totalEmps;
            this.current += result.Data.Data.length;
           }
           return result;
        }));
  }
  loadMore(event) {
    const me =this;
    if (this.current < this.totalRecord) {
      this.pageIndex++;
      this.payload = {
        pageIndex: me.pageIndex,
        pageSize: me.pageSize,
        };
      this.getData().subscribe(res => {
        event.target.complete();
      });
    }else{
      event.target.complete();

    }
  }
  onClickItem(item: any){
    if (item && item[CommonConst.KEY.Status]) {
      const params = {
        Data:item
      };
      this.router.navigate([`${CommonConst.SCENE.ListNotification}/${CommonConst.SCENE.NotificationDetails}`],{state:params});
    }
    else {
      this.api.post(HrmAPIConst.NOTIFICATION.Alias_UpdateStatus,null,{RecID:item && item.RecID })
          .subscribe(result => {
              if (result && result.Data.Success) {
                  const resultData = result.Data || {};
                  const data = this.listNotfictions || [];
                  data.forEach(element => {
                      if (typeof element == 'object' && element.RecID === resultData.ID) {
                          element.Status = true;
                      }
                  });
                  const params = {
                    Data:item
                  };
                  const numberNoti= (this.countNotfictions - 1) >= 0 ? (this.countNotfictions - 1) : 0;
                  this.router.navigate([`${CommonConst.SCENE.ListNotification}/${CommonConst.SCENE.NotificationDetails}`],{state:params});
                  this.variablesService.UpdateCountNotification(numberNoti);
              }
          });
    }
  }

  eventUpdateSeenAllNotification(){
    this.api.post(HrmAPIConst.NOTIFICATION.Alias_UpdateStatusAll)
        .subscribe(result => {
            if (result && !result.Error) {
              const content = (document.getElementById('load') as HTMLButtonElement);
              content.disabled = false;
              this.pageTop.scrollToTop();
              this.listNotfictions= [];
              this.initOptions();
              this.getData().subscribe();
            }
        });
  };
  handleRefresh = async (event) =>{
    const content = (document.getElementById('load') as HTMLButtonElement);
    content.disabled = false;
    this.pageTop.scrollToTop();
    this.listNotfictions= [];
    this.initOptions();
    await this.getData().subscribe();
    setTimeout(() => {
    event.target.complete();
    }, 1000);
  };

}
