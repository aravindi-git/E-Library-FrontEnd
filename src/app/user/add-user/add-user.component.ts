import { Component, OnInit , Inject} from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service' ;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private toastr: ToastrService) {

     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      role: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    if (this.form.valid) {
      this.userService.addUser(this.form.value).subscribe(res =>
        {
          console.log(res);
          if (res._id){
            this.toastr.success('User added successfully.');
          }
          else{
            this.toastr.warning('User was not added.');
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
