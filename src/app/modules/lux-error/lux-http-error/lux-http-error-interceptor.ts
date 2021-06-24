import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: "root"
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
        error => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            LuxHttpErrorInterceptor.dataStream.next(error.error.errors);
          }
        }
      )
    );
  }
}
