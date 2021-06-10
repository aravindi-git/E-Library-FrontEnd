import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../services/user.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator ,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,  {static: false}) sort: MatSort;

  displayedColumns: string[] = [ 'username', 'name', 'action'];
  usersList: User[] = [];
  dataSource = new MatTableDataSource<User>(this.usersList);

  constructor(
    private dialog: MatDialog ,
    private userService: UserService,
    private dialogService: ConfirmDialogService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getUsersList();
 }

 ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }

  getUsersList = async () => {
    this.userService.getUsersList().subscribe(res => {
      console.log(res);
      this.usersList = res;
      this.dataSource = new MatTableDataSource<User>(this.usersList);
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
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '700px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(() => {this.getUsersList(); });
  }

  editUser(row: any): void {
    let userObject: User;
    this.userService.getUserById(row._id).subscribe(res => {
      userObject = res;
      const dialogRef = this.dialog.open(AddUserComponent, {
        width: '700px',
        data: { userObject }
      });
      dialogRef.afterClosed().subscribe(() => {this.getUsersList(); });

   });
  }

  deleteUser(row: any): void {
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
        this.userService.deleteUser(row).subscribe(res => {
          if (res._id){
            this.toastr.success('User is deleted  successfully.');
            this.getUsersList() ;
          }
          else{
            this.toastr.warning('User  is not deleted.');
          }
        });
      }
   });
  }

}

