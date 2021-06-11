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
  selectedId: string;
  isAddMode = true;
  submitted = false;
  title = 'Add New User';
  roleList: any[] = [{text: 'Admin' , value : 'admin'} , {text: 'Staff', value: 'staff'} ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userObject: User},
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private toastr: ToastrService) {

     }

  ngOnInit(): void {
    if (this.data !=  null ){
      if (this.data.userObject != null ){
        this.selectedId = this.data.userObject._id;
        if (this.selectedId != null ){
          this.isAddMode = false;
          this.title = 'Edit User';
        }
      }
    }
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    if (!this.isAddMode)
    {
      this.form.patchValue(this.data.userObject);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.valid) {
      if (this.isAddMode)
      {
        this.saveUser(this.form.value);
      }
      else
      {
        this.updateUser(this.form.value);
      }
    }
    else{
      console.log('The form is invalid');
    }
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveUser(user: User): void
  {
    this.userService.addUser(user).subscribe(res =>
      {
        if (res._id){
          this.toastr.success('User is added successfully.');
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

  updateUser(user: User): void
  {
    user._id = this.selectedId;
    this.userService.updateUser(user).subscribe(res =>
      {
        if (res._id){
          this.toastr.success('User is updated successfully.');
        }
        else{
          this.toastr.warning('User was not updated.');
        }
        this.dialogRef.close();
      }
      , error => {
        console.log(error);
      });
  }

}
