

declare type Book ={
  _id:string;
  name: string;
  indexNumber: string;
  category: string | Category;
  author: string | Author;
  publisher?: string;
  languageName?: string;
  isActive: boolean;
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
