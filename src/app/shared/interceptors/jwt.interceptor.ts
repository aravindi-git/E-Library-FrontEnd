import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { observable , from , of } from 'rxjs';
import { switchMap } from 'rxjs-compat/operator/switchMap';

@Injectable()
export class  JwtInterceptor implements HttpInterceptor {

  constructor(){}

  intercept = (request: HttpRequest<any> , next: HttpHandler) => {

    const loginUrl = '/auth/signin';
    const token = localStorage.getItem('token');

    if (request.url.search(loginUrl) === -1 ) {
      request = request.clone({headers : request.headers.set('authorization' , `bearer ${token}`)});
    }
    request = request.clone({headers : request.headers.set('Content-Type' , 'application/json')});
    return next.handle(request);

  }
}
