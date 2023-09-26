import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  isLoading = false;
  constructor(
    private toaStrCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router:Router
  ) { }
  async toast(message, pos?: 'top' | 'bottom' | 'middle', timeout?,color?) {
    if (!message) return;
    const toast = await this.toaStrCtrl.create({
      message: message,
      duration: timeout || 2000,
      position: pos || 'top',
      color:color || ''

    });
    toast.present();
  }

  async alert(title, msg, okFunc?: Function, textBtn?: Array<any>, cssBtns?: Array<any>,) {
    let buttons = [];

    if (textBtn && textBtn.length) {
      if (textBtn.length <= 1)
        buttons.push({
          text: textBtn[0] || 'Ok',
          role: 'ok',
          cssClass: cssBtns ? cssBtns[0] : '',
          handler: (blah) => {
            return okFunc(false);
          }
        })
      if (textBtn.length == 2)
        buttons.push({
          text: textBtn[1] || 'Cancel',
          cssClass: cssBtns ? cssBtns[0] : '',
          handler: (blah) => {
            //return okFunc(true);
          }
        },
        {
          text: textBtn[0] || 'Ok',
          role: 'ok',
          cssClass:cssBtns ? cssBtns[0] : '',
          handler: (blah) => {
            return okFunc(false);
          }
        })
    }
    else {

      buttons.push({
        text: 'Ok',
        cssClass: cssBtns ? cssBtns[0] : '',
        handler: (blah) => {
          return okFunc(true);
        }
      })
    }
    if (okFunc) {
      let alert = await this.alertCtrl.create({
        header: title,
        message: msg,
        mode:'ios',
        buttons: buttons,
        backdropDismiss:false
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: title,
        message: msg,
        mode:'ios',
        buttons: ['OK'],
        backdropDismiss:false
      });

      await alert.present();
    }
  }

  async showLoading(message?,duration?) {
    const loading = await this.loadingCtrl.create({
      message: message ? message: '',
      cssClass: 'custom-loading',
      spinner:'crescent',
      mode:'ios'
    });
    loading.present();
    if(duration){
      setTimeout(() => {
        loading.dismiss();
      }, duration);
    }
    return loading;

  }

  async alertInput(header,textCancel,textOk,okFunc,message?) {
    const alert = await this.alertCtrl.create({
      header: header ? header : '' ,
      mode:'ios',
      message: message?message:'',
      cssClass: 'custom-alert-input',
      buttons: [
      {
        text: textCancel ? textCancel : 'Cancel',
        role: 'cancel',
      },
      {
        text: textOk ? textOk : 'OK' ,
        role: 'confirm',
        handler: (data) => {
          okFunc(data);
        }
      }
    ],
      inputs: [
        {
          type: 'textarea',
          name:'txtReason',
          attributes: {
            rows:6
          },
          handler: (input) => {}
        },
      ],
    });
    await alert.present();
  }
}
