import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckInOutComponent } from './CheckInOut.component';
import { CheckInOutHistoryComponent } from './CheckInOutHistory/CheckInOutHistory.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
const routes: Routes = [{
  path:'',
  children: [
    {
      path: '',
      component:CheckInOutComponent
    },
    {
      path:'CheckInOutHistory',
      component:CheckInOutHistoryComponent
    }
  ]
}
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CheckInOutComponent,CheckInOutHistoryComponent],
  imports: [
    CommonModule,
    IonicModule,
    HrmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes)
  ]

})
export class CheckInOutModule { }
