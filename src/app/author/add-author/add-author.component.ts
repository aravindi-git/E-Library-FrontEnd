import { Component, OnInit } from '@angular/core';
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

  constructor(
    public dialogRef: MatDialogRef<AddAuthorComponent>,
    private authorService: AuthorService,
    private toastr: ToastrService) {

     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('')
    });
  }

    onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    if (this.form.valid) {
      this.authorService.addAuthor(this.form.value).subscribe(res =>
        {
          console.log(res);
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
    else{
      console.log('The form is invalid');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


}
