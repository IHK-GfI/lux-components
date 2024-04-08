import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LuxLookupParameters } from '../lux-lookup-model/lux-lookup-parameters';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';

@Injectable({
  providedIn: 'root'
})
export class LuxLookupService {
  constructor(private http: HttpClient) {}

  /**
   * Liefert die Eintraege einer Schluesseltabelle.
   * @param tableNo
   * @param parameters
   * @param url
   * @returns Observable<LuxLookupTableEntry[]>
   */
  getLookupTable(tableNo: string, parameters: LuxLookupParameters, url: string): Observable<LuxLookupTableEntry[]> {
    const httpParameters = this.generateParameters(parameters);
    return this.http.get<LuxLookupTableEntry[]>(url + 'getLookupTable/' + tableNo, { params: httpParameters });
  }

  /**
   * Generiert die Standard-Parameter fuer einen Lookup-Request.
   * @param parameters
   * @returns HttpParams
   */
  private generateParameters(parameters: LuxLookupParameters): HttpParams {
    let httpParameters = new HttpParams();
    httpParameters = httpParameters.append('knr', '' + parameters.knr);
    httpParameters = httpParameters.append('raw', '' + parameters.raw);

    if (parameters.keys && parameters.keys.length > 0) {
      parameters.keys.forEach((key: string) => {
        httpParameters = httpParameters.append('keys', key);
      });
    }

    if (parameters.fields && parameters.fields.length > 0) {
      parameters.fields.forEach((field: string) => {
        httpParameters = httpParameters.append('fields', field);
      });
    }

    return httpParameters;
  }
}
