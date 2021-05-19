import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { RoutePaths } from '../shared/constants' ;
import { AuthGuard } from '../shared/authGuard/auth.guard';

const routes: Routes = [
  {path : '' , redirectTo: RoutePaths.BookList  , pathMatch: 'full'},
  {path : RoutePaths.NewBook , component: AddBookComponent },
  {path : RoutePaths.EditBook , component: AddBookComponent },
  {path : RoutePaths.BookList , component: ListBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BookRoutingModule { }
