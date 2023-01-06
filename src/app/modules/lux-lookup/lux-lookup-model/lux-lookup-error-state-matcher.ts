import { UntypedFormControl, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LuxLookupComponent } from './lux-lookup-component';

export class LuxLookupErrorStateMatcher implements ErrorStateMatcher {
  lookupComponent: LuxLookupComponent<any>;

  constructor(lookupComponent: LuxLookupComponent<any>) {
    this.lookupComponent = lookupComponent;
  }

  isErrorState(control: FormControl | UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (control) {
      const lookupValue = this.lookupComponent.luxValue;
      if (lookupValue) {
        // Wenn ein selektierter Wert ungültig ist, Fehler anzeigen
        if (
          (!Array.isArray(lookupValue) && lookupValue.isUngueltig) ||
          (Array.isArray(lookupValue) && lookupValue.filter(value => value.isUngueltig).length > 0)
        ) {
          if (!control.errors || !control.errors.ungueltig) {
            setTimeout(() => {
              control.setErrors({ ungueltig: 'true' });
            });
          }
          return true;
        }
      }
      return !!control.errors && control.touched;
    } else {
      return false;
    }
  }
}
