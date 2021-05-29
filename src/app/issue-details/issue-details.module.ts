import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueDetailsRoutingModule } from './issue-details-routing.module';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AddIssueComponent, ListIssueComponent],
  imports: [
    CommonModule,
    IssueDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class IssueDetailsModule { }
