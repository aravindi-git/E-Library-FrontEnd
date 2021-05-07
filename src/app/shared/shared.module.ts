import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, 
    MaterialModule
  ], 
  exports: [
    MaterialModule

  ]
})
export class SharedModule { }
