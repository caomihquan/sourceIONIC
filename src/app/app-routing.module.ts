/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/hrm-core/src/lib/services/auth/auth.guard';
import { MainAppComponent } from './screens/MainApp/MainApp.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./screens/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'EmployeeDirectory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/EmployeeDirectory/EmployeeDirectory.module').then(m => m.EmployeeDirectoryModule)
  },
  {
    path: 'News',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/News/News.module').then(m => m.NewsModule)
  },
  {
    path: 'Events',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/News/News.module').then(m => m.NewsModule)
  },
  {
    path: 'Policy',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/News/News.module').then(m => m.NewsModule)
  },
  {
    path: 'CheckInOut',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/CheckInOut/CheckInOut.module').then(m => m.CheckInOutModule)
  },
  {
    path: 'ListNotification',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'MyPaystub',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyPaystub/MyPaystub.module').then(m => m.MyPayStubModule)
  },
  {
    path: 'MyTimesheet',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyTimeSheet/MyTimeSheet.module').then(m => m.MyTimeSheetModule)
  },
  {
    path: 'FaceConfig',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/FaceConfig/FaceConfig.module').then(m => m.FaceConfigModule)
  },
  {
    path: 'LeaveRequest',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/LeaveRequest/MyLeaveRequest.module').then(m => m.MyLeaveRequestModule)
  },
  {
    path: 'ExtraDayOffRequest',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/ExtraDayOffRequest/ExtraDayOffRequest.module').then(m => m.ExtraDayOffRequestModule)
  },
  {
    path: 'BusinessTripRequest',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/BusinessTripRequest/MyBusinessTripRequest.module').then(m => m.MyBusinessTripRequestModule)
  },
  {
    path: 'ExtraDayOffApprove',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/ExtraDayOffApprove/MyExtraDayOffApprove.module').then(m => m.ExtraDayOffApproveModule)
  },
  {
    path: 'BusinessTripApprove',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/BusinessTripApprove/BusinessTripApprove.module').then(m => m.MyBusinessTripApproveModule)
  },
  {
    path: 'LateEarlyRequest',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/LateEarlyRequest/LateEarlyRequest.module').then(m => m.LateEarlyRequestModule)
  },
  {
    path: 'OTRequest',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/OTRequest/MyOTRequest.module').then(m => m.MyOTRequestModule)
  },
  {
    path: 'LeaveApprove',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/LeaveApprove/MyLeaveApprove.module').then(m => m.LeaveApproveModule)
  },
  {
    path: 'OTApprove',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/OTApprove/MyOTApprove.module').then(m => m.OTApproveModule)
  },{
    path: 'OTGroupRequest',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/OTGroupRequest/MyOTGroupRequest.module').then(m => m.MyOTGroupRequestModule)
  },{
    path: 'LateEarlyApprove', //MissingInOutRequestModule
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/LateEarlyApprove/MyLateEarlyApprove.module').then(m => m.MyLateEarlyApproveModule)
  },
  {
    path: 'MissingInOutRequest', //
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MissingInOutRequest/MissingInOutRequest.module').then(m => m.MissingInOutRequestModule)
  },
  {
    path: 'OTGroupApprove',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/OTGroupApprove/MyOTGroupApprove.module').then(m => m.OTGroupApproveModule)
  },
  {
    path: 'QuestionAnswer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/QuestionAnswer/QuestionAnswer.module').then(m => m.QuestionAnswerModule)
  },
  {
    path: 'MissingInOutApprove',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MissingInOutApprove/MyMissingApprove.module').then(m => m.MissingApproveModule)
  },
  {
    path:'Appoint',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyReports/MyAppoint/MyAppoint.module').then(m => m.MyAppointModule)
  },
  {
    path:'Missing',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyReports/MyMissing/MyMissing.module').then(m => m.MyMissingModule)
  },
  {
    path:'Resign',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyReports/MyResign/MyResign.module').then(m => m.MyResignModule)
  },
  {
    path:'NewRecruit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyReports/MyNewRecruit/MyNewRecruit.module').then(m => m.MyNewRecruitModule)
  },
  {
    path:'NowAvailable',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/MyReports/MyNowAvailable/MyNowAvailable.module').then(m => m.MyNowAvailableModule)
  },
  {
    path:'Manager',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/Manager/Manager.module').then(m => m.ManagerModule)
  },
  {
    path:'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./screens/MainApp/MainApp.module').then(m => m.MainAppModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./screens/MainApp/MainApp.module').then(m => m.MainAppModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
