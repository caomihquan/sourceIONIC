import {
  Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import { IPConfig } from 'src/IPConfig';
import { ApiHttpService } from '../../services';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';

import HrmStorageConst from 'src/libs/constants/HrmStorageConst.js';
import HrmStorage from 'src/libs/core/HrmStorage.js';



export interface Item {
  title: string;
  id: string | number;
  children?: Item[];
  parent?: string|number;
}
@Component({
  selector: 'app-card-emp',
  templateUrl: './cardEmp.component.html',
  styleUrls: ['./cardEmp.component.scss']
})
export class HrmCardEmpComponent {
  @Input() IsPhoneMail = false;
  @Input() data: any;
  @Input() EmpCode : string;
  @Input() backgroundColor: string = '#fafafa'
  @Input() showTeam:boolean;
  @Input() arraySearch: Array<string> = [];
  @Output() clickTeam: EventEmitter<any> = new EventEmitter();;
  //local variable
  oDatas:Array<any> = [];
  dataInfoEmp:[];
  showCall:boolean;
  showMail:boolean;
  PhotoID:string
  listEmps:any;
  IsVisibleModal = false;
  searchText: string;

  constructor(private api: ApiHttpService) {

  }
  ngOnInit() {
    this.getEmpProfile();
    this.getListEmpManager();
  }
  ConvertPhotoUrl(photoID){
    const apiIMG = IPConfig.IP + "Utility/EmpPhoto?id=";
    if (photoID) {
        return apiIMG + window.btoa(photoID);
    }
    else return apiIMG;
  }

  getEmpProfile(){
    var me = this;
    var itemEmp =  HrmStorage.getData(HrmStorageConst.ItemMyEmployees);
    let EmployeeCode = this.EmpCode;
    if (itemEmp) {
        EmployeeCode = itemEmp.EmployeeCode
    }
    if (EmployeeCode) {
        this.api.post(HrmAPIConst.EMPLOYEE.GetBasicProfile,null,{
          EmployeeCode: EmployeeCode
      }).subscribe((result) => {
            if (!result.Error) {
                const data = result.Data || {};
                const dataInfoEmp = data.DataEmpBasicInfoProfile && data.DataEmpBasicInfoProfile[0] || {};
                this.dataInfoEmp = dataInfoEmp;
                this.showCall= dataInfoEmp.Mobile ? true : false
                this.showMail= dataInfoEmp.Email ? true : false
                this.PhotoID = dataInfoEmp && dataInfoEmp.PhotoID
            }
        });
    }
    else {
        let basicProfile =HrmStorage.getData(HrmStorageConst.BasicProfile)
        me.dataInfoEmp= basicProfile;
        me.PhotoID= basicProfile && basicProfile.PhotoID;
    }
  }

  getListEmpManager(){
    const me = this;
    this.api.post(HrmAPIConst.EMPLOYEE.GetListEmpByManage)
        .subscribe((res) => {
            if (res && res.Data) {
                me.listEmps = res.Data
                HrmStorage.deleteData(HrmStorageConst.ItemMyEmployees);
            }
        });
  }

  clickListEmpManager(emp){
    this.clickTeam.next(emp.EmployeeCode)
    HrmStorage.setData(HrmStorageConst.ItemMyEmployees, emp);
    this.dataInfoEmp = emp
    this.showCall= emp.Mobile ? true : false
    this.showMail= emp.Email ? true : false
    this.PhotoID= emp && emp.PhotoID
    this.setOpenModal(false)
  }

  onPressShowCall = async (mobile) => {
    if (!mobile) {return;}
    const messege = 'tel:' + mobile;
    window.location.href = messege;
  };
  onPressShowMail = async (mail) => {
    if (!mail) {return;}
      const messege = 'mailto:' + mail;
      window.location.href = messege;
  };


  setOpenModal(isOpen: boolean) {
    this.IsVisibleModal = isOpen;
  }

  search() {
    if(this.oDatas.length === 0){
      this.oDatas = this.listEmps
    }
    if (!this.searchText) {
      this.listEmps = this.oDatas
    }
    else{
      var data = JSON.parse(JSON.stringify(this.oDatas))
      var dataFilters = [];
      for (var j = 0; j < this.arraySearch.length; j++) {
          for (var i = 0; i < data.length; i++) {
              if (data[i][this.arraySearch[j]] && data[i][this.arraySearch[j]].toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 && dataFilters.indexOf(data[i]) == -1) {
                  dataFilters.push(data[i]);
              }
          }
      }
      this.listEmps = dataFilters
    }
  }
}
