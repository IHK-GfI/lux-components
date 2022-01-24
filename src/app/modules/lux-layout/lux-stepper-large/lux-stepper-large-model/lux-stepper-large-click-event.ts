import { LuxStepperLargeComponent } from '../lux-stepper-large.component';
import { ILuxStepperLargeStep } from './lux-stepper-large-step.interface';

export class LuxStepperLargeClickEvent {
  stepper: LuxStepperLargeComponent;
  newIndex: number;
  newStep: ILuxStepperLargeStep;
}
