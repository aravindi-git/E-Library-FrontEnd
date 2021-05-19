import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor
{
  constructor(private toastr: ToastrService){}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   return next.handle(httpRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
      }
      else {
        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      }
      console.log(errorMsg);
      this.toastr.error(errorMsg);
      return throwError(errorMsg);
    })
   );

  }
}
