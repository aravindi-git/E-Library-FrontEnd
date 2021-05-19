import { Component, OnInit , Inject} from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {

  requestStatus: any;
}
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  dialogForm: FormGroup;
  value = 'Clear me';

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder) {

      this.dialogForm = this.formBuilder.group({
      //  pwaCtrl: this.pwaCtrl
      });
     }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
