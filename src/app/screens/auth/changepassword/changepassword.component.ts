import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import { AuthService } from 'projects/hrm-core/src/lib/services/auth/auth.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  //#region Constructor
  form = new FormGroup({
    oldPass: new FormControl('', Validators.required),
    newPass: new FormControl('', Validators.required),
    confirmPass: new FormControl('', Validators.required),
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_CHANGEPASSWORD: any = HrmAPIConst.CHANGEPASSWORD;
  isActiveToggleTextPasswordOld = true;
  iconEyeOld  = 'eye';
  isActiveToggleTextPasswordNew: any = true;
  iconEyeNew  = 'eye';

  isActiveToggleTextPasswordConfirm: any = true;
  iconEyeConfirm  = 'eye';
  user: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CHANGEPASSWORD: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  COMMON: any;

  constructor(
    private authStore: AuthStore,
    private translate: TranslateService,
    private notification: NotificationsService,
    private api: ApiHttpService,
    private router: Router,
    private authService: AuthService) {
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }
  //#endregion

  //#region  Init
  ngOnInit() {
    this.translate.get('COMMON').subscribe(res => this.COMMON = res);
    this.translate.get('CHANGEPASSWORD').subscribe(res => this.CHANGEPASSWORD = res);

   }
  //#endregion

  //#region Function
  submit(callback?) {
    const me = this;
    const {confirmPass,...res} = this.form.value;
    const data = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      NewPassword: me.form.value.newPass,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      OldPassword:me.form.value.oldPass};

    if(me.form.value.confirmPass !== me.form.value.newPass){
      me.notification.toast(me.CHANGEPASSWORD.ConfirmPasswordAndNewPassword,'top',3000,'danger');
      return callback && callback(false);
    }

    me.api.post('HrmMobileApp/User/ChangePassword',null,data)
    .subscribe((result) =>{
      if (result && !result.Error) {
        if (result.Data  && result.Data.ErrorCodeRespone && result.Data.IsErrorRespone) {
          me.notification.alert(me.CHANGEPASSWORD.ThongBao,me.CHANGEPASSWORD[result.Data.ErrorCodeRespone]);
        }else {
          me.notification.alert(me.CHANGEPASSWORD.ThongBao,me.CHANGEPASSWORD.ChangePassWordSuccess,() => this.authService.logout());
          //me.notification.alert(me.CHANGEPASSWORD.ThongBao,me.CHANGEPASSWORD.ChangePassWordSuccess,() => {});
        }
      }
      return callback && callback(false);
    });
    }


  back() {
    this.router.navigate(['/home']);
  }
  //#endregion

toggleTextPasswordOld(): void{
    this.isActiveToggleTextPasswordOld = (this.isActiveToggleTextPasswordOld === true)?false:true;
    this.iconEyeOld = (this.isActiveToggleTextPasswordOld === true)?'eye':'eye-off';
}
getTypeOld() {
    return this.isActiveToggleTextPasswordOld ? 'password' : 'text';
}

toggleTextPasswordNew(): void{
    this.isActiveToggleTextPasswordNew = (this.isActiveToggleTextPasswordNew === true)?false:true;
    this.iconEyeNew = (this.isActiveToggleTextPasswordNew === true)?'eye':'eye-off';
}
getTypeNew() {
    return this.isActiveToggleTextPasswordNew ? 'password' : 'text';
}
toggleTextPasswordConfirm(): void{
    this.isActiveToggleTextPasswordConfirm = (this.isActiveToggleTextPasswordConfirm === true)?false:true;
    this.iconEyeConfirm = (this.isActiveToggleTextPasswordConfirm === true)?'eye':'eye-off';
}
getTypeConfirm() {
    return this.isActiveToggleTextPasswordConfirm ? 'password' : 'text';
}
}
