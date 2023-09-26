/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService, } from '@ngx-translate/core';
import HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import CommonConst from 'src/libs/constants/CommonConst.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Router } from '@angular/router';
import FormatHandler from '../../shared/handlers/FormatHandler.js';
import { VariableCommonService } from 'projects/hrm-core/src/lib/services/handlers/variableCommon.service';
import { IonModal } from '@ionic/angular';
import { IPConfig } from 'src/IPConfig';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './QuestionAnswer.component.html',
  styleUrls: ['./QuestionAnswer.component.scss'],
})
export class QuestionAnswerComponent implements OnInit {
  @ViewChild('modaladdquestion') modaladdquestion: IonModal;
  user: any;
  FormatHandler = FormatHandler;
  IsAddNewQuestion= false;
  TabActive = CommonConst.TAB.QA.Question;;

  PageSize= CommonConst.VALUE.PageSize;
  PageIndex = 0;
  TotalPages = 0;
  TotalItems = 0;
  currentItems = 0;
  data=[];
  PhotoUri= '';
  isPost= true;
  isReply= false;
  ReplyTo= null;
  totalEmps= 0;
  Lang: any;
  topicCode= null;
  topicContent= '';
  topic = [];
  topicobj = {TopicCode: this.topicCode, TopicContent: this.topicContent};
  content = '';
  showReplyAnswer = false;
  selectPostItem;
  constructor(
    private api: ApiHttpService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private notifications: NotificationsService,
    private auth: AuthStore, private languageService: LanguageService,
    public commonHandler: CommonHandlerService,
    private activeRoute: ActivatedRoute
  ) {
    this.user = this.auth.get();
    this.translate.use(this.auth.getLanguage());
  }

  getQATopic = () => {
    this.api.post(HrmAPIConst.QA.Alias_GetQATopic,HrmAPIConst.QA.GetQATopic,{})
      .subscribe((res) => {
        const data = res.Data;
        this.topic= data;
        this.topicCode= null;
        this.topicContent='';
      });
  };


  selectTopic = (data) => {
      if (data) {
        this.topicCode = data.TopicCode;
        this.topicContent = data.TopicContent;
        this.topicobj = data;
      }
  };

  async GetLanguage(){
    this.Lang = await this.languageService.getLanguage();
    this.activeRoute.params.subscribe(val => {
      this.initOption();
      this.isReply = false;
      if(this.TabActive === CommonConst.TAB.QA.Question)
      {
        this.getMyPost().subscribe();
      }
      else{
        this.getMyAnswer().subscribe();
      }
    });
  }
  ngOnInit() {
    this.getQATopic();
    this.GetLanguage();
    this.commonHandler.dragElement('dragable');
    this.commonHandler.dragElement('dragable2');
  }
  //question
  getMyPost(): Observable<any> {
    return this.api.post(HrmAPIConst.QA.Alias_GetMyPost, HrmAPIConst.QA.GetMyPost,{
      PageSize: this.PageSize,
      PageIndex: this.PageIndex
    })
      .pipe(map(res => {
          if (res && !res.IsError) {
            this.initData(res.Data);
          }
      }));
  }
  //common
  initData(data) {
      const currentData = data.Data || [];
      if (!currentData || typeof currentData != 'object' || Object.keys(currentData).length === 0) {
          this.data = [];
          return;
      };
      const outputParams = data[CommonConst.KEY.OutputParams] || {};
      let stateData = this.data;
      stateData = stateData ? [...stateData, ...currentData] : currentData;
      this.currentItems += currentData.length;
      this.data = stateData;
      this.totalEmps= outputParams.TotalItems;
      this.PhotoUri= this.PhotoUri === '' ? stateData[0].PhotoID : this.PhotoUri;
  }

  //question
  createQuestion = () => {
    const reply = this.isReply ? '@' + this.ReplyTo?.FullName + ': ' + this.ReplyTo?.Content : '';
    const data = {
      Subject: this.topicCode,
      Content: this.content,
      ReplyContent: reply
    };

    if (!data) {return;}

    if (this.isPost && data.Subject == null || data.Subject === '') {
        this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.QA.PleaseTopic);
        return;
    }
    if (data.Content == null || data.Content.trim() === '') {
        this.notifications.alert(this.Lang.COMMON.Alert,this.isReply ? this.Lang.QA.PleaseAnswer:this.Lang.QA.PleaseQuestion);
        return;
    }

    let apiRequest = HrmAPIConst.QA.Alias_PostQuestion;
    const pramsRequest = {
        Subject: data.Subject,
        Content: data.Content
    };

