import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module' ;
import { BookRoutingModule } from './book-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { BookSearchComponent } from './book-search/book-search.component';

@NgModule({
  declarations: [
    AddBookComponent,
    ListBookComponent,
    BookSearchComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule
  ]
})
export class BookModule { }
