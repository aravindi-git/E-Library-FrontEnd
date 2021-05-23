import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../services/user.service';

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

  constructor(private dialog: MatDialog , private userService: UserService) {}

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
    });
    dialogRef.afterClosed().subscribe(() => {this.getUsersList(); });
  }

  viewUser(row: any): void {
      alert('View user');
  }

  editUser(row: any): void {
    alert('edit user');
  }

  deleteUser(row: any): void {
    alert('delete user');
  }

}

