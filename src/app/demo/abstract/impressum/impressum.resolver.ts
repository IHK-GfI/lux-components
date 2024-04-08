import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpressumResolver {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    return this.http.get(`/custom-pages/impressum.html`, { responseType: 'text' }).pipe(
      catchError(() => {
        return of('In der lokalen Demo wird kein Impressum angezeigt.');
      })
    );
  }
}
