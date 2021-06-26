import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './add-author/add-author.component';
import { ListAuthorComponent } from './list-author/list-author.component';

import { RoutePaths } from '../shared/constants' ;

const routes: Routes = [
  {path: RoutePaths.NewAuthor , component: AddAuthorComponent },
  {path: RoutePaths.EditAuthor , component: AddAuthorComponent },
  {path: RoutePaths.AuthorList , component: ListAuthorComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
