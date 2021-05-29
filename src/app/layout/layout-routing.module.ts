import { compileComponentFromMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePaths } from '../shared/constants';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ListAuthorComponent } from '../author/list-author/list-author.component' ;
import { ListUserComponent } from '../user/list-user/list-user.component' ;
import { ListBookComponent } from '../book/list-book/list-book.component' ;
import { ListCategoryComponent } from '../category/list-category/list-category.component';
import { AddIssueComponent } from '../issue-details/add-issue/add-issue.component' ;

const routes: Routes = [
  { path: '' ,  component : LayoutComponent} ,

  { path: RoutePaths.Dashboard, component: DashboardComponent },
  { path: RoutePaths.BookList, component: ListBookComponent },
  { path: RoutePaths.AuthorList, component: ListAuthorComponent  },
  { path: RoutePaths.UserList, component: ListUserComponent  },
  { path: RoutePaths.Category, component: ListCategoryComponent  } ,
  { path: RoutePaths.BookIssue, component: AddIssueComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
