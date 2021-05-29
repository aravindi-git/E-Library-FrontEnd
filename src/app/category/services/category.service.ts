import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  getCategoryById(id: string): Observable<Category> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`http://localhost:3000/api/v1/books/categories/?id=${id}`).subscribe(res => {
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
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  updateCategory(category: Category): Observable<Category> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>('http://localhost:3000/api/v1/books/categories', category ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  deleteCategory(id: string): Observable<Response> {
    const API_URL = `http://localhost:3000/api/v1/books/categories/${id}`;

    return this.httpConfig.executeDelete<Response>(API_URL);
  }

}

