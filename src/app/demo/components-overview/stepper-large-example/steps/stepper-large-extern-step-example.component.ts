import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'lux-stepper-large-extern-step-example',
  templateUrl: './stepper-large-extern-step-example.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExternStepExampleComponent }]
})
export class StepperLargeExternStepExampleComponent extends LuxStepperLargeStepComponent implements OnInit, AfterViewInit {
  showErrorMessage = false;
  subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,public dataService: StepperLargeExampleDataService) {
    super();
  }

  ngOnInit(): void {
    if (!this.luxTitle) {
      this.luxTitle = 'Lorem ipsum 4711';
    }

    this.subscriptions.push(
      this.dataService.showErrorMessage.subscribe((value) => {
        this.showErrorMessage = value;
      })
    );
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
