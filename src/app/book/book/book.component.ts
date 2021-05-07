import { Component, OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
