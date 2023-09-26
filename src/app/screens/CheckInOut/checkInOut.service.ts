/* eslint-disable @typescript-eslint/naming-convention */

import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  EmployeeAttendanceConst from 'src/app/shared/constants/EmployeeAttendanceConst.js';
import HrmStorageConst from '../../../libs/constants/HrmStorageConst';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import HrmStorage from '../../../libs/core/HrmStorage';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';

@Injectable({
  providedIn: 'root'
})
export class VariableCommonService{
  LocationCoords: any;
  IsNotCheckLocation: boolean;
  DeviceInfo: any;
  AppInfor: any;
  Lang: any;
  user: any;
  DataInOut: any;

  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private notifications: NotificationsService,
    public CommonHandler: CommonHandlerService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,) {

      this.user = this.authStore.get();
      Device.getInfo().then(x =>this.DeviceInfo = x);
      App.getInfo().then(x =>this.AppInfor = x);
      this.translate.getTranslation(this.authStore.getLanguage()).subscribe(res => this.Lang = res);

    }

  doCheckInOut(type, image) {
    let locationCoords = this.LocationCoords;
    if (!this.IsNotCheckLocation) {
        if (!locationCoords ||
            !locationCoords[EmployeeAttendanceConst.COORDS.longitude] ||
            !locationCoords[EmployeeAttendanceConst.COORDS.latitude]) {
            this.notifications.alert('khongco','vi tri');
            return;
        }
    } else {
        //! TMP Location Fake
        locationCoords = {
            accuracy: 10.899999618530273,
            altitude: 24.30000114440918,
            heading: 246.1000213623047,
            latitude: 10.7966834,
            longitude: 106.6763957,
            speed: 0.013301094993948936
        };
    }
    const config  = HrmStorage.getData(HrmStorageConst.ConfigMobile);
    const isCheckInByCamera = config ? config.IsCheckinByCamera : false;

    const platForm= {
      OS:this.DeviceInfo.operatingSystem,
      Model:this.DeviceInfo.model,
      Version:this.DeviceInfo.osVersion
    };
    const deviceInfo ={
      modelName:this.DeviceInfo.model,
      osVersion:this.DeviceInfo.osVersion,
      OsName:this.DeviceInfo.operatingSystem,
      ProductName:this.DeviceInfo.model
    };
    const paramsRequest = {
        Type: type,
        Longitude: locationCoords[EmployeeAttendanceConst.COORDS.longitude],
        Latitude: locationCoords[EmployeeAttendanceConst.COORDS.latitude],
        Accuracy: locationCoords[EmployeeAttendanceConst.COORDS.accuracy],
        Speed: 0,
        Image: image,
        IsCheckInByLocation: true,
        IsCheckInByCamera: isCheckInByCamera,
        sPlatform: JSON.stringify(platForm),
        DeviceInfo: JSON.stringify(deviceInfo),
        ExpoToken: this.authStore.get().TokenID,
        AppVersion: this.AppInfor.version
    };
    this.doAuditEventCheckInOut(paramsRequest);
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_CheckInOut, HrmAPIConst.CHECKINOUT.CheckInOut,paramsRequest)
        .subscribe((result) => {
            if (result.Data) {
                if (!result.Data.IsErrorRespone) {
                    if (EmployeeAttendanceConst.CheckIn === type) {
                        this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT.CheckInSuccess,()=>null);
                    }
                    else {
                        this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT.CheckOutSuccess,()=>null);
                    }
                    this.getFirstInLastOut();
                }else {
                    this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT[result.Data.ErrorCodeRespone],()=>null);
                }
            } else {
                this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT.DataInvalid,()=>null);
            }
        });
  }
  doAuditEventCheckInOut = (params) => {
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_AuditEventCheckInOut, HrmAPIConst.CHECKINOUT.AuditEventCheckInOut,params)
        .subscribe();
  };

  doCheckIn(image?){
    this.doCheckInOut(EmployeeAttendanceConst.CheckIn, image);
  }

  doCheckOut(image?){
    this.doCheckInOut(EmployeeAttendanceConst.CheckOut, image);
  }

  getFirstInLastOut() {
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_GetFirstInLastOut, HrmAPIConst.CHECKINOUT.GetFirstInLastOut)
        .subscribe((result) => {
            if (!result.Error) {
                this.DataInOut = result.Data;
            }
        });
  }
}
