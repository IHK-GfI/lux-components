import { Ihk, Nachricht, SaveNachrichtResult } from '../lux-nachricht-model/lux-nachricht-model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigParameters } from '../../lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Injectable()
export class NachrichtService {

  private subscriptions: Subscription[] = [];
  
  private apiPath: string;
  
  constructor(private http: HttpClient, private componentsConfigService: LuxComponentsConfigService) {
    this.subscriptions.push(this.componentsConfigService.config.subscribe(
      (newConfig: LuxComponentsConfigParameters) => {
        this.apiPath = newConfig.nachrichtServiceURL;
      }
    ));
  }

  defaultErrHandler(err: any) {
    console.error('Es ist ein Fehler aufgetreten:', err);
  }

  readNachrichten(role: string, ihkNr: number, anwendungskuerzel: string): Observable<Nachricht[]> {
    let params = new HttpParams();
    params = params.append('role', role);
    params = params.append('ihkNr', ihkNr.toString());
    params = params.append('anwendungskuerzel', anwendungskuerzel.toString());
    return this.http.get<Nachricht[]>(this.apiPath + 'nachrichten', { params: params }).pipe(map(x => {
      x.forEach(this.mapNachrichtDate);
      return x;
    }));
  }

  createNachricht(entry: Nachricht): Observable<SaveNachrichtResult> {
    return this.http.post<SaveNachrichtResult>(this.apiPath + 'nachrichten/', entry).pipe(map(x => {
      this.mapNachrichtDate(x.nachricht);
      return x;
    }));
  }

  updateNachricht(entry: Nachricht): Observable<SaveNachrichtResult> {
    return this.http.post<SaveNachrichtResult>(this.apiPath + 'nachrichten/' + entry.id, entry).pipe(map(x => {
      this.mapNachrichtDate(x.nachricht);
      return x;
    }));
  }

  deleteNachricht(id: Number): Observable<any> {
    return this.http.delete<Nachricht>(this.apiPath + 'nachrichten/' + id);
  }

  getAuthorizedIhksForUser(role: string, ihkNr: number): Observable<Ihk[]> {
    let params = new HttpParams();
    params = params.append('role', role);
    params = params.append('ihkNr', ihkNr.toString());
    return this.http.get<Ihk[]>(this.apiPath + 'ihks/authorized', { params: params } );
  }


  private mapNachrichtDate(nachricht: Nachricht): Nachricht {
    nachricht.validFrom = new Date(nachricht.validFrom);
    nachricht.validTo = new Date(nachricht.validTo);
    return nachricht;
  }
}
