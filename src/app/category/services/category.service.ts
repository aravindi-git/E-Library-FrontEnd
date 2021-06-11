import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../../shared/services/serviceHandler/configService';
import { environment } from '../../../environments/environment';

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

  baseUrl = environment.libraryApi.baseUrl;

  constructor(private httpConfig: ConfigService) { }

  getCategoryList(): Observable<Category[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ListResponse>(`${this.baseUrl}books/categories`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  getCategoryById(id: string): Observable<Category> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`${this.baseUrl}books/categories/?id=${id}`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  addCategory(category: Category): Observable<Category> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>(`${this.baseUrl}books/categories`, category ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  updateCategory(category: Category): Observable<Category> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>(`${this.baseUrl}books/categories`, category ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  deleteCategory(id: string): Observable<Response> {
    const API_URL = `${this.baseUrl}books/categories/${id}`;

    return this.httpConfig.executeDelete<Response>(API_URL);
  }

}

