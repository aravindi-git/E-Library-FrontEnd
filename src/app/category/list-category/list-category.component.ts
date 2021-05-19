import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component' ;
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})


export class ListCategoryComponent implements OnInit {


  constructor( public dialog: MatDialog){}
  ngOnInit(): void {
  }
    openDialog(): void {
      const dialogRef = this.dialog.open(AddCategoryComponent, {
        // width: '400px',
      //  data: {requestStatus:  "en" ? status :  "test"}
      });
      console.log(dialogRef);
      dialogRef.afterClosed().subscribe(result => {
        if (result){
        }
      });
    }

}
