import { Component, OnInit } from '@angular/core';
import { RoutePaths } from '../../shared/constants' ; 

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  value = 'Clear me';

  BookListUrl : string =  "/" + RoutePaths.BookList ; 
  
  constructor() { }

  ngOnInit(): void {
  }


 

}
