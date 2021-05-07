import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component'; 
import { ListBookComponent } from './list-book/list-book.component'; 
import { BookComponent } from './book/book.component' ; 
 
import { RoutePaths } from '../shared/constants' ; 

const routes: Routes = [

  {path :'' , component: BookComponent },
  {path : RoutePaths.NewBook , component: AddBookComponent },
  {path : RoutePaths.EditBook , component: AddBookComponent },
  {path : RoutePaths.BookList , component: ListBookComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
