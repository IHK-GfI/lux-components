import { Directive } from '@angular/core';
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';

@Directive({
  selector: '[luxSelectOptionHeight]'
})
export class LuxSelectOptionHeightDirective {
  constructor(public matSelect: MatSelect) {
    // Die Höhe hier muss mit der Summe aus den SCSS-Klassen "option-height (-> height)" und
    // "lux-select-panel (-> margin-bottom)" übereinstimmen.
    (this.matSelect as any)._getItemHeight = () => 48;
  }
}
