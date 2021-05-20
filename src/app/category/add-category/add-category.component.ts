import { Component, OnInit , Inject} from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service' ;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService: CategoryService,
    private toastr: ToastrService) {

     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      indexNumber: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl('')
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    if (this.form.valid) {
      this.categoryService.addCategory(this.form.value).subscribe(res =>
        {
          console.log(res);
          if (res._id){
            this.toastr.success('Category added successfully.');
          }
          else{
            this.toastr.warning('Category was not added.');
          }
          this.dialogRef.close();
        }
        , error => {
          console.log(error);
        });
    }
    else{
      console.log('The form is invalid');
    }
  }

}
