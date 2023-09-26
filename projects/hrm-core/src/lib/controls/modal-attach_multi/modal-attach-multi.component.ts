import { Component, EventEmitter, HostBinding, Input, OnInit,Sanitizer, Output, TemplateRef, ViewChild } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import { Platform } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import CommonConst from '../../../../../../src/libs/constants/CommonConst.js';
import { IPConfig } from '../../../../../../src/IPConfig';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';



import AttachmentFileHandler from '../../../../../../src/app/shared/handlers/AttachmentFileHandler.js';
//import CommonHandler         from '../../../../../../src/app/shared/handlers/CommonHandler.js';


const _AttachmentFileHandler = AttachmentFileHandler;
//const _CommonHandler = CommonHandler


@Component({
  selector: 'app-modal-attach-multi',
  templateUrl: './modal-attach-multi.component.html',
  styleUrls: ['./modal-attach-multi.component.scss'],
})

export class HrmModelAttachMultiComponent implements OnInit {
  Lang: any;
  @HostBinding('attr.width') width = '100%';
  @Input() searchText:any;
  @Input() title:string;
  @Input() idOpen: string;
  @Input() FileID: string;
  @Input() template: TemplateRef<any>;
  @Input() lines: boolean = true;
  @Input() IsCreate: boolean = false;
  @Input() height:string;
  @Input() datas: Array<any> = [];
  @Input() classListItem = '';
  @Input() textLeft;
  @Input() TableName;
  @Input() paramfile;
  @Input() WaitingData: boolean = true;
  @Input() arraySearch: Array<string>=[];
  @Output() selectedItem = new EventEmitter();
  @Output() onSubmitDialog = new EventEmitter();
  @Output() afterSearch = new EventEmitter();
  CheckAll  = false;
  loginInfo: any;
  Options = {};
  //local params
  oDatas: Array<any> = [];
  txtSearch = "";
  items: File[] = [];

