import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryService } from '../services/category.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})


export class ListCategoryComponent implements OnInit, AfterViewInit {

  displayedColumns = ['indexNumber', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Category>;
  categoryList: Category[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private dialogService: ConfirmDialogService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  ngAfterViewInit = () => {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  applyFilter = (event: Event) => {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '700px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(() => { this.getCategoryList(); });
  }


  editCategory(row: any): void {
    let categoryObject: Category;
    this.categoryService.getCategoryById(row._id).subscribe(res => {
      categoryObject = res;
      console.log('tst 22 ' + JSON.stringify(categoryObject));
      const dialogRef = this.dialog.open(AddCategoryComponent, {
        width: '700px',
        data: {
          categoryObject
        }
      });
      dialogRef.afterClosed().subscribe(() => { this.getCategoryList(); });

    });



  }

  deleteCategory(row: any): void {
    const options = {
      title: 'Please confirm the deletion !' ,
      message: 'Are you sure to remove the category  "' + row.name + '" ? ',
      cancelText: 'No, Cancel',
      confirmText: 'Yes, Delete.'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed)
      {
        this.categoryService.deleteCategory(row._id).subscribe(res => {
          if (res.status.isSuccess){
            this.toastr.success('Category is deleted  successfully.');
            this.getCategoryList() ;
          }
          else{
            this.toastr.warning('Category  is not deleted.');
          }
        });
      }
   });
  }

}




