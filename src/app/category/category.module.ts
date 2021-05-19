import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';


import { SharedModule } from '../shared/shared.module' ;


@NgModule({
  declarations: [
    AddCategoryComponent,
    ListCategoryComponent
    ],
  imports: [
    CommonModule,
    CategoryRoutingModule ,
    SharedModule
  ]
})
export class CategoryModule { }
