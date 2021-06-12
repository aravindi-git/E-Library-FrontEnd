import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {

  form: FormGroup;
  isAddMode  = true;
  selectedId: string;
  submitted = false;

  constructor(  private toastr: ToastrService) { }

  ngOnInit(): void {
   this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      indexNumber: new FormControl('' , [Validators.required]),
      studentIndex: new FormControl('', [Validators.required]),
      dueDate: new FormControl('')
    });

  }

  onSubmit(event: any): void {
  }

  onCancel(): void {

  }

}
