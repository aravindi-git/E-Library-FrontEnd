import { RoutePaths } from '../shared/constants' ;

export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
  }


export let menu: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: RoutePaths.Dashboard
  },
  {
    displayName: 'Books',
    iconName: 'library_books',
    route: RoutePaths.BookList,
    children: [
      {
        displayName: 'Books Add',
        iconName:  'library_books',
        route: RoutePaths.NewBook
      }
    ]
  }
];