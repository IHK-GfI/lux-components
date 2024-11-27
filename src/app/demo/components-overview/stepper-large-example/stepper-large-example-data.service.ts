import { Injectable } from '@angular/core';
import {
  LuxStepperLargeButtonInfo,
  LUX_STEPPER_LARGE_DEFAULT_FIN_BTN_CONF,
  LUX_STEPPER_LARGE_DEFAULT_NEXT_BTN_CONF,
  LUX_STEPPER_LARGE_DEFAULT_PREV_BTN_CONF
} from '../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-button-info';

@Injectable({
  providedIn: 'root'
})
export class StepperLargeExampleDataService {
  prevButtonConfig: LuxStepperLargeButtonInfo = JSON.parse(JSON.stringify(LUX_STEPPER_LARGE_DEFAULT_PREV_BTN_CONF));
  nextButtonConfig: LuxStepperLargeButtonInfo = JSON.parse(JSON.stringify(LUX_STEPPER_LARGE_DEFAULT_NEXT_BTN_CONF));
  finButtonConfig: LuxStepperLargeButtonInfo = JSON.parse(JSON.stringify(LUX_STEPPER_LARGE_DEFAULT_FIN_BTN_CONF));
  luxStepValidationActive = true;

  constructor() {}
}
