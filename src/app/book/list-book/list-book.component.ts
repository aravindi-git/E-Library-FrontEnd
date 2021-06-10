import { Component, OnInit , ViewChild , AfterViewInit} from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../services/book.service' ;
import { AddBookComponent } from '../add-book/add-book.component';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';


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
  displayedColumns = ['indexNumber', 'name', 'author', 'category', 'language', 'action'];
  dataSource = new MatTableDataSource<Book>(this.booksList);

  constructor(
    private dialog: MatDialog ,
    private bookService: BookService ,
    private dialogService: ConfirmDialogService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
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
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(() => {this.getBookList(); });
  }

  editBook(row: any): void {
    let bookObject: Book ;
    this.bookService.getBookById(row._id).subscribe(res => {
      bookObject = res;
      const dialogRef = this.dialog.open(AddBookComponent, {
        width: '700px',
        data: {
          bookObject
        }
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

  getFilteredBookList(filteredBooks: Book[]): void {
    this.filteredBooksList = filteredBooks;
    this.dataSource = new MatTableDataSource<Book>(this.filteredBooksList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}
