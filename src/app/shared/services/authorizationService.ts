import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';
import { RouterModule, Routes , Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

type Response = {
  data: User;
  status: {
    isSuccess: boolean;
    message: string;
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public jwtHelper: JwtHelperService = new JwtHelperService();
  private user: User;

  constructor( private httpConfig: ConfigService , private router: Router ){}
  login(userData: LoginDetails): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>('http://localhost:3000/api/v1/auth/signin', userData ).subscribe(res => {
        obs.next(res.data);
       // localStorage.setItem('token', res.data.token);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }



  public isAuthenticated(): boolean {
     const token = localStorage.getItem('token');
     let authenticated = false;
     if (token != null )
     {
        // authenticated = true;
         authenticated = !this.jwtHelper.isTokenExpired(token);
     }
     console.log('authenticated ' + authenticated);
     return authenticated;
  }

}

