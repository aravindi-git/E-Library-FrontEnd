import { Component, OnInit , ViewChild , AfterViewInit} from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../services/book.service' ;
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator ,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,  {static: false}) sort: MatSort;

  booksList: Book[] = [];
  displayedColumns = ['indexNumber', 'name', 'action'];
  dataSource = new MatTableDataSource<Book>(this.booksList);

  constructor(private dialog: MatDialog , private bookService: BookService) {}

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
      this.dataSource = new MatTableDataSource<Book>(this.booksList);
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
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(() => {this.getBookList(); });
  }

}
