import { Directive } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: '[luxSelectOptionHeight]'
})
export class LuxSelectOptionHeightDirective {
  constructor(public matSelect: MatSelect) {
    // Die Höhe hier muss mit der Summe aus den SCSS-Klassen "option-height (-> height)" und
    // "lux-select-panel (-> margin-bottom)" übereinstimmen.
    (<any>this.matSelect)._getItemHeight = () => 48;
  }
}