    if (this.ReplyTo) {
        apiRequest = HrmAPIConst.QA.Alias_SendAnswer;
        const item = this.ReplyTo;
        pramsRequest[CommonConst.KEY.ID] = item[CommonConst.KEY.ID];
        pramsRequest[CommonConst.KEY.GroupID] = item[CommonConst.KEY.GroupID];
        pramsRequest[CommonConst.KEY.Subject] = item[CommonConst.KEY.Subject];
        pramsRequest[CommonConst.KEY.QuoteContent] = data[CommonConst.KEY.ReplyContent] || '';
    }
    this.api.post(apiRequest,null,pramsRequest)
        .subscribe(result => {
            if (!result.IsError && result.Data) {
                this.initOption();
                this.getMyPost().subscribe();;
                this.IsAddNewQuestion = false;
            }
        });
  };

  clicktest(item){
    console.log(item);
    
  }

  //common
  eventCancelCreatePost = () => {
    this.IsAddNewQuestion = false;
    this.showReplyAnswer = false;
    this.isPost = true;
    this.isReply = false;
    this.ReplyTo = null;
    this.selectPostItem = null;
    this.content = '';
  };


  //question
  eventOpenPost =()=>{
    this.IsAddNewQuestion = true;
  };

  //question
  AfterCloseModalAddQuestion = () => {
    this.eventCancelCreatePost();
  };


  //common
  loadMore(event)
  {
    if (this.currentItems < this.totalEmps) {
      this.PageIndex++;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.TabActive === CommonConst.TAB.QA.Question ? this.getMyPost().subscribe(()=>{
          event.target.complete();
        }) : this.getMyAnswer().subscribe(()=>{
          event.target.complete();
        });
    }
    else{
      event.target.complete();
    }
  };

  //common
  hanleShowReply(item){
    this.router.navigate(['/QuestionAnswer/Reply'], { state: { RequestData: item } });
  };


  //common
  eventLongPressReplyComment = (item) => {
    if(this.TabActive === CommonConst.TAB.QA.Answer) {
      this.updateStatus(item);
      this.showReplyAnswer = true;
    }
    else{
      this.IsAddNewQuestion = true;
    }
    this.isPost = false;
    this.isReply = true;
    this.ReplyTo = item;
  };

  //answer
  getMyAnswer(): Observable<any> {
    return this.api.post(HrmAPIConst.QA.Alias_GetMyAnswer,null,{
      PageSize: this.PageSize,
      PageIndex: this.PageIndex
    })
    .pipe(map(res => {
          if (res && !res.IsError) {
            this.initData(res.Data);
          }
    }));
  }

  //answer
  showFormCreate = (item) => {
    this.selectPostItem = item;
    this.showReplyAnswer = true;
  };


  //answer
  createReply = () => {
    const reply = this.isReply ? '@' + this.ReplyTo?.FullName + ': ' + this.ReplyTo?.Content : '';
    const data = {
      Subject: this.topicCode,
      Content: this.content,
      ReplyContent: reply
    };

    if (data.Content == null || data.Content.trim() === '') {
      this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.QA.PleaseAnswer);
      return;
    }

    if (this.selectPostItem) {
        const item = this.selectPostItem;
        const pramsRequest = {
            ID: item.ID,
            GroupID: item.GroupID,
            Subject: item.Subject,
            Content: data.Content,
        };
        if (this.isReply) {
            pramsRequest[CommonConst.KEY.QuoteContent] = data[CommonConst.KEY.ReplyContent] || '';
        }

        this.api.post(HrmAPIConst.QA.Alias_SendAnswer,null,pramsRequest)
            .subscribe(res => {
                if (res && res.Data) {
                    this.eventCancelCreatePost();
                    const currentData = this.data;
                    if (currentData && typeof currentData == 'object' && currentData.length > 0) {
                        currentData.map(element => {
                            if (element[CommonConst.KEY.ID] === item[CommonConst.KEY.ID]) {
                                const totalReply = typeof element[CommonConst.KEY.TotalReply] == 'number' &&
                                    element[CommonConst.KEY.TotalReply] || 0;
                                element[CommonConst.KEY.TotalReply] = totalReply + 1;
                            }
                            return element;
                        });
                    }
                    this.data = currentData;
                    this.showReplyAnswer = false;
                    this.updateStatus(item);
                }
            });
    }
  };

  //answer
  updateStatus = (data) => {
    if (data.Status) {return;}
    this.api.post(HrmAPIConst.QA.Alias_UpdateSatus,null,{
        ID: data.ID
    }).subscribe(res => {
        if (res && res.Data) {
            const stateData = this.data;
            stateData.forEach(element => {
                if (element.ID === data.ID) {
                    element.Status = true;
                }
            });
            this.data = stateData;
        }
    });
  };


//answer
  updateStatusAll() {
    const stateData = this.data;

    if (stateData && typeof stateData == 'object' && stateData.length > 0) {
        const items = [];
        stateData.forEach((v) => {
            if (v.Status === false) {
                items.push(v.ID);
            }
        });
        this.api.post(HrmAPIConst.QA.Alias_UpdateSatusAll,null,{
            IDs: items
        }).subscribe(res => {
            if (!res.IsError && res.Data) {
                this.initOption();
                this.getMyAnswer().subscribe();
            }
        });
    }
  }



  //answer
  AfterCloseModalReplyAnswer = ()=>{
    this.eventCancelCreatePost();
  };


  //common
  initOption(){
    this.PageSize=CommonConst.VALUE.PageSize;
    this.PageIndex= 0;
    this.currentItems = 0;
    this.data = [];
    this.totalEmps = 0;
  }

  //common
  OnChangTab = (tab) => {
    if( this.TabActive === tab) {return;}
    this.initOption();
    this.TabActive = tab;
    this.isReply = false;
    if(tab === CommonConst.TAB.QA.Question)
    {
      this.getMyPost().subscribe();
    }
    else{
      this.getMyAnswer().subscribe();
    }
  };

}



