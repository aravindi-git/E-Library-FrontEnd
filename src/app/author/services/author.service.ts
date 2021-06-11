import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';
import { environment } from '../../../environments/environment';

type ListResponse = {
  data: Author[];
  status: {
    isSuccess: boolean;
    message: string;
  }
};

type Response = {
  data: Author
  status: {
    isSuccess: boolean;
    message: string;
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl = environment.libraryApi.baseUrl;

  constructor(private httpConfig: ConfigService) { }

  getAuthorsList(): Observable<Author[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ListResponse>(`${this.baseUrl}books/authors`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  getAuthorById(id: string): Observable<Author> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`${this.baseUrl}books/authors/?id=${id}`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  addAuthor(author: Author): Observable<Author> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>(`${this.baseUrl}books/authors`, author ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  updateAuthor(author: Author): Observable<Author> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>(`${this.baseUrl}books/authors`, author ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  deleteAuthor(id: string): Observable<Response> {
    const API_URL = `${this.baseUrl}books/authors/${id}`;

    return this.httpConfig.executeDelete<Response>(API_URL);
  }

}
