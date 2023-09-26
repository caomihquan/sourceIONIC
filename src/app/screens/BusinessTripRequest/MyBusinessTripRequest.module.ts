import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBusinessTripRequestComponent } from './MyBusinessTripRequest.component';
import { BusinessTripRequestDetailComponent } from './details/BusinessTripRequestDetail.component';
import { BusinessTripRequestCreateComponent } from './create/BusinessTripRequestCreate.component';
const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'BusinessTripRequestDetail',
      component: BusinessTripRequestDetailComponent
    },
    {
      path: 'BusinessTripRequestCreate',
      component: BusinessTripRequestCreateComponent
    },
    {
      path: '',
      component: MyBusinessTripRequestComponent
    }
  ]
}
];

@NgModule({
  declarations: [MyBusinessTripRequestComponent, BusinessTripRequestDetailComponent,BusinessTripRequestCreateComponent],
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
export class MyBusinessTripRequestModule { }
