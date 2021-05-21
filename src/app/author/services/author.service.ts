import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';

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

  constructor(private httpConfig: ConfigService) { }

  getAuthorsList(): Observable<Author[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ListResponse>('http://localhost:3000/api/v1/books/authors').subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  addAuthor(author: Author): Observable<Author> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>('http://localhost:3000/api/v1/books/authors', author ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

}
