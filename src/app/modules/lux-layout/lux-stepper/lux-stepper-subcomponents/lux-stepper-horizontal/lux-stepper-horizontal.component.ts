import { Component } from '@angular/core';
import { LuxStepperParent } from '../../lux-stepper-model/lux-stepper-parent.class';

@Component({
  selector: 'lux-stepper-horizontal',
  templateUrl: './lux-stepper-horizontal.component.html',
  styleUrls: ['./lux-stepper-horizontal.component.scss']
})
export class LuxStepperHorizontalComponent extends LuxStepperParent {
  constructor() {
    super();
  }
}
