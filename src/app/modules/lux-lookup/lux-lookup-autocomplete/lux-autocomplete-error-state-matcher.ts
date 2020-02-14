import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { LuxLookupComponent } from '../lux-lookup-model/lux-lookup-component';
import { LuxLookupTableEntry } from '../lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupErrorStateMatcher } from '../lux-lookup-model/lux-lookup-error-state-matcher';

export class LuxAutocompleteErrorStateMatcher extends LuxLookupErrorStateMatcher {
  entries: LuxLookupTableEntry[] = [];

  constructor(lookupComponent: LuxLookupComponent, entries: LuxLookupTableEntry[]) {
    super(lookupComponent);

    this.entries = entries;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (control && typeof control.value === 'string' && control.value.length > 0) {
      if (!control.errors || !control.errors.noResult) {
        setTimeout(() => {
          control.setErrors({ noResult: true });
        });
      }
      return true;
    }

    return super.isErrorState(control, form);
  }
}
