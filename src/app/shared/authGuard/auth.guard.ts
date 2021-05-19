import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { AuthorizationService } from '../services/authorizationService';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{

  constructor(private authorizationService: AuthorizationService , private router: Router){}

  canActivate = (route: ActivatedRouteSnapshot , state: RouterStateSnapshot): any =>
  {
    if (this.authorizationService.isAuthenticated())
    {
      console.log('auth guard is true');
      return true ;
    }
    else
    {
      console.log('auth guard is false');
      this.router.navigate(['login']);
      // return false;
    }
  }
}
