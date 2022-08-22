import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxStepperLargeClickEvent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxVetoState } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { LuxUtil } from '../../../../modules/lux-util/lux-util';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';

@Component({
  selector: 'app-stepper-large-example-step-prev-button',
  templateUrl: './stepper-large-example-step-prev-button.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleStepPrevButtonComponent }]
})
export class StepperLargeExampleStepPrevButtonComponent extends LuxStepperLargeStepComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;

  subscriptions: Subscription[] = [];

  constructor(private fb: UntypedFormBuilder, public dataService: StepperLargeExampleDataService) {
    super();

    this.form = this.fb.group({
      label: [this.dataService.prevButtonConfig.label, Validators.required],
      iconName: [this.dataService.prevButtonConfig.iconName],
      color: [this.dataService.prevButtonConfig.color],
      iconShowRight: [this.dataService.prevButtonConfig.iconShowRight],
      alignIconWithLabel: [this.dataService.prevButtonConfig.alignIconWithLabel]
    });
  }

  ngOnInit(): void {
    this.luxTitle = 'Konfiguration: Zurück-Button';
    this.luxVetoFn = this.createVetoPromise;

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
            component.dataService.prevButtonConfig = component.form.value;

            // Als letztes wird der Step als valide gekennzeichnet.
            component.luxCompleted = true;
          } else {
            // Das Formular ist noch nicht valide und deswegen wird der Step
            // als noch nicht fertig gekennzeichnet.
            component.luxCompleted = false;
            // LuxUtil.showValidationErrors(component.form);
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
