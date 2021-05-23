import { Injectable } from '@angular/core';
import { Observable , from , throwError } from 'rxjs';
import { ConfigService } from '../../shared/services/serviceHandler/configService';

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

  constructor(private httpConfig: ConfigService) { }

  getBookList(): Observable<Book[]> {
    return new Observable(obs => {
      this.httpConfig.executeGet<ResponseList>('http://localhost:3000/api/v1/books').subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  getBookById(id: string): Observable<Book> {
    return new Observable(obs => {
      this.httpConfig.executeGet<Response>(`http://localhost:3000/api/v1/books/?id=${id}`).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }

  saveBook(book: Book): Observable<Book> {
    return new Observable(obs => {
      this.httpConfig.executePost<Response>('http://localhost:3000/api/v1/books', book ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }


  updateBook(book: Book): Observable<Book> {
    return new Observable(obs => {
      this.httpConfig.executePut<Response>('http://localhost:3000/api/v1/books', book ).subscribe(res => {
        obs.next(res.data);
        obs.complete();
      }, error => {
        obs.error(error);
      });
    });
  }


}
