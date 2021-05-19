import { Component, OnInit } from '@angular/core';
import { RoutePaths } from '../../shared/constants' ;



@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {

  value = 'Clear me';
  AuthorListUrl: string =  '/' + RoutePaths.AuthorList;

  constructor() { }

  ngOnInit(): void {
  }

}
