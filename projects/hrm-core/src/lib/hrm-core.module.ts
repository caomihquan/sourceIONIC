import { ControlsModule } from './controls/controls.module';
import { NgModule } from '@angular/core';



@NgModule({
  imports: [
    ControlsModule
  ],
  exports: [
    ControlsModule
  ]
})
export class HrmCoreModule { }
