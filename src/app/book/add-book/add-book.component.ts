import { Component, Input, OnInit , Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/category/services/category.service';
import { AuthorService } from 'src/app/author/services/author.service';
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
  languageList: string[] = ['Sinhala', 'English' , 'Tamil'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {bookObject: Book},
    private dialogRef: MatDialogRef<AddBookComponent>,
    private bookService: BookService ,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private toastr: ToastrService) {}

  ngOnInit(): void {

    if (this.data != null){
      if (this.data.bookObject != null )
      {
        this.selectedId = this.data.bookObject._id;
        console.log(this.data.bookObject);
      }
    }

    if (this.selectedId != null){
      this.isAddMode = false;
    }

    console.log('isAddMode ' + this.isAddMode);
    console.log('id ' + this.selectedId);
    this.getMetaData();
    this.createForm();
  }

  getMetaData = (): void => {
    this.categoryService.getCategoryList().subscribe(res => {
      this.categoryList = res;
    });

    this.authorService.getAuthorsList().subscribe(res => {
      this.authorsList = res;
    });

  }

  createForm =  (): void => {
    this.form = new FormGroup({
      id : new FormControl(''),
      indexNumber : new FormControl(''),
      name : new FormControl(''),
      category : new  FormControl(''),
      author : new  FormControl(''),
      languageName : new  FormControl('')
    });

    if (!this.isAddMode) {
       this.form.patchValue(this.data.bookObject);

       const selectedCategory = this.data.bookObject.category as Category;
       this.form.get('category')?.setValue(selectedCategory?._id);

       const selectedAuthor = this.data.bookObject.author as Author;
       this.form.get('author')?.setValue(selectedAuthor?._id);

   }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
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
    console.log('we are in update');
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
