import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SharedModule } from '../shared/shared.module' ;
@NgModule({
  declarations: [
    AddUserComponent,
    ListUserComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
