import { Injectable } from '@angular/core';

import { IUnsavedDataCheck } from './unsaved-data-check.interface';

@Injectable({
  providedIn: 'root'
})
export class UnsavedDataGuard {
  canDeactivate(component: IUnsavedDataCheck): boolean {
    // hier muss auf die Component zugegriffen und geprüft werden, ob es ungespeicherte Daten gibt
    if (component.hasUnsavedData()) {
      if (confirm('Achtung! Sie haben nicht gespeicherte Daten. Möchten Sie wirklich Fortfahren?')) {
        // true bedeutet, dass die Route geändert werden kann
        return true;
      } else {
        // false bedeutet, dass die Route nicht geändert werden soll
        return false;
      }
    }
    return true;
  }
}
