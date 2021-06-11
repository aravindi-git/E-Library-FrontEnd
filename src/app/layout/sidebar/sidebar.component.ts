import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RoutePaths } from '../../shared/constants' ;
import { menu } from '../menu' ;

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: RoutePaths.Dashboard, title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: RoutePaths.BookList, title: 'Books',  icon: 'library_books', class: ''  },
  { path: RoutePaths.Category,  title: 'Categories',  icon: 'description', class: '' },
  { path: RoutePaths.AuthorList , title: 'Authors',  icon: 'face', class: ''  },
  { path: RoutePaths.UserList,  title: 'Users',  icon: 'person', class: '' } ,
  { path: RoutePaths.BookIssue , title : 'Issue a book' , icon: 'library_books', class: '' }
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] ,
})
export class SidebarComponent implements OnInit {

 menuItems: any[] ;

  constructor() { }

  ngOnInit(): void {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
