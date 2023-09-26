import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LateEarlyRequestComponent } from './LateEarlyRequest.component';
import { LateEarlyRequestCreateComponent } from './create/LateEarlyRequestCreate.component';
import { LateEarlyRequestDetailComponent } from './detail/LateEarlyRequestDetail.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: LateEarlyRequestComponent
    },
    {
      path: 'LateEarlyRequestCreate',
      component: LateEarlyRequestCreateComponent
    },
    {
      path: 'LateEarlyRequestDetail',
      component: LateEarlyRequestDetailComponent
    }
  ]
}
];

@NgModule({
  declarations: [LateEarlyRequestComponent,LateEarlyRequestCreateComponent,LateEarlyRequestDetailComponent],
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
export class LateEarlyRequestModule { }
