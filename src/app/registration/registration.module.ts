import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module' ;


@NgModule({
  declarations: [LoginComponent],
  imports: [
    RegistrationRoutingModule,
    SharedModule
  ]
})
export class RegistrationModule { }
