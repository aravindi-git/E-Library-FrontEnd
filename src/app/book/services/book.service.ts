import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';
import { environment } from '../../../environments/environment';

type ResponseList = {
  data: Book[];
  status: {
    isSuccess: boolean;
    message: string;
  }
};

type Response = {
  data: Book
  status: {
    isSuccess: boolean;
    message: string;
  }
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.libraryApi.baseUrl;

  constructor(private httpConfig: ConfigService) { }

  getBookList(): Observable<Book[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ResponseList>(`${this.baseUrl}books`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  getBookById(id: string): Observable<Book> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`${this.baseUrl}books/?id=${id}`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  saveBook(book: Book): Observable<Book> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>(`${this.baseUrl}books`, book ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }


  updateBook(book: Book): Observable<Book> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>(`${this.baseUrl}books`, book ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  deleteBook(book: Book): Observable<Book> {
    book.isActive = false;
    return new Observable(obs => {
      this.httpConfig.executePut<Response>(`${this.baseUrl}books`, book ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  bookSearch(options: BookSearch): Observable<Book[]> {
    return new Observable(obs => {
      this.httpConfig.executePost<ResponseList>(`${this.baseUrl}books/search`, options).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }


}
