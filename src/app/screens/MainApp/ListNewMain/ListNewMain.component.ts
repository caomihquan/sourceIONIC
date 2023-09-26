/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-new-main-page',
  templateUrl: './NewsMainPage.component.html',
  styleUrls: ['./NewsMainPage.component.scss'],
})
export class NewsMainPageComponent implements OnInit {
  itemNews: any;
  newId: any;
  modalAttachment = false;
  listFiles: any;
  SessionID: any;
  loginInfo: any;
  NOTIFY: any;
  constructor(
    private translate: TranslateService,
    private auth: AuthStore,
    private router: Router,
    private sanitizer: DomSanitizer) {
    this.translate.use(this.auth.getLanguage());
  }
  ngOnInit() {
    this.itemNews = this.router.getCurrentNavigation()?.extras?.state;
    this.itemNews.Contents = this.sanitizer.bypassSecurityTrustHtml(this.itemNews.Contents);
  }

}
