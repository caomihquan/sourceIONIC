import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'valuelist-select',
  templateUrl: './valuelist-select.component.html',
  styleUrls: ['./valuelist-select.component.scss'],
})
export class HrmValuelistSelectComponent implements OnInit {
  @Input() selectedItem: any;

  @Input() key: string;
  @Input() value: any;
  @Input() field: string;
  @Input() IsFreeText:boolean = false;
  @Output() dataEmit: EventEmitter<any> = new EventEmitter();

  objDatas = new BehaviorSubject<any>(null);

  datas: any[] = [];
  datasOutPut: any[] = [];
  checkDataText: string;

  constructor(private cache: CacheService) { }

  ngOnInit() {
    this.datas = [{
      text: 'abc'
    },
    {
      text: 'def'
    },
    {
      text: 'ghi'
    }]
    // this.cache.valueList(this.key).subscribe(res => {
    //   this.datas = res.datas;

    //   this.datas.filter(function (x) {
    //     x['selected'] = '';
    //     x['checked'] = false;
    //   });

    //   this.objDatas.next(this.datas);

    // });

    if (this.selectedItem) {
      let item = this.datas.find(x => x.value == this.selectedItem.value);
      if (item) {
        item['selected'] = 'selected';
        item['checked'] = true;
        this.dataEmit.emit(item);
      }
    }
  }

  selectItem(item) {
    this.datas.filter(x => x['checked'] = false);
    item['checked'] = true;
    item['selected'] = 'selected';
    this.dataEmit.emit(item);
  }
}
