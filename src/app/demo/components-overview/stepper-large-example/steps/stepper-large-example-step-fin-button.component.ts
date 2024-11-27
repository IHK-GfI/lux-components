import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxStepperLargeClickEvent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-click-event';
import { LuxVetoState } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-model/lux-stepper-large-step.interface';
import { LuxStepperLargeStepComponent } from '../../../../modules/lux-layout/lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { LuxThemePalette } from '../../../../modules/lux-util/lux-colors.enum';
import { LuxUtil } from '../../../../modules/lux-util/lux-util';
import { StepperLargeExampleDataService } from '../stepper-large-example-data.service';

interface StepperLargeFinButtonDummyForm {
  label: FormControl<string>;
  iconName: FormControl<string | undefined>;
  color: FormControl<LuxThemePalette | undefined>;
  iconShowRight: FormControl<boolean | undefined>;
  alignIconWithLabel: FormControl<boolean | undefined>;
}

@Component({
  selector: 'app-stepper-large-example-step-fin-button',
  templateUrl: './stepper-large-example-step-fin-button.component.html',
  providers: [{ provide: LuxStepperLargeStepComponent, useExisting: StepperLargeExampleStepFinButtonComponent }]
})
export class StepperLargeExampleStepFinButtonComponent extends LuxStepperLargeStepComponent implements OnInit, OnDestroy {
  form: FormGroup<StepperLargeFinButtonDummyForm>;

  subscriptions: Subscription[] = [];

  constructor(public dataService: StepperLargeExampleDataService) {
    super();

    this.form = new FormGroup<StepperLargeFinButtonDummyForm>({
      label: new FormControl<string>(this.dataService.finButtonConfig.label ?? '', { validators: Validators.required, nonNullable: true }),
      iconName: new FormControl<string | undefined>(this.dataService.finButtonConfig.iconName, { nonNullable: true }),
      color: new FormControl<LuxThemePalette | undefined>(this.dataService.finButtonConfig.color, { nonNullable: true }),
      iconShowRight: new FormControl<boolean | undefined>(this.dataService.finButtonConfig.iconShowRight, { nonNullable: true }),
      alignIconWithLabel: new FormControl<boolean | undefined>(this.dataService.finButtonConfig.alignIconWithLabel, { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.luxTitle = 'Konfiguration: Abschließen-Button';
    this.luxVetoFn = this.createVetoPromise;

    this.form.get('alignIconWithLabel')!.disable();

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
            component.dataService.finButtonConfig = component.form.value;

            // Als letztes wird der Step als valide gekennzeichnet.
            component.luxCompleted = true;
          } else {
            // Das Formular ist noch nicht valide und deswegen wird der Step
            // als noch nicht fertig gekennzeichnet.
            component.luxCompleted = false;
          }
          if (component.dataService.luxStepValidationActive) {
            resolve(component.luxCompleted ? LuxVetoState.navigationAccepted : LuxVetoState.navigationRejected);
          } else {
            resolve(LuxVetoState.navigationAccepted);
          }
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
