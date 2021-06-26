import { NgModule } from '@angular/core';
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
    CategoryRoutingModule ,
    SharedModule,
    ToastrModule.forRoot()
  ]
})
export class CategoryModule { }
