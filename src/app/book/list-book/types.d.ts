

declare type Book ={
  id:string;
  name: string;
  indexNumber: string;
  category: string | Category;
  author: string | Author;
  publisher?: string;
}

declare type  Category ={
  _id:string;
  name:string;
  indexNumber: string;
  description: string
}

declare type  Author ={
  id:string;
  name:string;
  books: Book[] ;
}
