import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLeaveRequestComponent } from './MyLeaveRequest.component';
import { LeaveRequestDetailComponent } from './details/LeaveRequestDetail.component';
import { LeaveRequestCreateComponent } from './create/LeaveRequestCreate.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'LeaveRequestDetail',
      component: LeaveRequestDetailComponent
    },
    {
      path: 'LeaveRequestCreate',
      component: LeaveRequestCreateComponent
    },
    {
      path: '',
      component: MyLeaveRequestComponent
    }
  ]
}
];

@NgModule({
  declarations: [MyLeaveRequestComponent, LeaveRequestDetailComponent,LeaveRequestCreateComponent],
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
export class MyLeaveRequestModule { }
