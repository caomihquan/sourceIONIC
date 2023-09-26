/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import HrmStorageConst from '../../../../libs/constants/HrmStorageConst';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import HrmStorage from '../../../../libs/core/HrmStorage';
import { IPConfig } from 'src/IPConfig';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-new-details',
  templateUrl: './NewsDetail.component.html',
  styleUrls: ['./NewsDetail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  itemNews: any;
  newId: any;
  modalAttachment = false;
  listFiles: any;
  SessionID: any;
  loginInfo: any;
  NOTIFY: any;
  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private platform: Platform,
    private auth: AuthStore,
    private activatedRoute: ActivatedRoute,
    private CommonHandler: CommonHandlerService,
    private notifications: NotificationsService,
    private router: Router,
    private file: File,private nativeHTTP: HTTP,private sanitizer: DomSanitizer) {
    this.translate.use(this.auth.get().Language ? this.auth.get().Language.toLowerCase() : 'VN');
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>{
     this.newId=params.get('id');
    });


    this.itemNews = this.router.getCurrentNavigation().extras.state;

    this.itemNews.Contents = this.sanitizer.bypassSecurityTrustHtml(this.itemNews.Contents);
    this.getListFiles( this.newId);
    this.translate.get('NOTIFY').subscribe(res => this.NOTIFY = res);
  }

  getListFiles = async (recID) => {
    const apiConfig = IPConfig.IP;
    if (apiConfig && typeof apiConfig === 'string') {
        this.api.post(HrmAPIConst.NEWS.GetListFiles,null,{
            RecID: '80'
        }).subscribe(async (res) => {
            if (res && res.Data) {
                const loginInfo = this.auth.get();
                this.listFiles = res.Data;
                this.loginInfo = loginInfo;
            }
        });
    }
  };


  downloadFile(v){
    const fileName = this.CommonHandler.ConvertViToEn(v.FileName);
    // eslint-disable-next-line max-len
    const fileLocation = (this.platform.is('android') ? this.file.externalRootDirectory + '/Download/'  : this.file.documentsDirectory) + fileName.replace(/\?|\^/g, '').replace(/\s/g, '_');
    const url = IPConfig.IP + 'Export/GetAttachmentFileMulti?ss=' + this.loginInfo.SessionID + '&token=' + v.ID;
    this.notifications.toast(this.NOTIFY.StartDownloading,'top');
    this.nativeHTTP.downloadFile(url, {}, {}, fileLocation).then(response => {
      this.notifications.toast(this.NOTIFY.FinishDownloading,'bottom',1000,'success');
   }).catch(err => {
      //this.notifications.toast(err,'bottom',1000,'danger');
   });
  };
  setOpenModalAttachment(isOpen: boolean) {
    this.modalAttachment = isOpen;
  }


}