  constructor(
    private api: ApiHttpService, private languageService: LanguageService,
    private translate: TranslateService,
    private platform: Platform,
    private auth: AuthStore,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private file: File,
    private CommonHandler: CommonHandlerService,

    private nativeHTTP: HTTP,private sanitizer: DomSanitizer, public notification: NotificationsService
    ) {
      this.translate.addLangs(['en', 'vn']);
      this.translate.use(this.auth.getLanguage());
    }
    initOption() {
      return {
          PageIndex: 1,
          PageSize: CommonConst.VALUE.PageSize,
          TotalPages: 0,
          IsFull: false,
          OnScrolling: false,
      }
  }
  ngOnInit() {
    const loginInfo = this.auth.get();
    this.loginInfo = loginInfo;
    this.getLanguage();

  }
  getLanguage = async () => {
    this.Lang = await this.languageService.getLanguage();
    this.Options= this.initOption();
    this.loadlistfile();
  };
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
  loadlistfile()
  {
    //if(this.WaitingData) return;
    if(!this.paramfile['FilterText'])
    {
      this.paramfile['FilterText'] = ''
    }
    this.api.post("HrmMobileApp/Employee/GetFileFunc", "GetFileFunc",this.paramfile)
    .subscribe((res) => {
        if(res && res.Data && res.Data.Data && res.Data.Data.length > 0)
        {
          this.datas = res.Data.Data;
        }
        else
        {
          this.datas = [];
        }
    })
  }
  onFileChange=(e, callback)=>{
    e.preventDefault();
    let file = e.target.files[0];
    let filename =file.name
    let filetype=_AttachmentFileHandler.getFileType(filename)
    //const fileLocation = (this.platform.is('android') ? this.file.externalDataDirectory  : this.file.documentsDirectory)
    this.api.post("HrmMobileApp/CnB/Export/CheckFileUpload", "CheckFileUpload",
        {
          FileName: filename,
          ContentType: filetype,
        })
        .subscribe((res) => {
           if(res.Data.isSuccess)
           {
              let reader: FileReader = new FileReader();
              let zoneOriginalInstance = (reader as any)["__zone_symbol__originalInstance"];
              zoneOriginalInstance.readAsDataURL(file);
              zoneOriginalInstance.onload = () => {
                if(zoneOriginalInstance.result)
                {
                  let data = zoneOriginalInstance.result.toString().split("base64,").length > 1 ? zoneOriginalInstance.result.toString().split("base64,")[1] : "";
                  //this.notification.toast('UPLOAD PREPARE','bottom',1000,'success');
                  //lưu vô db
                  if(data && data !="")
                  {
                    let options = this.Options || {};
                    let params = this.paramfile || {};
                    params[CommonConst.KEY.PageIndex] = (options['PageIndex'] - 1) >= 0 ? (options['PageIndex'] - 1) : 0;
                    params[CommonConst.KEY.PageSize] = options['PageSize'];
                    params[CommonConst.KEY.FilterText] = this.txtSearch;
                    this.api.post("HrmMobileApp/Employee/UploadFile", "UploadFile",
                    {
                        FileName:file.name,
                        ContentType:file.type,
                        FileSize:file.size,
                        FunctionID: params.FunctionID,
                        TableName:params.TableName,
                        FieldName:params.FieldName,
                        FieldValue:params.FieldValue,
                        FileID:params.FileID,
                        Data:data,
                        PageIndex:params.PageIndex,
                        PageSize:params.PageSize,
                        FilterText:params.FilterText,
                        EmpLogin:params.EmpLogin
                    })
                    .subscribe(() => {
                      this.loadlistfile();
                    })
                  }

                }
                else
                {
                    this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.FileNotSupported, null,null,['']);
                    return;
                }
              };
           }
           else
           {
             this.notification.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.FileNotSupported, null,null,['']);
             return;
           }
        });

    }
    DownloadFiles(){
      const lstFileDown  = this.datas.filter(n=>n.checked == true);
      let couterr = 0
      var me = this;
      try{
        me.notification.toast(me.Lang.NOTIFY.StartDownloading,'top',300);
        for(let i=0; i< lstFileDown.length; i++)
        {
              let v =lstFileDown[i];
              const fileName = me.CommonHandler.ConvertViToEn(v.FileName);
              // eslint-disable-next-line max-len
              const fileLocation = (me.platform.is('android') ? me.file.externalRootDirectory + '/Download/'  : me.file.documentsDirectory) + fileName.replace(/\?|\^/g, '').replace(/\s/g, '_');
              const url = IPConfig.IP + 'Export/GetAttachmentFileMulti?ss=' + me.loginInfo.SessionID + '&token=' + v.ID;
              me.nativeHTTP.downloadFile(url, {}, {}, fileLocation).then(response => {
            }).catch(err => {
              couterr++;
            });
        }

      }catch(err){
        couterr++;
      }
      if(couterr == 0)
      {
        me.notification.toast(me.Lang.NOTIFY.FinishDownloading,'middle',1000,'success');
      }
      else {
        me.notification.toast(me.Lang.COMMON.Error,'bottom',1000,'danger');
      }
      // let myPromise = new Promise(function(myResolve, myReject) {
      // try{
      //     me.notification.toast(me.Lang.NOTIFY.StartDownloading,'top',300);
      //     for(let i=0; i< lstFileDown.length; i++)
      //     {
      //           let v =lstFileDown[i];
      //           const fileName = me.CommonHandler.ConvertViToEn(v.FileName);
      //           // eslint-disable-next-line max-len
      //           const fileLocation = (me.platform.is('android') ? me.file.externalRootDirectory + '/Download/'  : me.file.documentsDirectory) + fileName.replace(/\?|\^/g, '').replace(/\s/g, '_');
      //           const url = IPConfig.IP + 'Export/GetAttachmentFileMulti?ss=' + me.loginInfo.SessionID + '&token=' + v.ID;
      //           me.nativeHTTP.downloadFile(url, {}, {}, fileLocation).then(response => {
      //         }).catch(err => {
      //           couterr++;
      //         });
      //     }

      //   }catch(err){
      //     couterr++;
      //   }

      // // The producing code (this may take some time)
      // if(couterr == 0)
      //   {
      //     myResolve("OK");
      //   }
      //   else {
      //     myReject("Error");
      //   }
      // });

      // myPromise.then(
      //   function(value) { me.notification.toast(me.Lang.NOTIFY.FinishDownloading,'middle',1000,'success');},
      //   function(error) { me.notification.toast(me.Lang.COMMON.Error,'bottom',1000,'danger');}
      // );
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

}
