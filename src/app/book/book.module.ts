import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module' ; 

import { BookRoutingModule } from './book-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { BookComponent } from './book/book.component';


@NgModule({
  declarations: [
    AddBookComponent,
    ListBookComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BookRoutingModule
  ]
})
export class BookModule { }
