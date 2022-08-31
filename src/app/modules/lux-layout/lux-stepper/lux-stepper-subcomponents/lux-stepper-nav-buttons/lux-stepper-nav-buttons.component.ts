import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LuxStepComponent } from '../lux-step.component';
import { ILuxStepperConfiguration } from '../../lux-stepper-model/lux-stepper-configuration.interface';

@Component({
  selector: 'lux-stepper-nav-buttons',
  templateUrl: './lux-stepper-nav-buttons.component.html',
  styleUrls: ['./lux-stepper-nav-buttons.component.scss']
})
export class LuxStepperNavButtonsComponent {
  @Output() luxPrevClick: EventEmitter<void> = new EventEmitter();
  @Output() luxNextClick: EventEmitter<void> = new EventEmitter();
  @Output() luxFinClick: EventEmitter<void> = new EventEmitter();

  @Input() luxIndex = -1;
  @Input() luxStep!: LuxStepComponent;
  @Input() luxStepperConfig?: ILuxStepperConfiguration;

  constructor() {}
}
