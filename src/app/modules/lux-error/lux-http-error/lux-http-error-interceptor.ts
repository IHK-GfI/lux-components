import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LuxHttpErrorInterceptor implements HttpInterceptor {
  static dataStream: ReplaySubject<any> = new ReplaySubject(1);

  constructor() {}

  static dataStream$(): Observable<any> {
    return LuxHttpErrorInterceptor.dataStream.asObservable();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        () => {
          LuxHttpErrorInterceptor.dataStream.next([]);
        },
        (errorResponse) => {
          if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 400) {
            LuxHttpErrorInterceptor.dataStream.next(LuxHttpErrorInterceptor.extractErrors(errorResponse.error));
          }
        }
      )
    );
  }

  static extractErrors(error: any | null) {
    let errors;
    if (typeof error === 'object') {
      if (error.hasOwnProperty('errors')) {
        errors = error['errors'];
      } else if (error.hasOwnProperty('violations')) {
        errors = error['violations'];
      } else {
        errors = [];
      }
    }

    return errors;
  }
}
