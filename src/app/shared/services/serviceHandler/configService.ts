import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable, of , throwError } from 'rxjs';
import { catchError  , retry } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConfigService
{
  constructor(private http: HttpClient){}

  executeGet<T>(url: string , params?: HttpParams): Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Content-Type' , 'application/json; charset=utf=8');
    return this.http.get(url, {headers, params}) as Observable<T> ;
  }

  executePost<T>(url: string , data: any , params?: HttpParams): Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Content-Type' , 'application/json; charset=utf=8');
    return this.http.post(url, JSON.stringify(data) , {headers, params}) as Observable<T> ;
  }

  executePut<T>(url: string , data: any , params?: HttpParams): Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Content-Type' , 'application/json; charset=utf=8');
    return this.http.put(url, JSON.stringify(data) , {headers, params}) as Observable<T> ;
  }

  executePatch<T>(url: string , data: any , params: HttpParams): Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Content-Type' , 'application/json; charset=utf=8');
    return this.http.patch(url, JSON.stringify(data) , {headers, params}) as Observable<T> ;
  }

  executeDelete<T>(url: string , params?: HttpParams): Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Content-Type' , 'application/json; charset=utf=8');
    return this.http.delete(url, {headers, params}) as Observable<T> ;
  }



}
