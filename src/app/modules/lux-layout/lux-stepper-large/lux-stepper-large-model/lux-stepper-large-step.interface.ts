import { TemplateRef } from '@angular/core';
import { LuxStepperLargeClickEvent } from './lux-stepper-large-click-event';

export enum LuxVetoState {
  navigationAccepted,
  navigationRejected
}

export interface ILuxStepperLargeStep {
  luxTitle: string;
  luxTouched: boolean;
  luxCompleted: boolean;
  luxDisabled: boolean;
  luxVetoFn: (clickEvent: LuxStepperLargeClickEvent) => Promise<LuxVetoState>;
  contentTemplate: TemplateRef<any>;
}
