import { Component } from '@angular/core';
import { LuxStepperParent } from '../../lux-stepper-model/lux-stepper-parent.class';

@Component({
  selector: 'lux-stepper-horizontal',
  templateUrl: './lux-stepper-horizontal.component.html'
})
export class LuxStepperHorizontalComponent extends LuxStepperParent {
  constructor() {
    super();
  }
}
