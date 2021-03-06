import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { SharedModule } from '../shared/shared.module' ;
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AddCategoryComponent,
    ListCategoryComponent
    ],
  imports: [
    CommonModule,
    CategoryRoutingModule ,
    SharedModule,
    ToastrModule.forRoot()
  ]
})
export class CategoryModule { }
