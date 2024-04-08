import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LuxLookupHandlerService {
  private lookupElements: Map<string, Subject<void>> = new Map();

  constructor() {}

  /**
   * Fügt ein LookupComponent zu der Map hinzu.
   * @param string name
   * @param name
   */
  addLookupElement(name: string) {
    this.lookupElements.set(name, new Subject<void>());
  }

  /**
   * Gibt das Subject einer LookupComponent als Observable zurück (oder null).
   * @param string name
   * @param name
   * @returns Observable<any> | null
   */
  getLookupElementObsv(name: string): Observable<any> | null {
    const lookupEl = this.getLookupElementSubject(name);
    if (lookupEl) {
      return lookupEl.asObservable();
    }
    return null;
  }

  /**
   * Gibt das Subject einer LookupComponent zurück (oder null).
   * @param string name
   * @param name
   * @returns Observable<any> | null
   */
  getLookupElementSubject(name: string) {
    const lookupEl = this.lookupElements.get(name);
    if (lookupEl) {
      return lookupEl;
    }
    return null;
  }

  /**
   * Stößt das Neuladen von Schlüsseltabellendaten einer LookupComponent an.
   * @param string name
   * @param lookupId
   */
  reloadData(lookupId: string) {
    const lookupEl = this.getLookupElementSubject(lookupId);
    if (lookupEl) {
      lookupEl.next();
    } else {
      console.error(`The lookup component ${lookupId} could not be found.`);
    }
  }
}
