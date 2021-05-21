import { Component, OnInit } from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddBookComponent>,
    private bookService: BookService ,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm =  (): void => {
    this.form = new FormGroup({
      indexNumber : new FormControl(''),
      name : new FormControl(''),

    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    if (this.form.valid) {
      this.bookService.saveBook(this.form.value).subscribe(res =>
        {
          console.log(res);
          if (res._id){
            this.toastr.success('Book added successfully.');
          }
          else{
            this.toastr.warning('Book was not added.');
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
