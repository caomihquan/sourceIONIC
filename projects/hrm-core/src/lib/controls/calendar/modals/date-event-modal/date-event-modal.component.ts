import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { eventCard } from 'projects/hrm-core/src/lib/models/calendar.model';
import { AuthStore } from 'projects/hrm-core/src/public-api';


@Component({
  selector: 'app-date-event-modal',
  templateUrl: './date-event-modal.component.html',
  styleUrls: ['./date-event-modal.component.scss'],
})
export class DateEventModalComponent implements OnInit {

  @Input() eventCards: eventCard[];
  @Input() date: string;

  constructor(private modalCtrl: ModalController,private translate:TranslateService,private authStore:AuthStore) {

    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
