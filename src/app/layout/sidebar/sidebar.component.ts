import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RoutePaths } from '../../shared/constants' ; 
import { menu } from '../menu' ; 

declare const $: any;
declare interface RouteInfo {
    path: string;
  // paths: string[];
    title: string;
    icon: string;
    class: string;
    isParent: boolean; 
    children: number; 
}
// export const ROUTES: RouteInfo[] = [
//     { path: RoutePaths.Dashboard, paths: [RoutePaths.Dashboard] ,  title: 'Dashboard',  icon: 'dashboard', class: '' },
//     { path: RoutePaths.BookList,  paths: [RoutePaths.BookList , RoutePaths.NewBook , RoutePaths.EditBook] ,title: 'Books',  icon:'library_books', class: '' },
//     { path: RoutePaths.AuthorList,  paths: [ RoutePaths.BookList] ,title: 'Authors',  icon:'person', class: '' },
//     { path: RoutePaths.UserList,  paths: [ RoutePaths.UserList] ,title: 'Users',  icon:'person', class: '' }
   
// ];

export const ROUTES: RouteInfo[] = [
  { path: RoutePaths.Dashboard, title: 'Dashboard',  icon: 'dashboard', class: ''  , isParent : true , children : 0},
  { path: RoutePaths.Book, title: 'Books',  icon: 'library_books', class: ''  , isParent : true , children : 0},
  { path: RoutePaths.Category,  title: 'Categories',  icon:'description', class: '' , isParent : true  , children:0},
  { path: RoutePaths.AuthorList ,title: 'Authors',  icon:'face', class: '' , isParent : true , children: 0 },
  { path: RoutePaths.UserList,  title: 'Users',  icon:'person', class: '' , isParent : true  , children:0} 
  
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] , 
//   animations: [
//     trigger('indicatorRotate', [
//         state('collapsed', style({ transform: 'rotate(0deg)' })),
//         state('expanded', style({ transform: 'rotate(180deg)' })),
//         transition('expanded <=> collapsed',
//             animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
//         ),
//     ])
// ]
})
export class SidebarComponent implements OnInit {

 menuItems: any[] ;

  constructor() { }

  ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    //this.menuItems = menu.filter(menuItem => menuItem);
 
 
  }
  

}
