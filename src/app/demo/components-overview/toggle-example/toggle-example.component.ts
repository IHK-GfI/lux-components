import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { exampleErrorCallback } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'toggle-example',
  templateUrl: './toggle-example.component.html'
})
export class ToggleExampleComponent {
  // region Helper-Properties für das Beispiel

  useErrorMessage = true;
  form: FormGroup;

  // endregion

  // region Properties der Component

  value;
  controlBinding = 'toggleExample';
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  disabled = false;
  readonly: boolean;
  required: boolean;
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  errorCallback = exampleErrorCallback;

  // endregion

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      toggleExample: []
    });
  }

  changeRequired($event: boolean) {
    this.required = $event;
    if ($event) {
      this.form.get(this.controlBinding).setValidators(Validators.requiredTrue);
    } else {
      this.form.get(this.controlBinding).setValidators(null);
    }
    this.form.get(this.controlBinding).updateValueAndValidity();
  }

  emptyCallback() {}
}
