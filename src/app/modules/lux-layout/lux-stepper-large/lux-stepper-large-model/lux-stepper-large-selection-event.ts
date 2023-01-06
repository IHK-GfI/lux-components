import { LuxStepperLargeComponent } from '../lux-stepper-large.component';
import { ILuxStepperLargeStep } from './lux-stepper-large-step.interface';

export class LuxStepperLargeSelectionEvent {
  stepper: LuxStepperLargeComponent;
  currentIndex: number;
  currentStep: ILuxStepperLargeStep;
  prevIndex: number;
  prevStep: ILuxStepperLargeStep;

  constructor(
    stepper: LuxStepperLargeComponent,
    currentIndex: number,
    currentStep: ILuxStepperLargeStep,
    prevIndex: number,
    prevStep: ILuxStepperLargeStep
  ) {
    this.stepper = stepper;
    this.currentIndex = currentIndex;
    this.currentStep = currentStep;
    this.prevIndex = prevIndex;
    this.prevStep = prevStep;
  }
}
