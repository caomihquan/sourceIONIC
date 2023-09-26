import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from 'projects/hrm-core/src/lib/services/pushNotifications/fcm.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { AuthStore } from 'projects/hrm-core/src/public-api';
import { Network } from '@capacitor/network';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcmService: FcmService,  private platform: Platform,private notification: NotificationsService,
    private auth: AuthStore) {
    this.initializeApp();

  }

  initializeApp = async () => {
    this.platform.ready().then(() => {
      this.fcmService.initPush();
      Network.addListener('networkStatusChange', status => {
        if(!status.connected){
          const thongbao = this.auth.getLanguage() === 'vn' ? 'Thông báo' : 'Warning';
          const message = this.auth.getLanguage() === 'vn' ? 'Không có kết nối mạng' : 'Network not available';
          this.notification.alert(thongbao,message);
        }
      });
    });
  };
}
