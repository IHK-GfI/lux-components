import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { LuxLookupComponent } from '../lux-lookup-model/lux-lookup-component';

export class LuxLookupErrorStateMatcher implements ErrorStateMatcher {
  lookupComponent: LuxLookupComponent;

  constructor(lookupComponent: LuxLookupComponent) {
    this.lookupComponent = lookupComponent;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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
  }
}
