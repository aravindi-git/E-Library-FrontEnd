import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';

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

  constructor(private httpConfig: ConfigService) { }

  getUsersList(): Observable<User[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ListResponse>('http://localhost:3000/api/v1/users').subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  getUserById(id: string): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`http://localhost:3000/api/v1/users/?id=${id}`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  addUser(user: User): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>('http://localhost:3000/api/v1/users', user ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  updateUser(user: User): Observable<User> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>('http://localhost:3000/api/v1/users', user ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }


}
