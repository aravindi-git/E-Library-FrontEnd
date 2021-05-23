import { Component, OnInit , Inject } from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from '../services/author.service' ;

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {

  form: FormGroup;
  selectedId: string;
  isAddMode = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {authorObject: Author},
    private dialogRef: MatDialogRef<AddAuthorComponent>,
    private authorService: AuthorService,
    private toastr: ToastrService) {

     }

  ngOnInit(): void {
    if (this.data != null )
    {
      if (this.data.authorObject != null )
      {
        this.selectedId = this.data.authorObject._id;
        if (this.selectedId != null )
        {
          this.isAddMode = false;
        }
      }
    }
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('')
    });

    if (!this.isAddMode)
    {
      this.form.patchValue(this.data.authorObject);
    }
  }

    onSubmit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      if (this.isAddMode){
        this.saveAuthor(this.form.value);
      }
      else{
        this.updateAuthor(this.form.value);
      }
    }
    else{
      console.log('The form is invalid');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveAuthor(author: Author): void
  {
    this.authorService.addAuthor(author).subscribe(res =>
      {
        if (res._id){
          this.toastr.success('Author added successfully.');
        }
        else{
          this.toastr.warning('Author was not added.');
        }
        this.dialogRef.close();
      }
      , error => {
        console.log(error);
      });
  }

  updateAuthor(author: Author): void
  {
    author._id = this.selectedId;
    this.authorService.updateAuthor(author).subscribe(res =>
      {
        if (res._id){
          this.toastr.success('Author added successfully.');
        }
        else{
          this.toastr.warning('Author was not added.');
        }
        this.dialogRef.close();
      }
      , error => {
        console.log(error);
      });
  }


}
