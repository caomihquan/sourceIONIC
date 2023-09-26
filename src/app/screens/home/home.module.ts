import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SearchFunctionComponent } from './searchFunctionList/searchFunctionList.component';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'searchfunctions',
      component: SearchFunctionComponent
    },
  ]
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}];
@NgModule({
  declarations: [HomeComponent,
    SearchFunctionComponent,
    ],
  imports: [
    CommonModule,
    IonicModule,
    HrmCoreModule,

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
export class HomeModule { }
