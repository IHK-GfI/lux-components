import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxStepperLargeClickEvent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxVetoState } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { LuxUtil } from '../../../../modules/lux-util/lux-util';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';

@Component({
  selector: 'app-stepper-large-example-step-next-button',
  templateUrl: './stepper-large-example-step-next-button.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleStepNextButtonComponent }]
})
export class StepperLargeExampleStepNextButtonComponent extends LuxStepperLargeStepComponent implements OnInit, OnDestroy {
  form: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public dataService: StepperLargeExampleDataService) {
    super();
  }

  ngOnInit(): void {
    this.luxTitle = 'Konfiguration: Weiter-Button';
    this.luxVetoFn = this.createVetoPromise;

    this.form = this.fb.group({
      label: [this.dataService.nextButtonConfig.label, Validators.required],
      iconName: [this.dataService.nextButtonConfig.iconName],
      color: [this.dataService.nextButtonConfig.color],
      iconShowRight: [this.dataService.nextButtonConfig.iconShowRight],
      alignIconWithLabel: [this.dataService.nextButtonConfig.alignIconWithLabel]
    });

    this.form.get('alignIconWithLabel').disable();

    this.luxCompleted = this.form.valid;

    this.subscriptions.push(
      this.form.statusChanges.subscribe(() => {
        this.luxCompleted = this.form.valid;
      })
    );
  }

  createVetoPromise(event: LuxStepperLargeClickEvent): Promise<LuxVetoState> {
    const component = this;

    return new Promise(function (resolve, reject) {
      // Hier kann man prüfen, ob der Step valide ist. Auch das Backend
      // kann aufgerufen werden. Für die Demo gibt es aber kein Backend,
      // deshalb wird hier die setTimeout-Methode verwendet.
      // Hier kann man:
      // - Die Daten des Steps validieren.
      // - Die Daten aus dem Step in seine Datenstruktur übertragen.
      // - Über die resolve-Methode zurückmelden, ob zum nächsten Schritt navigiert werden darf.
      setTimeout(() => {
        if (!event.newStep.luxTouched) {
          // Prüfen, ob das Formular valide ist.
          if (component.form.valid) {
            // Hier werden die Daten aus dem Formular in den Datenservice übertragen.
            component.dataService.nextButtonConfig = component.form.value;

            // Als letztes wird der Step als valide gekennzeichnet.
            component.luxCompleted = true;
          } else {
            // Das Formular ist noch nicht valide und deswegen wird der Step
            // als noch nicht fertig gekennzeichnet.
            component.luxCompleted = false;
          }

          resolve(component.luxCompleted ? LuxVetoState.navigationAccepted : LuxVetoState.navigationRejected);
        } else {
          // Man darf zu jedem Schritt springen, wenn dieser bereits besucht wurde.
          LuxUtil.showValidationErrors(component.form);
          resolve(LuxVetoState.navigationAccepted);
        }
      }, 250);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
