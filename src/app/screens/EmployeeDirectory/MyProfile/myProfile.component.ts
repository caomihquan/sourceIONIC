/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
import  CommonConst from 'src/libs/constants/CommonConst.js';
import  FormatHandler from 'src/app/shared/handlers/FormatHandler.js';
import { CommonHandlerService } from 'projects/hrm-core/src/lib/services/handlers/CommonHandler.service';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-my-profile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  params: any;
  itemEmp: any;
  isShowDataEmpBasicInfoProfile = true;
  isShowDataEmpTrainBGRD = true;
  isShowDataEmpTrainCourse = true;
  isShowDataEmpWorking = true;
  isShowDataEmpBenefits = true;
  isShowDataEmpAward = true;
  isShowDataEmpDiscipline = true;
  isShowDataEmpFortune = true;
  isShowDataEmpInsurance = true;
  isShowDataEmpAllowance = true;
  PageIndex = 0;
  PageSize = 5;
  DataEmpAllowance = [];
  TotalItems = 0;
  currentItems = 0;
  isLoadMoreAllowance = false;

  constructor(private api: ApiHttpService,
    private translate: TranslateService,
    private auth: AuthStore,
    private activatedRoute: ActivatedRoute,
    private CommonHandler: CommonHandlerService,
    private notification: NotificationsService,
    private router: Router) {
    this.translate.use(this.auth.getLanguage());
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  state = {
    tabName: CommonConst.TAB.Info,
    DataEmpBasicInfoProfile: {},
    DataEmpTrainBGRD: [],
    DataEmpTrainCourse: [],
    DataEmpWorking: [],
    DataEmpBenefits: [],
    DataEmpAward: [],
    DataEmpDiscipline: [],
    DataEmpFortune: [],
    DataEmpInsurance: [],
    EmpCode: '',
    flag: 1,
    showMyTeam: false,
    IsVisibleByEmpDirectory:false,
    IsFieldVisibleJoinDate: false,
    IsFieldVisibleBirthday: false,
    IsFieldVisibleJobPosNameOld: false,
    IsShowNWardName:false,
    IsShowNDistrictName:false,
    IsShowNProvinceName:false,
    IsShowPWardName:false,
    IsShowPDistrictName:false,
    IsShowPProvinceName:false,
    IsShowTWardName:false,
    IsShowTDistrictName:false,
    IsShowTProvinceName:false
  };

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.state.EmpCode=params.get('id');
    });
    this.itemEmp = this.router.getCurrentNavigation().extras.state;
    this.state.flag = this.itemEmp.flag || 1 ;
    this.getConfigField();
    this.getEmpProfile();
  }
  formatString = (t) => {
    if (!t || t === '') {
      return t;
    }
    let str = '';
    t = t + '';
    this.translate.get('EMPLOYEEINFO').subscribe(res =>{
      str = t.replace(/@Year/g, res.Year)
      .replace(/@Month/g, res.Month)
      .replace(/@Day/g,res.Day);
    });
    return str;
  };
  getConfigField() {
    this.api.post(HrmAPIConst.MYPROFILE.GetConfigField,'Mobi.004',{FunctionID:'Mobi.004'})
    .subscribe((res) => {

        if (res && !res.Error) {
            const data = res.Data && res.Data.DataConfigFields || [];
            const data2 = res.Data && res.Data.DataConfigFields ?  res.Data.DataConfigFields.filter(n=>n.ModuleName === 'HrmInfoPer') : [];
            const IsFieldVisibleJoinDate = this.CommonHandler.getFieldVisible(data, 'JoinDate');
            const IsFieldVisibleBirthday = this.CommonHandler.getFieldVisible(data, 'Birthday');
            const IsFieldVisibleJobPosNameOld = this.CommonHandler.getFieldVisible(data, 'JobPosNameOld');
            this.state.IsFieldVisibleJoinDate= IsFieldVisibleJoinDate;
            this.state.IsFieldVisibleBirthday= IsFieldVisibleBirthday;
            this.state.IsFieldVisibleJobPosNameOld=IsFieldVisibleJobPosNameOld;
            if(data2.length > 0)
            {
                  //nguyên quán
                   this.state.IsShowNWardName= data2.filter(i=>i.FieldID === 'NWardName')[0].Visible;
                   this.state.IsShowNDistrictName= data2.filter(i=>i.FieldID === 'NDistrictName')[0].Visible;
                   this.state.IsShowNProvinceName= data2.filter(i=>i.FieldID === 'NProvinceName')[0].Visible;
                   //thường trú
                   this.state.IsShowPWardName= data2.filter(i=>i.FieldID === 'PWardName')[0].Visible;
                   this.state.IsShowPDistrictName= data2.filter(i=>i.FieldID === 'PDistrictName')[0].Visible;
                   this.state.IsShowPProvinceName= data2.filter(i=>i.FieldID === 'PProvinceName')[0].Visible;
                  //tạm trú
                   this.state.IsShowTWardName= data2.filter(i=>i.FieldID === 'TWardName')[0].Visible;
                   this.state.IsShowTDistrictName= data2.filter(i=>i.FieldID === 'TDistrictName')[0].Visible;
                   this.state.IsShowTProvinceName= data2.filter(i=>i.FieldID === 'TProvinceName')[0].Visible;
            }
            const dataGroup = data.length > 0 ? data.filter(n => n.ModuleName === 'HrmInfoPerGroup') : [];
            if(dataGroup.length > 0) {
              //this.isShowDataEmpBasicInfoProfile = !!dataGroup.find(x => x.FieldID === 'DataEmpBasicInfoProfile')?.Visible;
              this.isShowDataEmpTrainBGRD = dataGroup.filter(x => x.FieldID === 'DataEmpTrainBGRD').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpTrainBGRD')?.Visible : true;
              this.isShowDataEmpTrainCourse = dataGroup.filter(x => x.FieldID === 'DataEmpTrainCourse').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpTrainCourse')?.Visible : true;
              this.isShowDataEmpWorking = dataGroup.filter(x => x.FieldID === 'DataEmpWorking').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpWorking')?.Visible : true;
              this.isShowDataEmpBenefits = dataGroup.filter(x => x.FieldID === 'DataEmpBenefits').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpBenefits')?.Visible : true;
              this.isShowDataEmpAward = dataGroup.filter(x => x.FieldID === 'DataEmpAward').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpAward')?.Visible : true;
              this.isShowDataEmpDiscipline= dataGroup.filter(x => x.FieldID === 'DataEmpDiscipline').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpDiscipline')?.Visible : true;
              this.isShowDataEmpFortune = dataGroup.filter(x => x.FieldID === 'DataEmpFortune').length  > 0 ? !!dataGroup.find(x => x.FieldID === 'DataEmpFortune')?.Visible : true;
              this.isShowDataEmpInsurance = dataGroup.filter(x => x.FieldID === 'DataEmpInsurance').length  > 0  ? !!dataGroup.find(x => x.FieldID === 'DataEmpInsurance')?.Visible : true;
              this.isShowDataEmpAllowance = dataGroup.filter(x => x.FieldID === 'DataEmpAllowance').length  > 0  ? !!dataGroup.find(x => x.FieldID === 'DataEmpAllowance')?.Visible : true;
            }
        }
    });
  }

  getEmpProfile = async () => {
    const loading = await this.notification.showLoading();
    this.api.post(HrmAPIConst.MYPROFILE.GetEmpInfoProfile,null,{
        EmployeeCode:  this.state.EmpCode,
        Flag: this.state.flag
    }).subscribe((response) => {
        loading.dismiss();
        if (response && !response.Error && response.Data) {
            const res = response.Data;
            res.DataEmpBasicInfoProfile[0].ThamNien=this.formatString(res.DataEmpBasicInfoProfile[0].ThamNien);
            this.state.DataEmpBasicInfoProfile= res.DataEmpBasicInfoProfile[0];
            this.state.DataEmpTrainBGRD= res.DataEmpTrainBGRD;
            this.state.DataEmpTrainCourse= res.DataEmpTrainCourse;
            this.state.DataEmpWorking= res.DataEmpWorking;
            this.state.DataEmpBenefits= res.DataEmpBenefits;
            this.state.DataEmpAward= res.DataEmpAward;
            this.state.DataEmpDiscipline= res.DataEmpDiscipline;
            this.state.DataEmpFortune= res.DataEmpFortune;
            this.state.DataEmpInsurance= res.DataEmpInsurance;
            this.getAllowance().subscribe();
        }
    },error => loading.dismiss());
  };


  getAllowance(): Observable<any> {
    return this.api.post(HrmAPIConst.MYPROFILE.GetListEmpAllowance,null,{
      PageIndex: this.PageIndex,
      PageSize: this.PageSize
    }).pipe(map(response => {
      if (response && !response.Error && response.Data) {
        const data = response.Data;
        const currentData = data.Data || [];
        const outputParams = data.OutputParams || {};
        this.TotalItems = outputParams[CommonConst.KEY.TotalItems];
        this.currentItems += currentData.length;
        this.DataEmpAllowance = [...this.DataEmpAllowance,...currentData];
      }
    }));
  };
  loadMore(){
    this.isLoadMoreAllowance = true;
    if (this.currentItems < this.TotalItems) {
      this.PageIndex++;
      this.getAllowance().subscribe(() => {
        this.isLoadMoreAllowance = false;
      });
    }
    else{
      this.isLoadMoreAllowance = false;
    }

  }

  FormatCurrency(item){
    return FormatHandler.formatNum(item, this.auth.get(), 'p');
  }

}
