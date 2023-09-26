/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { Router,NavigationExtras } from '@angular/router';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';

@Component({
  selector: 'app-my-paystub',
  templateUrl: './MyPaystub.component.html',
  styleUrls: ['./MyPaystub.component.scss'],
})
export class MyPaystubComponent implements OnInit {
  user: any;
  COMMON: any;
  NOTIFY: any;
  itemFunction: any;
  lstGroupTemplateDynamic: any;
  TemplateID: any;
  TemplateName: any;
  listTemplates: any;
  DowCode: string;
  lstDows: any;
  lstdatatemplate: any;
  visibleMonth: boolean;
  visibleTemplate: boolean;
  lstdataIndex: any;
  arrOpen: any;
  // eslint-disable-next-line max-len
  CurrentMonth = (new Date().getFullYear()).toString() + '/' + ((new Date().getMonth() + 1) < 10 ? '0'+(new Date().getMonth() + 1).toString():(new Date().getMonth() + 1).toString());
  constructor(public authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    public CommonHandler: CommonHandlerService){
    //
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() {
    this.translate.get('COMMON').subscribe(res => this.COMMON = res);
    this.translate.get('NOTIFY').subscribe(res => this.NOTIFY = res);
    this.itemFunction = this.router.getCurrentNavigation().extras.state;
    this.getMonth();

  }

  getTemplate(){
    const me = this;
    me.api.post(HrmAPIConst.MYPAYSTUB.Alias_GetTemplatePaystub, HrmAPIConst.MYPAYSTUB.GetTemplatePaystub)
        .subscribe((res) => {
            const tempID = (res.Data.length > 0) ? res.Data[0].TemplateID : '';
            const tempName = (res.Data.length > 0) ? res.Data[0].TemplateName : '';
      
            if(tempID !== '')
            {
                this.api.post(HrmAPIConst.MYPAYSTUB.Alias_GetPaystubField, HrmAPIConst.MYPAYSTUB.GetPaystubField,
                  {
                    TemplateID:tempID
                })
                .subscribe(re=>{
                    if(re && re.Data)
                    {
                        this.lstGroupTemplateDynamic = re.Data.TemplateGroups;
                    }
                });
            }
            me.TemplateID =tempID;
            me.TemplateName =tempName;
            me.listTemplates = res.Data;
            this.getDataPaystub(me.DowCode,tempID);
            this.getTemplateGroupDynamic(tempID);
        });
  };

  getDataPaystub(dowCode, templateID){
    const me = this;
    this.api.post(HrmAPIConst.MYPAYSTUB.Alias_GetPaystub, HrmAPIConst.MYPAYSTUB.GetPaystub,
      {
        DowCode: dowCode,
        TemplateID: templateID
      }).subscribe((res) => {
            if (res && res.Data) {
                const data = res.Data;
                me.lstdatatemplate = data.lstdata;

            }
        });
  };

  getTemplateGroupDynamic(templateID)
  {
      if(templateID && templateID!=='')
      {
          this.api.post(HrmAPIConst.MYPAYSTUB.Alias_GetPaystubField, HrmAPIConst.MYPAYSTUB.GetPaystubField,
          {
              TemplateID : templateID
          })
          .subscribe(re=>{
              if(re && re.Data)
              {
                  this.lstGroupTemplateDynamic = re.Data.TemplateGroups;
                  this.arrOpen = [...Array(this.lstGroupTemplateDynamic.length).keys()].map(x => {
                    ++x;
                    return x.toString();
                  });
              }
          });
      }
  }
  IsArray(item) {
    return Array.isArray(item);
  }

  FormatNum(item,type?){
    return this.CommonHandler.formatNum(item,this.user,type);
  }
  getMonth() {
    const me = this;
    me.api.post(HrmAPIConst.MYPAYSTUB.Alias_GetPayrollDow, HrmAPIConst.MYPAYSTUB.GetPayrollDow)
        .subscribe((res) => {
            if (!res.Error && res.Data && res.Data.length > 0) {
                const filter = res.Data.filter(item => item.DowCode === me.CurrentMonth);
                if (filter.length > 0) {
                    me.DowCode = filter[0].DowCode;
                }
                else {
                    me.DowCode = res.Data[0].DowCode;
                }
            }
            else
            {
                me.DowCode = '';
            }
            me.lstDows = res.Data;
            this.getTemplate();
        });
  }

  onSelectMonth(item){
    this.getTemplateGroupDynamic(this.TemplateID);
      this.DowCode= item.DowCode;
      this.visibleMonth = false;
      this.getDataPaystub(item.DowCode, this.TemplateID);
  }

  onSelectTemp(item){
      this.getTemplateGroupDynamic(item.TemplateID);
          this.TemplateName= item.TemplateName;
          this.TemplateID= item.TemplateID;
          this.visibleTemplate = false;
          this.getDataPaystub(this.DowCode, item.TemplateID);
  };
}

