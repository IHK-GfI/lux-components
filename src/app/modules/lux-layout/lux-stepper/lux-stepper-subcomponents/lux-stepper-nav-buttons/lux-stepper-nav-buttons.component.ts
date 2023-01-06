import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LuxStepComponent } from '../lux-step.component';
import { ILuxStepperConfiguration } from '../../lux-stepper-model/lux-stepper-configuration.interface';

@Component({
  selector: 'lux-stepper-nav-buttons',
  templateUrl: './lux-stepper-nav-buttons.component.html',
  styleUrls: ['./lux-stepper-nav-buttons.component.scss']
})
export class LuxStepperNavButtonsComponent {
  @Output() luxPrevClick = new EventEmitter<void>();
  @Output() luxNextClick = new EventEmitter<void>();
  @Output() luxFinClick = new EventEmitter<void>();

  @Input() luxIndex = -1;
  @Input() luxStep!: LuxStepComponent;
  @Input() luxStepperConfig?: ILuxStepperConfiguration;

  constructor() {}
}
