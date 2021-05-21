import { Component, OnInit , ViewChild , AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCategoryComponent } from '../add-category/add-category.component' ;
import { CategoryService } from '../services/category.service' ;
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})


export class ListCategoryComponent implements OnInit , AfterViewInit {

  displayedColumns = ['indexNumber', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Category>;
  categoryList: Category[] = [];

  @ViewChild(MatPaginator ,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,  {static: false}) sort: MatSort;

  constructor( public dialog: MatDialog , private categoryService: CategoryService){}

  ngOnInit(): void {
   this.getCategoryList();
  }

  getCategoryList = async () => {
    this.categoryService.getCategoryList().subscribe(res => {
      console.log(res);
      this.categoryList = res;
      this.dataSource = new MatTableDataSource(this.categoryList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    });
  }
    openDialog(): void {
      const dialogRef = this.dialog.open(AddCategoryComponent, {
        width: '1400px',
      });
      dialogRef.afterClosed().subscribe(() => {this.getCategoryList(); });
    }

    ngAfterViewInit = () => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter = (event: Event) => {
      let filterValue = (event.target as HTMLInputElement).value;
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }

}




