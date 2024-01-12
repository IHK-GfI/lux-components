import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DseResolver implements Resolve<string> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    return this.http.get(`/custom-pages/dse.html`, { responseType: 'text' }).pipe(
      catchError(() => {
        return of('In der lokalen Demo wird kein Datenschutzhinweis angezeigt.');
      })
    );
  }
}
