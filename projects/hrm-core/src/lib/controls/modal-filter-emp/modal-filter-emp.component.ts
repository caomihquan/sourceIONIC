import { Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiHttpService, AuthStore } from 'projects/hrm-core/src/public-api';
import { NotificationsService } from 'projects/hrm-core/src/lib/services/notifications/notifications.service';
import { LanguageService } from 'projects/hrm-core/src/lib/services/language/language.service';
import CommonConst from '../../../../../../src/libs/constants/CommonConst.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-filter-emp',
  templateUrl: './modal-filter-emp.component.html',
  styleUrls: ['./modal-filter-emp.component.scss'],
})
export class HrmModelFilterEmpComponent implements OnInit {
  @HostBinding('attr.width') width = '100%';
  @Input() searchText:any;
  @Input() title:string;
  @Input() idOpen: string;
  @Input() template: TemplateRef<any>;
  @Input() lines: boolean = true;
  @Input() height:string;
  @Input() datas: Array<any> = [];
  @Input() dataKow: Array<any> = [];
  @Input() FilterEmployeeForManagerSelected: any ={};
  @Input() ParamsEmployee: any ={};
  @Input() FunctionInfo: any = {};

  @Input() datasOut: Array<any> = [];
  @Input() classListItem = '';
  @Input() textLeft;

  @Input() arraySearch: Array<string>=[];
  @Output() selectedItem = new EventEmitter();
  @Input() FunctionID = '';

  @Output() onSubmitDialog = new EventEmitter();
  @Output() onSubmitDataDialog = new EventEmitter();
  @Output() afterSearch = new EventEmitter();
  CheckAll  = false;
  Caption = "Caption"
  @Input() iPage;
  Options ={};
  currentItems = 0;
  TotalItems = 0;
  //local params
  oDatas: Array<any> = [];
  constructor(
    private api: ApiHttpService,

    public notification: NotificationsService) { }

  InitOption()
  {
    return {
      PageIndex: 0,
      PageSize: CommonConst.VALUE.PageSize,
      TotalPages: 0,
      FunctionID: this.FunctionID,
      FilterText : this.searchText ? this.searchText : '',
      IsDirectEmployee : false,
      IsInDirectEmployee : false,
      IsDepartmentID : false
    }
  }
  ngOnInit() {
    this.Options = this.InitOption();
    this.ParamsEmployee = this.InitOption();
    this.eventOnSelectedFilterEmployeeForManager(this.dataKow[0])


  }
  LoadListEmployeeAll(): Observable<any>{
    return this.api.post("HrmMobileApp/Employee/GetListEmployeeForManagerCode", "GetListEmployeeForManagerCode",
    {
      PageIndex: 0,
      PageSize: 9999999999,
      TotalPages: 0,
      FunctionID: this.FunctionID,
      FilterText : this.searchText ? this.searchText : '',
      IsDirectEmployee : false,
      IsInDirectEmployee : false,
      IsDepartmentID : false
    })
    .pipe(map(res => {
        if(res && !res.Error)
        {
          const currentData = res.Data;
          this.datas = [...this.datas,...currentData.Data]
          this.oDatas = this.datas;
          const outputParams = currentData.OutputParams || {};
          const totalItems = outputParams[CommonConst.KEY.TotalItems];
          this.TotalItems = totalItems;
          this.currentItems += currentData.Data.length ;
        }
    }))
  }

