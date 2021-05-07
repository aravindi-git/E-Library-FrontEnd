import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout/layout.component' ; 

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layout/layout.module').then(m=> m.LayoutModule)
    }]
  },
 
  {path :'dashboard' , loadChildren: () => import('./dashboard/dashboard.module').then(m=> m.DashboardModule)} ,
  {path :'authors' , loadChildren: () => import('./author/author.module').then(m=> m.AuthorModule)} , 
  {path :'books' , loadChildren: () => import('./book/book.module').then(m=> m.BookModule)} , 
  {path : 'users' , loadChildren : () => import('./user/user.module').then(m=>m.UserModule)}, 
  {path : 'categories' , loadChildren : () => import('./category/category.module').then(m=>m.CategoryModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
