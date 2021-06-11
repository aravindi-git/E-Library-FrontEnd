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
  isAddMode  = true;
  selectedId: string;
  submitted = false;
  title = 'Add New Category';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {categoryObject: Category},
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService: CategoryService,
    private toastr: ToastrService) {
     }

  ngOnInit(): void {
    if (this.data != null){
      if (this.data.categoryObject != null )
      {
        this.selectedId = this.data.categoryObject._id;
      }
    }
    if (this.selectedId != null){
      this.isAddMode = false;
      this.title = 'Edit Category';
    }
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      indexNumber: new FormControl('' , [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });

    if (!this.isAddMode) {
      this.form.patchValue(this.data.categoryObject);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.isAddMode){
        this.saveCategory(this.form.value);
      }
      else{
        this.updateCategory(this.form.value);
      }
    }
    else{
      console.log('The form is invalid');
    }
  }

  saveCategory(category: Category): void {
    this.categoryService.addCategory(category).subscribe(res =>
      {
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

  updateCategory(category: Category): void {
    category._id = this.selectedId;
    this.categoryService.updateCategory(category).subscribe(res =>
      {
        if (res._id){
          this.toastr.success('Category updated successfully.');
        }
        else{
          this.toastr.warning('Category was not updated.');
        }
        this.dialogRef.close();
      }
      , error => {
        console.log(error);
      });
  }

}
