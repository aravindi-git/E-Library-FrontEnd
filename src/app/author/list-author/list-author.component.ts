import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthorService } from '../services/author.service' ;
import { AddAuthorComponent } from '../add-author/add-author.component' ;


@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.scss']
})
export class ListAuthorComponent implements OnInit ,  AfterViewInit{
  displayedColumns: string[] = ['name', 'action'];
  authorsList: Author[] = [];
  dataSource = new MatTableDataSource<Author>(this.authorsList);

  @ViewChild(MatPaginator ,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,  {static: false}) sort: MatSort;

  constructor(private dialog: MatDialog , private authorService: AuthorService) {}

  ngOnInit(): void {
     this.getAuthorsList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAuthorsList = async () => {
    this.authorService.getAuthorsList().subscribe(res => {
      console.log(res);
      this.authorsList = res;
      this.dataSource = new MatTableDataSource<Author>(this.authorsList);
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
    const dialogRef = this.dialog.open(AddAuthorComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(() => {this.getAuthorsList(); });
  }

  editAuthor(row: any): void {
    let authorObject: Author;
    this.authorService.getAuthorById(row._id).subscribe(res => {
      authorObject = res;
      const dialogRef = this.dialog.open(AddAuthorComponent, {
        width: '700px',
        data :  { authorObject }
      });
      dialogRef.afterClosed().subscribe(() => {this.getAuthorsList(); });
    });
  }


}