  LoadListEmployee(): Observable<any>{
    return this.api.post("HrmMobileApp/Employee/GetListEmployeeForManagerCode", "GetListEmployeeForManagerCode",
    this.ParamsEmployee)
    .pipe(map(res => {
        if(res && !res.Error)
        {
          const currentData = res.Data;
          this.datas = [...this.datas,...currentData.Data]
          this.oDatas = this.datas;
          const outputParams = currentData.OutputParams || {};
          const totalItems = outputParams[CommonConst.KEY.TotalItems];
          this.TotalItems = totalItems;
          this.currentItems += currentData.Data.length ;
        }
    }))
  }
  eventOnSelectedFilterEmployeeForManager(item) {
    if (item && item["Value"]) {
        const value = item["Value"];
        this.datas = [];
        this.oDatas = [];
        this.ParamsEmployee = this.InitOption();
        const params = this.ParamsEmployee;
        let isDirectEmployee = 1;
        let isInDirectEmployee = 1;
        let isDepartmentID = 1;
        switch ((value + "")) {
            case "0":
                isDirectEmployee = 1;
                isInDirectEmployee = 1;
                isDepartmentID = 1;
                break;
            case "1":
                isDirectEmployee = 1;
                isInDirectEmployee = 0;
                isDepartmentID = 0;
                break;
            case "2":
                isDirectEmployee = 0;
                isInDirectEmployee = 1;
                isDepartmentID = 0;
                break;
            case "3":
                isDirectEmployee = 0;
                isInDirectEmployee = 0;
                isDepartmentID = 1;
                break;
            default:
                isDirectEmployee = 1;
                isInDirectEmployee = 1;
                isDepartmentID = 1;
                break;
        }
        params.IsDirectEmployee = isDirectEmployee;
        params.IsInDirectEmployee = isInDirectEmployee;
        params.IsDepartmentID = isDepartmentID;
        this.ParamsEmployee = params,
        this.FilterEmployeeForManagerSelected = item
        this.LoadListEmployee().subscribe();
    }
  }

  selectMember(){
     this.CheckAll =  !this.CheckAll;
     this.datas = this.datas.map( x => {
      x.checked = this.CheckAll
      return x
     });
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

  BeforePopUp(){
    if(this.datasOut.length < 1){
      this.datas.filter(x => x['checked'] = false)
      return;
    }
    //
    if(this.datas && this.datas.length > 0){
      this.datas.filter(x => x['checked'] = false)
      for(let i = 0; i < this.datas.length; i++){
        for(let j =0 ; j <this.datasOut.length;j++){
          if(this.datas[i].EmployeeCode === this.datasOut[j].EmployeeCode){
            this.datas[i]['checked'] = true;
          }
        }
      }
    }
  }
  SubmitDialog(callback){
    //const options=this.InitOption()
    let data  = this.datas.filter(n => n.checked === true);
    this.onSubmitDataDialog.emit([...data,{CheckedAll:this.CheckAll}]);
    // this.api.post("HrmMobileApp/CnB/BusinessTripRequest/UpdateEmployeeFilter", "UpdateEmployeeFilter",
    //   {
    //     EmployeeCode: data.map(({ EmployeeCode }) => EmployeeCode).toString(),
    //     Kind: this.FilterEmployeeForManagerSelected?.Value || 0,
    //     FunctionID: this.FunctionID,
    //     IsCheckAll: this.CheckAll || false,
    //     iPage: this.iPage,
    //     PageIndex: this.Options["PageIndex"],
    //     PageSize: this.Options["PageSize"],
    //   }
    // )
    // .subscribe((result) => {
    //   if (!result.IsError) {
    //     const currentData = result.Data || {};
    //     const listEmployee = currentData.Data;
    //     const outputParams = currentData.OutputParams || {};
    //     const totalPages = outputParams[CommonConst.KEY.TotalPages];
    //     const totalItems = outputParams[CommonConst.KEY.TotalItems];
    //     options["TotalPages"] = totalPages;
    //     options["OnScrolling"] = false;
    //     options["IsFull"] = options["PageIndex"] + 1 >= totalPages;
    //     if(!options["IsFull"])
    //     {
    //       options["PageIndex"]++;
    //     }
    //     this.CheckAll = false;
    //     this.Options = options;
    //     this.onSubmitDialog.emit(listEmployee);
    //   }
    // })
  }
  CancelDialog(callback){
    if(callback)
      callback
  }
  loadMore(event){
    if (this.currentItems < this.TotalItems) {
      this.ParamsEmployee.PageIndex++;
      this.LoadListEmployee().subscribe(res => {
        event.target.complete();
      });
    }
    else{
      event.target.disabled = true;
    }
  }

}
