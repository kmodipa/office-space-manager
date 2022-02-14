import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* Handle the request */
    req = this.addAuthHeader(req);

    /* call next and handle the response */
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401 || error.status === 403) { /* Unauthorized/Forbidden */
          console.log('Logging out');
          // this.authService.LogOut();

        }
        // return throwError(error);
        return throwError(error);
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    if (localStorage.getItem('x-access-token')) {
      console.log('Token Found');
      return request.clone({
        setHeaders: {
          // 'x-access-token': <string>localStorage.getItem('access-token')
          'Authorization': `Bearer ${<string>localStorage.getItem('x-access-token')}`,
          'x-refresh': `${<string>localStorage.getItem('x-refresh-token')}`
        }
      })
    } else {
      console.log('Token Not Found');
    }

    return request;
  }
}
