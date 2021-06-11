import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';
import { environment } from '../../../environments/environment';

type ListResponse = {
  data: User[];
  status: {
    isSuccess: boolean;
    message: string;
  }
};

type Response = {
  data: User
  status: {
    isSuccess: boolean;
    message: string;
  }
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.libraryApi.baseUrl;

  constructor(private httpConfig: ConfigService) { }

  getUsersList(): Observable<User[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ListResponse>(`${this.baseUrl}users`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  getUserById(id: string): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`${this.baseUrl}users/?id=${id}`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  addUser(user: User): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>(`${this.baseUrl}users`, user ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  updateUser(user: User): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>(`${this.baseUrl}users`, user ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }
  deleteUser(user: User): Observable<User> {
    user.isActive = false;
    return new Observable(obs => {
      this.httpConfig.executePut<Response>(`${this.baseUrl}users`, user ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

}
