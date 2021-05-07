import { Component , Inject} from '@angular/core';
import { RoutePaths } from '../../shared/constants';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component' ; 

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent  {

  newUserUrl : string  = "/"+ RoutePaths.NewUser; 
  
constructor( public dialog: MatDialog){}
  
  openDialog(): void {
    
    const dialogRef = this.dialog.open(AddUserComponent, {
      // width: '400px',
    //  data: {requestStatus:  "en" ? status :  "test"}
      
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      
      }
    });
  }

  
}

