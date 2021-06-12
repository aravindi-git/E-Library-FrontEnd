import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit{
  @Input() categoryList: Category[];
  @Input() authorsList: Author[];
  @Input() languageList: string[];
  @Output() filteringOptions: EventEmitter<BookSearch> = new EventEmitter<BookSearch>();
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
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
    this.filteringOptions.emit(this.form.value);
  }

  onClear(): void {
    this.form.reset();
    this.filteringOptions.emit(this.form.value);
  }



}
