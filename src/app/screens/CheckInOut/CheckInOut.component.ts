/* eslint-disable @typescript-eslint/naming-convention */
import { AuthStore } from './../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from './../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  EmployeeAttendanceConst from 'src/app/shared/constants/EmployeeAttendanceConst.js';
import HrmStorage from '../../../libs/core/HrmStorage';
import HrmStorageConst from '../../../libs/constants/HrmStorageConst';
import { Router} from '@angular/router';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import * as moment from 'moment';
import { Geolocation, GeolocationPluginPermissions } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import { IPConfig } from 'src/IPConfig';
import { GoogleMap } from '@capacitor/google-maps';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
@Component({
  selector: 'app-checkinout',
  templateUrl: './CheckInOut.component.html',
  styleUrls: ['./CheckInOut.component.scss'],
})
export class CheckInOutComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  IsCheckIn = false;
  IsCheckOut = false;
  IsViewMap = false;
  IsGetViewMapLocation = false;
  distanceFromConfig = '';
  user: any;
  itemFunction: any;
  IsNotCheckLocation: boolean;
  ConfigWithUser: any;
  DateTime: any;
  interval: any;
  Time: any;
  DataInOut;
  LocationCoords;
  LocationReverse;;
  CurrentAddress;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  DeviceInfo: any;
  Lang: any;
  AppInfor: any;
  fileBase64: any;
  img;
  permissions: GeolocationPluginPermissions;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private authStore: AuthStore,
    private translate: TranslateService,
    private api: ApiHttpService,
    private router: Router,
    private notifications: NotificationsService,
    public CommonHandler: CommonHandlerService,
    private nativeGeocoder: NativeGeocoder,
    private diagnostic: Diagnostic,
    public platform: Platform,
    private languageService: LanguageService){
    //
    this.user = this.authStore.get();
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
    Device.getInfo().then(x =>this.DeviceInfo = x);
    App.getInfo().then(x =>this.AppInfor = x).catch(err => null);
    App.addListener('appStateChange', (state) => {
      if(state.isActive){
        this.getConfig();
      }
    });
  }

  ngOnInit() {
    this.itemFunction = this.router.getCurrentNavigation()?.extras?.state;
    this.getLanguage();
  }
  getLanguage = async () =>{
    this.Lang = await this.languageService.getLanguage();
    this.getConfig();
    this.getDateTime();
    this.getFirstInLastOut();
    this.initAuditLogActiveHome();
  };

  mapCreate = async () =>{
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: IPConfig.GoogleMapsApiKey,
      forceCreate:true,
      config: {
        center: {
          lat: this.geoLatitude,
          lng: this.geoLongitude
        },
        zoom: 20,
      },
    });
    this.newMap.enableCurrentLocation(true);
    this.newMap.setCamera({
      coordinate:{
        lat: this.geoLatitude,
        lng: this.geoLongitude
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('unloaded')
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    App.removeAllListeners();
  }


  getLocationAsync = async () => {
    //Check location whether enable or not
    const servicLocation = await this.diagnostic.isLocationEnabled();
    if(!servicLocation){
      this.notifications.alert(this.Lang.COMMON.Error,this.Lang.CHECKINOUT.PermissionToAccessDenied,()=>{
        this.diagnostic.switchToLocationSettings();
      });
      return;
    }
    //Kiểm tra cấp quyền vị trí cho app
      const {location} = await Geolocation.checkPermissions();
      if (location !== 'granted') {
        this.alertPermissionLocation();
        return;
      }
      const position = await Geolocation.getCurrentPosition();
      if (!position || !position.coords) {
        this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.LocationIsNotAvailable);
        return;
      }
      this.geoLatitude = position.coords.latitude;
      this.geoLongitude = position.coords.longitude;
      this.geoAccuracy = position.coords.accuracy;
      this.LocationCoords = position.coords;
      this.getGeoencoder(position.coords.latitude,position.coords.longitude);
  };


  onPressCloseMap = () => {
      this.IsViewMap = false;
      this.IsGetViewMapLocation =false;
  };

  TakePicture = async (type) => {
    const capturedPhoto = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      width:600,
      height:600,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    const image = this.getBase64StringFromDataURL(capturedPhoto.dataUrl);
    if(type === 'CheckIn'){
      this.doCheckIn(image);
    }
    else{
        this.doCheckOut(image);
    }
  };
  getBase64StringFromDataURL = (dataURL) =>
  dataURL.replace('data:', '').replace(/^.+,/, '');

  alertPermissionLocation = () => {
      const me = this;
      this.notifications.alert(this.Lang.COMMON.Alert,
      this.Lang.CHECKINOUT.PermissionToAccessDenied,async () => {
        const {location} = await Geolocation.requestPermissions({permissions:['location','coarseLocation']});
        if(location === 'granted'){
          me.getLocationAsync();
        }
      });
  };
  refreshLocation = async () => {
    const {location} = await Geolocation.checkPermissions();
    if (location !== 'granted') {
      this.alertPermissionLocation();
      return;
    }
    const position = await Geolocation.getCurrentPosition();
    if (!position || !position.coords) {
      this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.LocationIsNotAvailable);
      return;
    }
    this.geoLatitude = position.coords.latitude;
    this.geoLongitude = position.coords.longitude;
    this.geoAccuracy = position.coords.accuracy;
    this.LocationCoords = position.coords;
    this.newMap.setCamera({
      coordinate:{
        lat:position.coords.latitude,
        lng:position.coords.longitude
      }
    });
    this.getGeoencoder(position.coords.latitude,position.coords.longitude);
  };

  CheckInInMap = () =>{
    this.doCheckIn();
  };
  CheckOutInMap = () => {
      this.doCheckOut();
  };


  generateAddress(addressObj){
    const obj = [];
    let address = '';
    // eslint-disable-next-line guard-for-in
    for (const key in addressObj) {
      if(key !== 'areasOfInterest'){
        obj.push(addressObj[key]);
      }
    }
    obj.reverse();
    for (const val in obj) {
      if(obj[val].length)
      {address += obj[val]+', ';}
    }
    return address.slice(0,-2);
  }
  getGeoencoder = async (lat,long) =>{
    const Config = HrmStorage.getData(HrmStorageConst.ConfigWithUser);
    if(Config && Config.Lng > 0 && Config.Lat > 0){
      const distance = this.getDistanceFromLatLonInMeters(
          Config.Lat,
          Config.Lng,
          lat,
          long
      );
      if(distance > 0){
          this.distanceFromConfig = (distance.toFixed(2) + 'm') ;
      }
      if(!Config.Lat && !Config.Lng){
        this.distanceFromConfig = '';
      }
    }
    const address = await this.nativeGeocoder.reverseGeocode(lat,long,this.geoencoderOptions);
    if(address && address.length > 0){
      this.CurrentAddress = this.generateAddress(address[0]);
    }
  };

  getConfig(){
    const Config = HrmStorage.getData(HrmStorageConst.ConfigWithUser);
    let IsNotCheckL = true;
    if (Config && (Config.CheckInOutType === '2' || Config.CheckInOutType === '3')) {
        IsNotCheckL = false;
    }
    this.IsNotCheckLocation = IsNotCheckL;
    this.ConfigWithUser = Config;
    // Nếu hệ thống có dùng location (global) hoặc check dùng GPS
    if (!IsNotCheckL || (Config && (Config.CheckInOutType === '2' || Config.CheckInOutType === '3'))) {
      this.getLocationAsync();
    }
  };
  getDateTime() {
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_GetDateTime, HrmAPIConst.CHECKINOUT.GetDateTime)
        .subscribe((result) => {
            if (!result.Error) {
                const data = result && result.Data || {};
                this.DateTime = data && data.DateTime;
                const dateTime = new Date(data.YYYY, data.MM - 1, data.dd, data.HH, data.Mi, 0).getTime();
                this.setIntervalTime(dateTime, data);
            }
        });
  }
  setIntervalTime(timeSpan, data) {
    this.interval = setInterval(() => {
        data.SS = data.SS + 1;
        if (data.SS > 59) {
            data.SS = 0;
            data.Mi = data.Mi + 1;
        }
        if (data.Mi > 59) {
            data.Mi = 0;
            data.HH = data.HH + 1;
        }
        timeSpan = timeSpan + 1000;
        const time = this.getTime(data, timeSpan);
        this.Time = time;
    }, 1000);
  }

  getTime = (data, dateTime) => {
    const momentJS = moment(dateTime);
    let hh = data.HH;
    if (hh < 10) {
        hh = '0' + data.HH;
    }
    let Mi = data.Mi;
    if (Mi < 10) {
        Mi = '0' + data.Mi;
    }
    return {
        Year: momentJS.format('YYYY'),
        Month: momentJS.format('MMM'),
        Day: momentJS.format('dddd'),
        dd: momentJS.format('DD'),
        Hours: hh,
        Minutes: Mi
    };
  };

  getFirstInLastOut() {
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_GetFirstInLastOut, HrmAPIConst.CHECKINOUT.GetFirstInLastOut)
        .subscribe((result) => {
            if (!result.Error) {
                this.DataInOut = result.Data;
            }
        });
  }

  initAuditLogActiveHome = () => {
    const paramsRequest = {
        Type: EmployeeAttendanceConst.HomeInOut,
        Longitude: 0,
        Latitude: 0,
        Accuracy: 0,
        Speed: 0,
        Image: '',
        IsCheckInByLocation: true
    };
    this.doAuditEventCheckInOut(paramsRequest);
  };

  doAuditEventCheckInOut = (params) => {
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_AuditEventCheckInOut, HrmAPIConst.CHECKINOUT.AuditEventCheckInOut,params)
        .subscribe();
  };
  pushCheckInOutHistory(){
    this.router.navigate([`CheckInOut/${CommonConst.SCENE.CheckInOutHistory}`]);
  }


  doCheckInOut(type, image) {
    let locationCoords = this.LocationCoords;
    if (!this.IsNotCheckLocation) {
        if (!locationCoords ||
            !locationCoords[EmployeeAttendanceConst.COORDS.longitude] ||
            !locationCoords[EmployeeAttendanceConst.COORDS.latitude]) {
            this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.NOTIFY.LocationIsNotAvailable);
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

    const isCheckInByCamera = HrmStorage.getData(HrmStorageConst.ConfigWithUser) ?
    HrmStorage.getData(HrmStorageConst.ConfigWithUser).IsCheckinByCamera : false;

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
        Longitude: this.geoLongitude,
        Latitude: this.geoLatitude,
        Accuracy: locationCoords[EmployeeAttendanceConst.COORDS.accuracy],
        Speed: locationCoords[EmployeeAttendanceConst.COORDS.speed],
        Image: image,
        IsCheckInByLocation: true,
        IsCheckInByCamera: isCheckInByCamera,
        sPlatform: JSON.stringify(platForm),
        DeviceInfo: JSON.stringify(deviceInfo),
        ExpoToken: this.authStore.get().TokenID,
        AppVersion: this.AppInfor?.version,
        AddressByLocation:this.CurrentAddress
    };
    this.doAuditEventCheckInOut(paramsRequest);
    this.api.post(HrmAPIConst.CHECKINOUT.Alias_CheckInOut, HrmAPIConst.CHECKINOUT.CheckInOut,paramsRequest)
        .subscribe((result) => {
            if (result?.Data) {
                if (!result.Data.IsErrorRespone) {
                    if (EmployeeAttendanceConst.CheckIn === type) {
                        this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT.CheckInSuccess);
                    }
                    else {
                        this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT.CheckOutSuccess);
                    }
                    this.getFirstInLastOut();
                }else {
                    this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT[result.Data.ErrorCodeRespone]);
                }
            } else {
                this.notifications.alert(this.Lang.COMMON.Alert,this.Lang.CHECKINOUT.DataInvalid);
            }
            this.IsViewMap = false;
            this.IsGetViewMapLocation = true;
        });
  }




  doCheckIn(image?){
    this.doCheckInOut(EmployeeAttendanceConst.CheckIn, image);
  }

  doCheckOut(image?){
    this.doCheckInOut(EmployeeAttendanceConst.CheckOut, image);
  }

  eventOnCheckIn = async () => {
    const config = HrmStorage.getData(HrmStorageConst.ConfigWithUser);
    if (config && config.IsCheckinByCamera) {
      this.TakePicture(EmployeeAttendanceConst.CheckIn);
    }
    else if ((config && (config.CheckInOutType === '2' || config.CheckInOutType === '3'))){
      if (JSON.stringify(this.LocationCoords) === '{}') {
          const location = await Geolocation.getCurrentPosition({
            enableHighAccuracy:false
          });
          if (!location || !location.coords) {
              this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.LocationIsNotAvailable);
              return;
          }
      }
      this.IsCheckIn = true;
      this.IsCheckOut = false;
      this.IsViewMap = true;
      this.IsGetViewMapLocation= false;
      this.mapCreate();
    } else {
        this.doCheckIn();
    }
  };

  eventOnCheckOut = async () => {
      const config = HrmStorage.getData(HrmStorageConst.ConfigWithUser);
      if (config && config.IsCheckinByCamera) {
          this.TakePicture(EmployeeAttendanceConst.CheckOut);
      } else if ((config && (config.CheckInOutType === '2' || config.CheckInOutType === '3'))){
        if (JSON.stringify(this.LocationCoords) === '{}') {
            const location = await Geolocation.getCurrentPosition({
              enableHighAccuracy:false
            });
            if (!location || !location.coords) {
                this.notifications.alert(this.Lang.COMMON.Error,this.Lang.NOTIFY.LocationIsNotAvailable);
                return;
            }
        }
        this.IsCheckIn = false;
        this.IsCheckOut = true;
        this.IsViewMap = true;
        this.IsGetViewMapLocation= false;
        this.mapCreate();
      }else {
          this.doCheckOut();
      }
  };

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Radius of the earth in meters
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in meters
      return d;
  }

}

