import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CacheService } from '../../services/cache/cache.service';
import { ValuelistModalComponent } from './modal/valuelist-modal/valuelist-modal.component';

@Component({
  selector: 'valuelist',
  templateUrl: './valuelist.component.html',
  styleUrls: ['./valuelist.component.scss'],
})
export class HrmValuelistComponent implements OnInit {
  @Input() datas: Array<any> = [];
  @Input() value: any;
  @Input() isMulti = false;
  @Input() template: TemplateRef<any>;

  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  IsVisibleModal= false;
  constructor(private cache: CacheService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.datas = [{
      text: 'Call of Duty',
      value: 1
    },
    {
      text: 'Half-life',
      value: 2
    },
    {
      text: 'Cf go',
      value: 3
    }
    ]

  }

  valueChange(e) {
    let value = e.target.value;
    let obj = this.datas.find(x => x.value == value);
    this.valueChanged.emit(obj);
  }


}
