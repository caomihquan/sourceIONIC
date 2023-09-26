/* eslint-disable @typescript-eslint/naming-convention */

import { AuthStore } from '../../../../projects/hrm-core/src/lib/services/auth/auth.store';
import { ApiHttpService } from '../../../../projects/hrm-core/src/lib/services/apihttp/apihttp.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService,} from '@ngx-translate/core';
import HrmStorage from '../../../libs/core/HrmStorage';
import { ItemReorderEventDetail } from '@ionic/angular';
import  HrmAPIConst from 'src/libs/constants/HrmAPIConst.js';
@Component({
  selector: 'app-face-config',
  templateUrl: './Favorites.component.html',
  styleUrls: ['./Favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  isToastOpen = false;
  message = 'Khong support';
  listFavorites = [];
  listFunction = [];
  listFunctionFilter = [];

  constructor(private authStore: AuthStore,
    private api: ApiHttpService,
    private translate: TranslateService){
    this.translate.addLangs(['en', 'vn']);
    this.translate.use(this.authStore.getLanguage());
  }
  ngOnInit() {
    this.getListFavorite();
    this.loadFunction();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    const itemFrom = {...this.listFavorites[ev.detail.from]};
    const itemTo = {...this.listFavorites[ev.detail.to]};
    this.listFavorites.map((item) => {
        if(item.FunctionID === this.listFavorites[ev.detail.from].FunctionID){
          item.Sorting = itemTo.Sorting;
        }
        if(item.FunctionID === this.listFavorites[ev.detail.to].FunctionID){
          item.Sorting = itemFrom.Sorting;
        }
        return item;
    });
    HrmStorage.setData('ListFavorites',this.listFavorites.sort((a,b) => a.Sorting - b.Sorting));
    ev.detail.complete();
  }

  getListFavorite(){
    this.listFavorites = HrmStorage.getData('ListFavorites');
  }

  deleteItem(item){
    if(this.listFavorites.length === 1) {return;};
    this.listFavorites = this.listFavorites.filter((x) => x.FunctionID !== item.FunctionID);
    this.listFavorites.sort((a,b) => a.Sorting - b.Sorting).map((x, i) => {
      x.Sorting = i;
      return x;
    });
    HrmStorage.setData('ListFavorites',this.listFavorites);
    const itemFunction = this.listFunction.find(x => x.FunctionID === item.FunctionID);
    this.listFunctionFilter.push(itemFunction);
  }

  loadFunction() {
    this.api.post(HrmAPIConst.HOMEPAGE.FunctionList,null,{ Language: this.authStore.getLanguage()})
        .subscribe((res) => {
         this.listFunction = res.Data.ListFunction;
         this.listFunctionFilter = res.Data.ListFunction.filter(x => !this.listFavorites.some(y => x.FunctionID === y.FunctionID));
      });
  }

  onClickItem(item: any){
    if(this.listFavorites.length >= 4) {return;}
    const ArrayFv = [...this.listFavorites].map(x => x.Sorting);
    const objData = {
      Sorting:ArrayFv.length > 0 ? (Math.max(...ArrayFv)+1) : 0,
      FunctionID:item.FunctionID,
      Name:item.DefaultName
    };
    this.listFavorites.push(objData);
    HrmStorage.setData('ListFavorites',this.listFavorites);
    this.listFunctionFilter = this.listFunctionFilter.filter(x => x.FunctionID !== item.FunctionID);
  }


}

