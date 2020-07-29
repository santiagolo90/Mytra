import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from '../../servicios/toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private router : Router,
    private toastr: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleHttp(req, next);
  }

  private handleHttp(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const reqClone = req.clone();
   
    
    return next.handle(reqClone).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }
        console.log("ErrorInterceptorService: ",error);
        
        if (error.status == 400) {
          this.toastr.showToast("",error.error.text, "warning")
        }
        return throwError(errorMessage);
      })
    );
  }


  
}
