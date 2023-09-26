
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VariableCommonService{
  $countNotification = new Subject<number>();
  $reloadFunction = new Subject<boolean>();
  constructor() { }

  UpdateCountNotification(number) {
    this.$countNotification.next(number)
  }
}
