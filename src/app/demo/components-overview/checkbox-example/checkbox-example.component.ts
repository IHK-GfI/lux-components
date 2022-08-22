import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emptyErrorCallback, exampleErrorCallback } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'lux-checkbox-example',
  templateUrl: './checkbox-example.component.html',
  styleUrls: ['./checkbox-example.component.scss']
})
export class CheckboxExampleComponent {
  // region Helper-Properties für das Beispiel

  useErrorMessage = true;
  form: UntypedFormGroup;
  agb: UntypedFormGroup;
  exampleText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
  // endregion

  // region Properties der Component

  value = false;
  controlBinding = 'checkboxExample';
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  disabled = false;
  readonly = false;
  required = false;
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;

  // endregion

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      checkboxExample: []
    });
    this.agb = this.fb.group({
      checkbox1: [ '', Validators.requiredTrue ],
      checkbox2: [ '', Validators.requiredTrue ],
      checkbox3: [ '', Validators.requiredTrue ]
    });
  }

  changeRequired($event: boolean) {
    this.required = $event;
    if ($event) {
      this.form.get(this.controlBinding)!.setValidators(Validators.requiredTrue);
    } else {
      this.form.get(this.controlBinding)!.setValidators(null);
    }
    this.form.get(this.controlBinding)!.updateValueAndValidity();
  }

  exampleValidator($event: boolean) {
    Object.keys(this.agb.controls).forEach((key) => {
      if ($event) {
        this.agb.get(key)!.markAsTouched();
      } else {
        this.agb.get(key)!.markAsUntouched();
      }
      this.agb.get(key)!.updateValueAndValidity();
    });
  }
}
