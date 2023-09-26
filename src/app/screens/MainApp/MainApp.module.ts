import { HrmCoreModule } from 'projects/hrm-core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainAppComponent } from './MainApp.component';
import { NewsMainPageComponent } from './NewsMainPage/NewsMainPage.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


const routes: Routes = [{
  path:'',
  children: [
    {
      path: 'Main-App',
      component:MainAppComponent
    },
    {
      path:'Main-App-News',
      component:NewsMainPageComponent
    },
    {
      path: '',
      component:MainAppComponent
    },
  ]
  },
  {
    path: '**',
    redirectTo: 'Main-App',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [MainAppComponent,NewsMainPageComponent],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MainAppModule { }
