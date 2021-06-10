import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { AuthorService } from 'src/app/author/services/author.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  @Output() filteredBookList: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  form: FormGroup;
  categoryList: Category[] = [];
  authorsList: Author[] = [] ;
  languageList: string[] = ['Sinhala', 'English' , 'Tamil'];
  viewRemovedBooks = false;

  constructor(private bookService: BookService ,
              private categoryService: CategoryService,
              private authorService: AuthorService) { }

  ngOnInit(): void {
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
      key : new FormControl(''),
      category : new  FormControl(''),
      author : new  FormControl(''),
      language: new  FormControl(''),
      inactive: new FormControl(false)
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    this.bookService.bookSearch(this.form.value).subscribe(res =>
      {
        console.log('Filtered list : ' + res);
        this.filteredBookList.emit(res);
      });
  }

  onClear(): void {
    this.form.reset();
    this.bookService.getBookList().subscribe(res => {
      this.filteredBookList.emit(res);
    });
  }



}
