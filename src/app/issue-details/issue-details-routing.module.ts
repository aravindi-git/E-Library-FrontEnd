import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePaths } from '../shared/constants';

const routes: Routes = [
  {path : '' , redirectTo: RoutePaths.BookIssue  , pathMatch: 'full'},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueDetailsRoutingModule { }
