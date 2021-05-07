import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from './shared/shared.module' ; 
import { MaterialModule } from  './shared/material/material.module' ; 
import { LayoutModule } from './layout/layout.module' ; 
import { DashboardModule } from './dashboard/dashboard.module' ; 
import { AuthorModule } from './author/author.module' ; 
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module' ; 
import { CategoryModule } from './category/category.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
 
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    LayoutModule,
    DashboardModule, 
    AuthorModule, 
    BookModule, 
    UserModule,
    CategoryModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
