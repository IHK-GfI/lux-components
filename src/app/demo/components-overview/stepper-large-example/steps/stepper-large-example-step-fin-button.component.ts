import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxStepperLargeClickEvent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxVetoState } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';

@Component({
  selector: 'app-stepper-large-example-step-fin-button',
  templateUrl: './stepper-large-example-step-fin-button.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleStepFinButtonComponent }]
})
export class StepperLargeExampleStepFinButtonComponent extends LuxStepperLargeStepComponent implements OnInit {
  form: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public dataService: StepperLargeExampleDataService) {
    super();
  }

  ngOnInit(): void {
    this.luxTitle = 'Konfiguration: Abschließen-Button';
    this.luxVetoFn = this.createVetoPromise;

    this.form = this.fb.group({
      label: [this.dataService.finButtonConfig.label, Validators.required],
      iconName: [this.dataService.finButtonConfig.iconName],
      color: [this.dataService.finButtonConfig.color],
      iconShowRight: [this.dataService.finButtonConfig.iconShowRight],
      alignIconWithLabel: [this.dataService.finButtonConfig.alignIconWithLabel]
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
        // Prüfen, ob das Formular valide ist.
        if (component.form.valid) {
          // Hier werden die Daten aus dem Formular in den Datenservice übertragen.
          component.dataService.finButtonConfig = component.form.value;

          // Als letztes wird der Step als valide gekennzeichnet.
          component.luxCompleted = true;
        } else {
          // Das Formular ist noch nicht valide und deswegen wird der Step
          // als noch nicht fertig gekennzeichnet.
          component.luxCompleted = false;
        }

        resolve(component.luxCompleted ? LuxVetoState.navigationAccepted : LuxVetoState.navigationRejected);
      }, 250);
    });
  }
}
