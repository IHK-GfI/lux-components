import { Component, OnInit } from '@angular/core';
import { LuxStepperLargeClickEvent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxVetoState } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { ILuxDialogPresetConfig } from '../../../../modules/lux-popups/lux-dialog/lux-dialog-model/lux-dialog-preset-config.interface';
import { LuxDialogService } from '../../../../modules/lux-popups/lux-dialog/lux-dialog.service';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-stepper-large-example-step-veto',
  templateUrl: './stepper-large-example-step-veto.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleStepVetoComponent }]
})
export class StepperLargeExampleStepVetoComponent extends LuxStepperLargeStepComponent implements OnInit {
  dialogConfig: ILuxDialogPresetConfig = {
    title: 'Lorem ipsum?',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et\n' +
             '          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    disableClose: true,
    width: 'auto',
    height: 'auto',
    panelClass: [],
    confirmAction: {
      label: 'Fortfahren',
      raised: true,
      color: 'warn'
    },
    declineAction: {
      label: 'Abbrechen',
      raised: true,
    }
  };

  useVetoFn = false;

  myVetoFn = (stepperEvent: LuxStepperLargeClickEvent) => this.createMyVetoPromis(stepperEvent);
  vetoYesFn = (stepperEvent: LuxStepperLargeClickEvent) => this.createVetoYesPromise(stepperEvent);
  vetoNoFn = (stepperEvent: LuxStepperLargeClickEvent) => this.createVetoNoPromise(stepperEvent);

  constructor(private dialogService: LuxDialogService, private snackbar: LuxSnackbarService) {
    super();
  }

  ngOnInit(): void {
    this.luxTitle = 'Veto-Schritt';
    this.luxCompleted = true;

    this.luxVetoFn = this.myVetoFn;
  }

  updateVetoFun(useVetoFn: boolean) {
    this.luxVetoFn = useVetoFn ? this.vetoYesFn : this.vetoNoFn;
  }

  createMyVetoPromis(event: LuxStepperLargeClickEvent): Promise<LuxVetoState> {
    const component = this;

    const dialogRef = component.dialogService.open(component.dialogConfig);

    // return Promise.resolve(LuxVetoState.navigationAccepted);

    return new Promise(function (resolve, reject) {

      dialogRef.dialogDeclined.subscribe((result: any) => {
        console.log('dialogDeclined');
        resolve(LuxVetoState.navigationRejected);
      });

      dialogRef.dialogConfirmed.subscribe((result: any) => {
        console.log('dialogConfirmed');
        resolve(LuxVetoState.navigationAccepted);
      });
    });
  }

  createVetoYesPromise(event: LuxStepperLargeClickEvent): Promise<LuxVetoState> {
    this.logEvent(event);

    // this.snackbar.open(5000, {
    //   iconName: 'lux-interface-alert-warning-circle',
    //   iconSize: '2x',
    //   iconColor: 'red',
    //   text: 'Es wurde ein Veto eingelegt!'
    // });

    const component = this;

    return new Promise(function (resolve, reject) {
      const dialogRef = component.dialogService.open(component.dialogConfig);

      dialogRef.dialogClosed.subscribe((result: any) => {
        console.log('dialogClosed', result);
        resolve(LuxVetoState.navigationAccepted);
      });

      dialogRef.dialogDeclined.subscribe((result: any) => {
        console.log('dialogDeclined');
        resolve(LuxVetoState.navigationRejected);
      });

      dialogRef.dialogConfirmed.subscribe((result: any) => {
        console.log('dialogConfirmed');
        resolve(LuxVetoState.navigationAccepted);
      });
    });
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
