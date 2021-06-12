import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
  styleUrls: ['./book-issue.component.scss']
})
export class BookIssueComponent implements OnInit {

  constructor() { }
  viewList = true;
  title = 'Issue a Book';

  ngOnInit(): void {
  }
  selectView(): void{
    this.viewList = !this.viewList;
    this.title = (this.viewList) ? 'Issue a Book' : 'View Issue list';
  }

}
