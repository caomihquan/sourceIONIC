import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyOTRequestComponent } from './MyOTRequest.component';
import { OTRequestDetailComponent } from './details/OTRequestDetail.component';
import { OTRequestCreateComponent } from './create/OTRequestCreate.component';
const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'OTRequestDetail',
      component: OTRequestDetailComponent
    },
    {
      path: 'OTRequestCreate',
      component: OTRequestCreateComponent
    },
    {
      path: '',
      component: MyOTRequestComponent
    }
  ]
}
];

@NgModule({
  declarations: [MyOTRequestComponent, OTRequestDetailComponent,OTRequestCreateComponent],
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
export class MyOTRequestModule { }
