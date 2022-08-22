import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emptyErrorCallback, exampleErrorCallback } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'toggle-example',
  templateUrl: './toggle-example.component.html'
})
export class ToggleExampleComponent {
  // region Helper-Properties für das Beispiel

  useErrorMessage = true;
  form: UntypedFormGroup;

  // endregion

  // region Properties der Component

  value = false;
  controlBinding = 'toggleExample';
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
      toggleExample: []
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

}
