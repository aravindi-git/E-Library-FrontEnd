import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }
