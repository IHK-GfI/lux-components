import { LuxStepperLargeComponent } from '../lux-stepper-large.component';
import { ILuxStepperLargeStep } from './lux-stepper-large-step.interface';

export type LuxStepperLargeClickEventSourceType = 'nav' | 'prev_button' | 'next_button' | 'fin_button';

export class LuxStepperLargeClickEvent {
  stepper: LuxStepperLargeComponent;
  newIndex: number;
  newStep: ILuxStepperLargeStep;
  source: LuxStepperLargeClickEventSourceType;
}
