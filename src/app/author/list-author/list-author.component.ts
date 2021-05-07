import { Component, OnInit } from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.scss']
})
export class ListAuthorComponent implements OnInit {

  newAuthorUrl :string = "/" + RoutePaths.NewAuthor ; 
  constructor() { }

  ngOnInit(): void {
  }

}
