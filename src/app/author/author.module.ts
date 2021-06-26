import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module' ;
import { AuthorRoutingModule } from './author-routing.module';
import { AddAuthorComponent } from './add-author/add-author.component';
import { ListAuthorComponent } from './list-author/list-author.component';
@NgModule({
  declarations: [
    AddAuthorComponent,
    ListAuthorComponent
  ],
  imports: [
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }
