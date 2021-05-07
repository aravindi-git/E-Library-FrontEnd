import { Component, OnInit , ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'] , 
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
