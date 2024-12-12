import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LuxToggleAcComponent } from 'src/app/modules/lux-form/lux-toggle-ac/lux-toggle-ac.component';

@Component({
  selector: 'lux-stepper-large-extern-step-example',
  templateUrl: './stepper-large-extern-step-example.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExternStepExampleComponent }]
})
export class StepperLargeExternStepExampleComponent extends LuxStepperLargeStepComponent implements OnInit, AfterViewInit {
  @ViewChild('requiredCheck') toggle!: LuxToggleAcComponent;

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
        if (this.showErrorMessage) {
          this.toggle.formControl.markAsTouched();
        }
      })
    );
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
