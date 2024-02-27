import { Component } from '@angular/core';
import { LuxStepperParent } from '../../lux-stepper-model/lux-stepper-parent.class';

@Component({
  selector: 'lux-stepper-vertical',
  templateUrl: './lux-stepper-vertical.component.html'
})
export class LuxStepperVerticalComponent extends LuxStepperParent {
  constructor() {
    super();
  }
}
