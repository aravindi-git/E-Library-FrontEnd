import { Component, OnInit , ViewChild , AfterViewInit} from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material/dialog';
import { BookService } from '../services/book.service' ;
import { AddBookComponent } from '../add-book/add-book.component';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/category/services/category.service';
import { AuthorService } from 'src/app/author/services/author.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator ,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,  {static: false}) sort: MatSort;

  booksList: Book[] = [];
  filteredBooksList: Book[] = [];
  categoryList: Category[] = [];
  authorsList: Author[] = [] ;
  displayedColumns = ['indexNumber', 'name', 'author', 'category', 'language', 'action'];
  languageList: string[] = ['Sinhala', 'English' , 'Tamil'];
  dataSource = new MatTableDataSource<Book>(this.booksList);

  constructor(
    private dialog: MatDialog ,
    private bookService: BookService ,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private dialogService: ConfirmDialogService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getMetaData();
    this.getBookList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getBookList = async () => {
    this.bookService.getBookList().subscribe(res => {
      console.log(res);
      this.booksList  = res;
      this.filteredBooksList = res;
      this.dataSource = new MatTableDataSource<Book>(this.filteredBooksList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    });
  }

  openDialog(): void {
    const metaData = {authors: this.authorsList , categories: this.categoryList , languages: this.languageList, book: null};
    console.log(JSON.stringify(metaData));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '700px';
    dialogConfig.data = metaData;

    const dialogRef = this.dialog.open(AddBookComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {this.getBookList(); });
  }

  editBook(row: any): void {
    this.bookService.getBookById(row._id).subscribe(res => {
      const metaData = {authors: this.authorsList , categories: this.categoryList , languages: this.languageList, book: res};
      const dialogRef = this.dialog.open(AddBookComponent, {
        width: '700px',
        data: metaData
      });
      dialogRef.afterClosed().subscribe(() => {this.getBookList(); });
    });
  }

  removeBook(row: any): void {

    const options = {
      title: 'Please confirm the deletion !' ,
      message: 'Are you sure to remove the book  "' + row.name + '" ? ',
      cancelText: 'No, Cancel',
      confirmText: 'Yes, Delete.'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed)
      {
        this.bookService.deleteBook(row).subscribe(res => {
          if (res._id){
            this.toastr.success('Book is deleted  successfully.');
            this.getBookList() ;
          }
          else{
            this.toastr.warning('Book  is not deleted.');
          }
        });
      }
   });
  }

  getFilteredBookList(filteringOptions: BookSearch): void {
      this.bookService.bookSearch(filteringOptions).subscribe(res =>
      {
        this.filteredBooksList = res;
        this.dataSource = new MatTableDataSource<Book>(this.filteredBooksList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
  getMetaData = (): void => {
    this.categoryService.getCategoryList().subscribe(res => {
      this.categoryList = res;
    });

    this.authorService.getAuthorsList().subscribe(res => {
      this.authorsList = res;
    });

  }


}
