import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { TranslateService,} from '@ngx-translate/core';

@Component({
  selector: 'app-input-date-modal',
  templateUrl: './input-date-modal.component.html',
  styleUrls: ['./input-date-modal.component.scss'],
})
export class InputDateModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private api: ApiHttpService,private translate:TranslateService,private authStore:AuthStore) {
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }
  date: string;
  lstDows: any;

  ngOnInit() {
    this.getDowCode();
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.date, 'confirm');
  }

  selectItem(item){
    return this.modalCtrl.dismiss(item, 'confirm');
  }
  getDowCode() {
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_GetPayrollDow,HrmAPIConst.CHECKINOUT.GetPayrollDow)
        .subscribe((res) => {
        if (!res.Error && res.Data && res.Data.length > 0) {
            this.lstDows =  res.Data
        }});
  }
}
