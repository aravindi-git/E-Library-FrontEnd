import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePaths } from '../shared/constants' ; 

import { AddUserComponent } from './add-user/add-user.component'; 
import { ListUserComponent } from './list-user/list-user.component' ; 

const routes: Routes = [
  {path: RoutePaths.NewUser , component: AddUserComponent },
  {path: RoutePaths.EditUser , component: AddUserComponent },
  {path: RoutePaths.UserList , component:  ListUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
