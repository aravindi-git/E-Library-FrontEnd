import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module' ;
// import { MaterialModule } from './shared/material/material.module' ;
import { LayoutModule } from './layout/layout.module' ;
import { DashboardModule } from './dashboard/dashboard.module' ;
import { AuthorModule } from './author/author.module' ;
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module' ;
import { CategoryModule } from './category/category.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationModule } from './registration/registration.module';
import { IssueDetailsModule } from './issue-details/issue-details.module';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  //  MaterialModule,
    LayoutModule,
    DashboardModule,
    AuthorModule,
    BookModule,
    UserModule,
    CategoryModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RegistrationModule,
    IssueDetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
