/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService, } from '@ngx-translate/core';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import LeaveAndOTConst from '../../../shared/constants/LeaveAndOTConst';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import FormatHandler from '../../../shared/handlers/FormatHandler.js';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { IonModal } from '@ionic/angular';
import { IPConfig } from 'src/IPConfig';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';

@Component({
  selector: 'app-reply',
  templateUrl: './Reply.component.html',
  styleUrls: ['./Reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @ViewChild('modaladdreply') modaladdreply: IonModal;
  isReply =false;
  user: any;
  FormatHandler = FormatHandler;
  TabActive = 'question';
  PageSize = 5;
  PageIndex = 0;
  currentItems = 0;
  data=[];
  PhotoUri= '';
  isFull= false;
  isPost= true;
  ReplyTo;
  totalEmps= 0;
  TotalPages=0;
  Lang: any;
  content = '';
  requestdata;
  showMore = false;
  show = false;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private auth: AuthStore,
    private notifications: NotificationsService,
    private languageService: LanguageService,
    public commonHandler: CommonHandlerService
  ) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }



  async GetLanguage(){
    this.Lang = await this.languageService.getLanguage();
  }
  ngOnInit() {
    this.requestdata = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.RequestData : {};
    this.GetLanguage();
    this.getReply().subscribe();
  }
  //question
  getReply(): Observable<any> {
    return this.api.post(HrmAPIConst.QA.Alias_GetReply,null,{
      PageSize: this.PageSize,
      PageIndex: this.PageIndex,
      ID:this.requestdata ? this.requestdata.ID : null
    })
    .pipe(map(res => {
        if (res && !res.IsError) {
          this.initData(res.Data);
        }
    }));
  }

  initData(data) {
      const currentData = data.Data || [];
      if (!currentData || typeof currentData != 'object' || Object.keys(currentData).length === 0) {
          this.data = null;
          return;
      };
      const outputParams = data[CommonConst.KEY.OutputParams] || {};
      let stateData = this.data;
      stateData = stateData ? [...stateData, ...currentData] : currentData;
      this.currentItems += currentData.length;
      this.data = stateData;
      this.totalEmps= outputParams.TotalItems;
      this.PhotoUri= this.PhotoUri === '' ? stateData[0].PhotoID : this.PhotoUri;
      this.showMore = true;
      this.isFull = this.currentItems === this.totalEmps;
      this.show = false;

  }
  //end question
  doBackAnswer(){
    this.router.navigate(['/QuestionAnswer']);
  }

  reviewAnswer = (item,reviewType) =>{
    this.api.post(HrmAPIConst.QA.Alias_ReViewAnswer, HrmAPIConst.QA.ReViewAnswer,{
      PostID: item.ID,
      Type: reviewType
    })
    .subscribe((res) => {
      if (res && res.Data) {
        this.handleUpdateReview(item, res.Data);
      }
    });
  };

  handleString = (str) => {
    const index = str.indexOf(':');
    const newStr = str.substring(1, index);
    if (newStr === this.user.EmployeeFullName) {
        const lang = this.auth.getLanguage();
        str = str.replace(newStr,lang === 'en'?'Me':'Tôi');
    }
    return str;
  };
  handleUpdateReview = (item, res) => {
    const data = res.OutputParams;
    const state = this.data;
    const id = item.ID;
    state.forEach((v, i) => {
        if (v.ID === id) {
            v.TotalLike = data.TotalLike;
            v.TotalDisLike = data.TotalDisLike;
        }
    });
    this.data=state;
  };

  replyComment = (data) => {
    this.isReply = true;
    this.ReplyTo= data;
    this.show = true;
  };

  AfterClosemodalreply(){
    this.eventCancelCreatePost();
  }

  createAnswer(data) {
    const me = this;
    if (data.Content == null || data.Content.trim() === '') {
      this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.QA.PleaseAnswer);
      return;
    }
    this.api.post(HrmAPIConst.QA.Alias_SendAnswer,null,{
        GroupID: me.requestdata.GroupID,
        ID: me.requestdata.ID,
        Content: data.Content,
        Subject: me.requestdata.Subject,
        QuoteContent: data.ReplyContent || ''
    }).subscribe(res => {
        if (res && res.Data) {
            this.show = false;
            this.initOption();
            this.getReply().subscribe();
        }
    });
  }

  eventCancelCreatePost = () => {
    this.isReply = false;
    this.show = false;
    this.content = '';
  };

  eventOpenCreatePost = () => {
    this.show = true;
    this.isReply = false;
  };
  initOption(){
    this.PageSize = 5;
    this.PageIndex= 0;
    this.currentItems = 0;
    this.data = [];
    this.totalEmps = 0;
  }

  SendRequest = async () => {
    const reply = this.isReply ? '@' + this.ReplyTo?.FullName + ': ' + this.ReplyTo?.Content : '';
    const data = {
        Content: this.content,
        ReplyContent: reply
    };
    this.createAnswer(data);
    this.content = '';
  };
  ShowMore()
  {
    if (this.currentItems < this.totalEmps) {
      this.PageIndex++;
      this.getReply().subscribe();
    }
  };

}



