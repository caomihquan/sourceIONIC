/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { IPConfig } from 'src/IPConfig';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import ReportConst from '../../shared/constants/ReportConst';
import Chart from 'chart.js/auto';
//import { NativeBiometric ,BiometryType} from 'capacitor-native-biometric';
//import { Contacts } from '@capacitor-community/contacts';
const API_REPORT = HrmAPIConst.REPORT;
@Component({
  selector: 'app-face-config',
  templateUrl: './FaceConfig.component.html',
  styleUrls: ['./FaceConfig.component.scss'],
})
export class FaceConfigComponent implements OnInit {
  isToastOpen = false;
  message = 'Khong support';
  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private sanitizer: DomSanitizer,
    public CommonHandler: CommonHandlerService,private http: HttpClient){
    //
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());

  }



  ngOnInit() {

  }

  async setOpen() {}

  async setContact(){
  }


}

