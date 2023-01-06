import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyErrorCallback, exampleErrorCallback } from '../../example-base/example-base-util/example-base-helper';

interface ToggleDummyForm {
  toggleExample: FormControl<boolean | null>;
}

@Component({
  selector: 'lux-toggle-authentic-example',
  templateUrl: './toggle-authentic-example.component.html',
  styleUrls: []
})
export class ToggleAuthenticExampleComponent {
  useErrorMessage = true;
  form: FormGroup<ToggleDummyForm>;
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

  constructor() {
    this.form = new FormGroup<ToggleDummyForm>({
      toggleExample: new FormControl<boolean | null>(null)
    });
  }

  changeRequired(required: boolean) {
    this.required = required;
    if (required) {
      this.form.get(this.controlBinding)!.setValidators(Validators.requiredTrue);
    } else {
      this.form.get(this.controlBinding)!.setValidators(null);
    }
    this.form.get(this.controlBinding)!.updateValueAndValidity();
  }

}
