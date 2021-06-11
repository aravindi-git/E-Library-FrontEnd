import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private router: Router) {
      this.location = location;
      this.sidebarVisible = false;
    }

    ngOnInit(): void{
      this.listTitles = ROUTES.filter(listTitle => listTitle);
    }

    getTitle(): string{
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if (titlee.charAt(0) === '/'){
          titlee = titlee.slice( 1 );
      }
      for (const item  of this.listTitles){
        if (item.path === titlee){
            return item.title;
        }
    }
      return titlee;
    }

    logout(): void{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

}
