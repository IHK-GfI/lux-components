import { Component, OnInit } from '@angular/core';
import { LuxStepperLargeClickEvent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxVetoState } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-stepper-large-example-step-veto',
  templateUrl: './stepper-large-example-step-veto.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleStepVetoComponent }]
})
export class StepperLargeExampleStepVetoComponent extends LuxStepperLargeStepComponent implements OnInit {
  useVetoFn = false;

  vetoYesFn = (stepperEvent: LuxStepperLargeClickEvent) => this.createVetoYesPromise(stepperEvent);
  vetoNoFn = (stepperEvent: LuxStepperLargeClickEvent) => this.createVetoNoPromise(stepperEvent);

  constructor(private snackbar: LuxSnackbarService) {
    super();
  }

  ngOnInit(): void {
    this.luxTitle = 'Veto-Schritt';
    this.luxCompleted = true;

    this.updateVetoFun(this.useVetoFn);
  }

  updateVetoFun(useVetoFn: boolean) {
    this.luxVetoFn = useVetoFn ? this.vetoYesFn : this.vetoNoFn;
  }

  createVetoYesPromise(event: LuxStepperLargeClickEvent): Promise<LuxVetoState> {
    this.logEvent(event);

    this.snackbar.open(5000, {
      iconName: 'fas fa-exclamation-circle',
      iconSize: '2x',
      iconColor: 'red',
      text: 'Es wurde ein Veto eingelegt!'
    });

    return Promise.resolve(LuxVetoState.navigationRejected);
  }

  createVetoNoPromise(event: LuxStepperLargeClickEvent): Promise<LuxVetoState> {
    this.logEvent(event);

    return Promise.resolve(LuxVetoState.navigationAccepted);
  }

  logEvent(event: LuxStepperLargeClickEvent) {
    console.log(
      `Event 'luxVetoFn': \nAktueller Schritt "${this.luxTitle}" (index = ${event.stepper.steps
        .toArray()
        .findIndex((step) => step === this)} - hier wird das Vetorecht geprüft) \nNächster Schritt wäre "${
        event.newStep.luxTitle
      }" (index = ${event.newIndex})`
    );
  }
}
