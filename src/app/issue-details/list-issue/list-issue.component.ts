import {  Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-list-issue',
  templateUrl: './list-issue.component.html',
  styleUrls: ['./list-issue.component.scss']
})
export class ListIssueComponent implements OnInit {

  name = 'Issued book list';
  constructor() {}

  ngOnInit(): void {
  }
}
