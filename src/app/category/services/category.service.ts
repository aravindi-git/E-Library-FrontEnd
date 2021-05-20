import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';

type ListResponse = {
  data: Category[];
  status: {
    isSuccess: boolean;
    message: string;
  }
};

type Response = {
  data: Category
  status: {
    isSuccess: boolean;
    message: string;
  }
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpConfig: ConfigService) { }

  getCategoryList(): Observable<Category[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ListResponse>('http://localhost:3000/api/v1/books/categories').subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  addCategory(category: Category): Observable<Category> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>('http://localhost:3000/api/v1/books/categories', category ).subscribe(res => {
        obs.next(res.data);
       // localStorage.setItem('token', res.data.token);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

}
