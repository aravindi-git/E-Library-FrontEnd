import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { ConfigService } from './services/serviceHandler/configService';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error.handling.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule , JwtModuleOptions} from '@auth0/angular-jwt';
import { SharedComponent } from './shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// export function tokenGetter(): any{
//   return localStorage.getItem('token');
// }

@NgModule({
  declarations: [
  SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MaterialModule,
    SharedComponent,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    ConfigService ,
    {provide: HTTP_INTERCEPTORS , useClass:  JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS , useClass:  ErrorHandlingInterceptor, multi: true }
  ]
})
export class SharedModule { }
