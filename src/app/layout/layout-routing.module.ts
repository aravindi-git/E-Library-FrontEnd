import { compileComponentFromMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutePaths } from '../shared/constants'

import { DashboardComponent } from '../dashboard/dashboard/dashboard.component'; 
import { AddBookComponent } from '../book/add-book/add-book.component' ; 
import  { ListBookComponent } from  '../book/list-book/list-book.component' ; 
import { LayoutComponent } from './layout/layout.component';
import { ListAuthorComponent } from '../author/list-author/list-author.component' ; 
import { AddAuthorComponent } from '../author/add-author/add-author.component'; 
import { AddUserComponent } from '../user/add-user/add-user.component' ; 
import { ListUserComponent } from  '../user/list-user/list-user.component' ; 
import { BookComponent } from '../book/book/book.component'; 
import { CategoryComponent } from '../category/category/category.component' ; 

const routes: Routes = [
  { path: '' ,  component : LayoutComponent} , 

  { path: RoutePaths.Dashboard, component: DashboardComponent },

  { path: RoutePaths.Book, component: BookComponent },
  // { path: RoutePaths.NewBook, component: AddBookComponent },
  // { path: RoutePaths.EditBook, component: AddBookComponent },
  // { path: RoutePaths.BookList, component: ListBookComponent },

  // {path : 'book' , loadChildren : () => import('../book/book.module').then(m=> m.BookModule) },

  { path: RoutePaths.AuthorList, component:ListAuthorComponent  },
  { path: RoutePaths.NewAuthor, component:AddAuthorComponent  },
  { path: RoutePaths.EditAuthor, component:AddAuthorComponent  },

  { path: RoutePaths.UserList, component:ListUserComponent  },
  { path: RoutePaths.NewUser, component:AddUserComponent  },
  { path: RoutePaths.EditUser, component:AddUserComponent  },

  { path: RoutePaths.Category, component:CategoryComponent  },
]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
