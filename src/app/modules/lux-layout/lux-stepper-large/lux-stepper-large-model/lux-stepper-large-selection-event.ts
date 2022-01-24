import { LuxStepperLargeComponent } from '../lux-stepper-large.component';
import { ILuxStepperLargeStep } from './lux-stepper-large-step.interface';

export class LuxStepperLargeSelectionEvent {
  stepper: LuxStepperLargeComponent;
  currentIndex: number;
  currentStep: ILuxStepperLargeStep;
  prevIndex: number;
  prevStep: ILuxStepperLargeStep;
}
