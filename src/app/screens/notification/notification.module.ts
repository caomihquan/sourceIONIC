import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification.component';
import { NotificationDetailComponent } from './notificationDetail/notificationDetail.component';
const routes: Routes = [{
  path:'',
  children: [
    {
      path: '',
      component:NotificationComponent
    },
    {
      path:'NotificationDetails',
      component:NotificationDetailComponent
    }
  ]
}
];

@NgModule({
  declarations: [NotificationComponent,NotificationDetailComponent],
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
  ],

})
export class NotificationModule { }
