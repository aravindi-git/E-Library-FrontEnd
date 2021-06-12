import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthorService } from '../../author/services/author.service';
import { AddAuthorComponent } from '../../author/add-author/add-author.component' ;
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-issue',
  templateUrl: './list-issue.component.html',
  styleUrls: ['./list-issue.component.scss']
})
export class ListIssueComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['name', 'action'];
  authorsList: Author[] = [];
  dataSource = new MatTableDataSource<Author>(this.authorsList);

  @ViewChild(MatPaginator ,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,  {static: false}) sort: MatSort;

  constructor(
    private dialog: MatDialog ,
    private authorService: AuthorService,
    private dialogService: ConfirmDialogService,
    private toastr: ToastrService) {}

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


  deleteAuthor(row: any): void {
    const options = {
      title: 'Please confirm the deletion !' ,
      message: 'Are you sure to remove the author  "' + row.name + '" ? ',
      cancelText: 'No, Cancel',
      confirmText: 'Yes, Delete.'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed)
      {
        this.authorService.deleteAuthor(row._id).subscribe(res => {
          if (res.status.isSuccess){
            this.toastr.success('Author is deleted  successfully.');
            this.getAuthorsList() ;
          }
          else{
            this.toastr.warning('Author  is not deleted.');
          }
        });
      }
   });
  }
}
