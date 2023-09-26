import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ManagerComponent } from './Manager.component';
import { EmployeeItemComponent } from './MyProfile/EmployeeItem.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component:ManagerComponent
    },
    {
      path:'EmployeeItem/:id',
      component:EmployeeItemComponent

    }
  ]
}];

@NgModule({
  declarations: [ManagerComponent,EmployeeItemComponent],
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
export class ManagerModule { }
