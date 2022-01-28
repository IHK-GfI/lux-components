import { Component, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { LuxStepperLargeClickEvent } from '../../lux-stepper-large-model/lux-stepper-large-click-event';
import { ILuxStepperLargeStep, LuxVetoState } from '../../lux-stepper-large-model/lux-stepper-large-step.interface';

@Component({
  selector: 'lux-stepper-large-step',
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class LuxStepperLargeStepComponent implements ILuxStepperLargeStep {
  @ViewChild('content', { static: true }) contentTemplate: TemplateRef<any>;

  @Input() luxTitle = '';
  @Input() luxTouched = false;
  @Input() luxCompleted = false;
  @Input() luxVetoFn: (clickEvent: LuxStepperLargeClickEvent) => Promise<LuxVetoState> = () =>
    Promise.resolve(LuxVetoState.navigationAccepted);

  constructor() {}
}
