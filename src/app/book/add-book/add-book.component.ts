import { Component, Input, OnInit , Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit  {

  form: FormGroup;
  isAddMode  = true;
  selectedId: string;
  categoryList: Category[] = [];
  authorsList: Author[] = [] ;
  languageList: string[] = [];
  submitted = false;
  title = 'Add New Book';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
    private dialogRef: MatDialogRef<AddBookComponent>,
    private bookService: BookService ,
    private toastr: ToastrService) {}

  ngOnInit(): void {

    if (this.data != null){
      if (this.data.book != null)
      {
        this.selectedId = this.data.book._id;
      }
      this.categoryList = this.data.categories;
      this.authorsList = this.data.authors;
      this.languageList = this.data.languages;
    }

    if (this.selectedId != null){
      this.isAddMode = false;
      this.title = 'Edit Book';
    }

    this.createForm();
  }



  createForm =  (): void => {
    this.form = new FormGroup({
      id : new FormControl(''),
      indexNumber : new FormControl('' , [Validators.required]),
      name : new FormControl('' , [Validators.required]),
      category : new  FormControl(''),
      author : new  FormControl(''),
      languageName : new  FormControl('')
    });

    if (!this.isAddMode) {
       this.form.patchValue(this.data.book);

       const selectedCategory = this.data.book.category as Category;
       this.form.get('category')?.setValue(selectedCategory?._id);

       const selectedAuthor = this.data.book.author as Author;
       this.form.get('author')?.setValue(selectedAuthor?._id);

   }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.isAddMode){
        this.saveBook(this.form.value);
      }
      else{
        this.updateBook(this.form.value);
      }
    }
    else{
      console.log('The form is invalid');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveBook(book: Book): void {
    this.bookService.saveBook(book).subscribe(res =>
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

  updateBook(book: Book): void {
    book._id = this.selectedId;
    this.bookService.updateBook(book).subscribe(res =>
      {
        console.log(res);
        if (res._id){
          this.toastr.success('Book updated successfully.');
        }
        else{
          this.toastr.warning('Book was not updated.');
        }
        this.dialogRef.close();
      }
      , error => {
        console.log(error);
      });
  }

}
