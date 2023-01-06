import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';

@Component({
  selector: 'lux-stepper-large-extern-step-example',
  templateUrl: './stepper-large-extern-step-example.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExternStepExampleComponent }]
})
export class StepperLargeExternStepExampleComponent extends LuxStepperLargeStepComponent implements OnInit, AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (!this.luxTitle) {
      this.luxTitle = 'Lorem ipsum 4711';
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
