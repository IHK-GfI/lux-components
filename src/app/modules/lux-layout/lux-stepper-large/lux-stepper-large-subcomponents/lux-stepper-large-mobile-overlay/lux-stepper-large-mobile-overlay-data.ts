import { InjectionToken } from '@angular/core';
import { LuxStepperLargeComponent } from '../../lux-stepper-large.component';

export const LUX_STEPPER_LARGE_OVERLAY_DATA = new InjectionToken<LuxStepperLargeMobileOverlayData>('LUX_STEPPER_LARGE_OVERLAY_DATA');

export interface LuxStepperLargeMobileOverlayData {
  stepperComponent: LuxStepperLargeComponent;
}
