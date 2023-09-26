import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangepasswordComponent  as ChangepasswordComponentTienThu} from './changepasswordtienthu/changepassword.component';

import { RegisterComponent } from './register/register.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { IPConfig } from '../../../IPConfig';
import { LoginTienThuComponent } from './logintienthu/loginTienThu.component';
import { LoginSimulationComponent } from './login/LoginSimulation/LoginSimulation.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'login',
      children:[
        {
          path:'login-simulation',
          component:LoginSimulationComponent
        },
        {
          path:'',
          component: IPConfig.SceneKey.toLowerCase() === 'tienthu' ? LoginTienThuComponent : LoginComponent,
        }
      ]
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent
    },
    {
      path: 'changepassword',
      component: IPConfig.SceneKey &&
       IPConfig.SceneKey.toLowerCase() === 'tienthu' ? ChangepasswordComponentTienThu : ChangepasswordComponent
    }
  ]
}];

@NgModule({
  declarations: [LoginComponent,
    RegisterComponent,
    LoginSimulationComponent,
    ChangepasswordComponent,
    ChangepasswordComponentTienThu,
    ForgotPasswordComponent,
    LoginTienThuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AuthModule { }
