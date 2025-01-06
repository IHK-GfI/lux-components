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
    const isAssetRequest = req.url.includes('/assets/');
    return next.handle(req).pipe(
      tap({
        next: () => {
          if (!isAssetRequest) {
            LuxHttpErrorInterceptor.dataStream.next([]);
          }
        },
        error: (errorResponse) => {
          if (!isAssetRequest && errorResponse instanceof HttpErrorResponse && errorResponse.status === 400) {
            LuxHttpErrorInterceptor.dataStream.next(LuxHttpErrorInterceptor.extractErrors(errorResponse.error));
          }
        }
      })
    );
  }

  static extractErrors(error: any | null) {
    let errors = [];

    if (error && typeof error === 'object') {
      if (error.errors && Array.isArray(error.errors)) {
        errors = error.errors;
      } else if (error.violations && Array.isArray(error.violations)) {
        errors = error.violations;
      }
    }
    
    return errors;
  }
}
