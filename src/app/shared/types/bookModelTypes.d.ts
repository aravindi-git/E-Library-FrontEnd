

declare type Book ={
  _id:string;
  name: string;
  indexNumber: string;
  category: string | Category;
  author: string | Author;
  publisher?: string;
  languageName?: string;
  isActive: boolean;
  updatedAt : Date;
}

declare type Category ={
  _id:string;
  name:string;
  indexNumber: string;
  description: string;
  isActive: boolean;
}

declare type Author ={
  _id:string;
  name:string;
  isActive: boolean;
  books: Book[] ;
}


declare type BookSearch = {
  key?: string; // book name or book index number
  author?: string; // book author id
  category?: string; // book category id
  language?: string;
  inactive?: boolean;

};

declare type  BookDialogData = {
  book: Book;
  authors: Author[];
  categories: Category[];
  languages: string[];
}
