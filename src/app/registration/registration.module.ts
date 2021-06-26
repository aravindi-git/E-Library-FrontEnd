import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module' ;


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule
  ]
})
export class RegistrationModule { }
