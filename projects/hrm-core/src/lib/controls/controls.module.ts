import { ValuelistModalComponent } from './valuelist/modal/valuelist-modal/valuelist-modal.component';
import { HrmValuelistSelectComponent } from './valuelist-select/valuelist-select.component';
import { IonicModule } from '@ionic/angular';
import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrmCalendarComponent } from './calendar/hrm-calendar.component';
import { FormsModule } from '@angular/forms';
import { NgCalendarModule } from 'ionic2-calendar';
import { HrmListviewComponent } from './listview/listview.component';
import { HrmValuelistComponent } from './valuelist/valuelist.component';
import { TranslateModule } from '@ngx-translate/core';
import { HrmTreeviewComponent } from './treeview/treeview.component';
import { HrmCardEmpComponent } from './cardEmp/cardEmp.component';
import { HrmStandardHeaderComponent } from './StandardHeader/StandardHeader.component';
import { DateEventModalComponent } from './calendar/modals/date-event-modal/date-event-modal.component';
import { InputDateModalComponent } from './calendar/modals/input-date-modal/input-date-modal.component';
import { HrmModelSelectedComponent } from './modal-selected/modal-selected.component';

import { datetimeModalComponent } from './datetime/datetime-modal.component';
import { timeModalComponent } from './time/time-modal.component';
import { HrmTimeLineComponent } from './timeline/timeline.component';

import { HrmModelSelectedMultiComponent } from './modal-selected_multi/modal-selected-multi.component';
import { HrmModelAttachMultiComponent } from './modal-attach_multi/modal-attach-multi.component';
import { HrmModelFilterEmpComponent } from './modal-filter-emp/modal-filter-emp.component';
import { LongPressDirective } from './directives/longpress.directive';

const COMPONENT: Type<any>[] = [
  HrmCalendarComponent,
  HrmListviewComponent,
  HrmValuelistSelectComponent,
  HrmValuelistComponent,
  HrmTreeviewComponent,
  HrmCardEmpComponent,
  HrmStandardHeaderComponent,
  DateEventModalComponent,
  HrmModelSelectedComponent,
  HrmTimeLineComponent,
  //Popup dependence
  datetimeModalComponent,
  timeModalComponent,
  ValuelistModalComponent,
  InputDateModalComponent,
  HrmModelSelectedMultiComponent,
  HrmModelAttachMultiComponent,
  HrmModelFilterEmpComponent,
  LongPressDirective
];

const MODULES: Type<any>[] = [
  NgCalendarModule,
];
@NgModule({
  declarations: [COMPONENT],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgCalendarModule,
    TranslateModule,
    ...MODULES
  ],
  exports: [MODULES, ...COMPONENT],
  // providers:[
  //   NgCalendarModule,
  //   {
  //     provide:LOCALE_ID, useValue: 'fr-FR'
  //   },
  // ],
})
export class ControlsModule { }
