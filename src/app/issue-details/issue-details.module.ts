import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueDetailsRoutingModule } from './issue-details-routing.module';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  SharedModule } from '../shared/shared.module';
import { BookIssueComponent } from './book-issue/book-issue.component';


@NgModule({
  declarations: [AddIssueComponent, ListIssueComponent, BookIssueComponent],
  imports: [
    CommonModule,
    IssueDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class IssueDetailsModule { }
