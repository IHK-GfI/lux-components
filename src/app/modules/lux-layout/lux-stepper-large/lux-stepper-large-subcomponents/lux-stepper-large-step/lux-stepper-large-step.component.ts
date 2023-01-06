import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { LuxUtil } from '../../../../lux-util/lux-util';
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
export class LuxStepperLargeStepComponent implements ILuxStepperLargeStep, AfterViewInit {
  @ViewChild('content', { static: true }) contentTemplate!: TemplateRef<any>;

  @Input() luxTitle = '';
  @Input() luxTouched = false;
  @Input() luxCompleted = false;
  @Input() luxDisabled = false;
  @Input() luxVetoFn: (clickEvent: LuxStepperLargeClickEvent) => Promise<LuxVetoState> = () =>
    Promise.resolve(LuxVetoState.navigationAccepted);

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('contentTemplate', this.contentTemplate);
  }
}
