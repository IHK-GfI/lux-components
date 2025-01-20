import { Component, Input, OnInit } from '@angular/core';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { Subscription } from 'rxjs';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';

@Component({
  selector: 'lux-stepper-large-example-error-message-box',
  templateUrl: './stepper-large-example-error-message-box.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleErrorMessageBoxComponent }]
})
export class StepperLargeExampleErrorMessageBoxComponent implements OnInit {
  @Input() luxTitle = '';
  @Input() luxCompleted = true;
  showErrorMessage = false;
  subscriptions: Subscription[] = [];

  constructor(public dataService: StepperLargeExampleDataService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.showErrorMessage.subscribe((value) => {
        this.showErrorMessage = value;
      })
    );
  }

}
