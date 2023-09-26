import {Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportService{

  $params = new Subject<any>();
  constructor() {}


  eventReloadData(item) {
    if (item) {
        this.$params.next(item);
    }
  }

}
