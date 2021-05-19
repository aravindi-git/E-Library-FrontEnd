import { compileComponentFromMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePaths } from '../shared/constants';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ListAuthorComponent } from '../author/list-author/list-author.component' ;
// import { AddAuthorComponent } from '../author/add-author/add-author.component';
// import { AddUserComponent } from '../user/add-user/add-user.component' ;
import { ListUserComponent } from '../user/list-user/list-user.component' ;
import { ListBookComponent } from '../book/list-book/list-book.component' ;
import { CategoryComponent } from '../category/category/category.component' ;

const routes: Routes = [
  { path: '' ,  component : LayoutComponent} ,

  { path: RoutePaths.Dashboard, component: DashboardComponent },
  { path: RoutePaths.BookList, component: ListBookComponent },
  { path: RoutePaths.AuthorList, component: ListAuthorComponent  },
  // { path: RoutePaths.NewAuthor, component:  AddAuthorComponent  },
  // { path: RoutePaths.EditAuthor, component: AddAuthorComponent  },
  { path: RoutePaths.UserList, component: ListUserComponent  },
  // { path: RoutePaths.NewUser, component: AddUserComponent  },
  // { path: RoutePaths.EditUser, component: AddUserComponent  },
  { path: RoutePaths.Category, component: CategoryComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
