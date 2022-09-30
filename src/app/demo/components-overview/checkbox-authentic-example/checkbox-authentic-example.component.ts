import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyErrorCallback, exampleErrorCallback } from '../../example-base/example-base-util/example-base-helper';

interface CheckboxDummyForm {
  checkboxExample: FormControl<boolean | null>;
}

interface CheckboxAgbDummyForm {
  checkbox1: FormControl<boolean>;
  checkbox2: FormControl<boolean>;
  checkbox3: FormControl<boolean>;
}

@Component({
  selector: 'lux-checkbox-authentic-example',
  templateUrl: './checkbox-authentic-example.component.html',
  styleUrls: ['./checkbox-authentic-example.component.scss']
})
export class CheckboxAuthenticExampleComponent  {
  useErrorMessage = true;
  form: FormGroup<CheckboxDummyForm>;
  agb: FormGroup<CheckboxAgbDummyForm>;
  exampleText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
  value = false;
  controlBinding = 'checkboxExample';
  label = 'Labeltext';
  hint = 'Optionaler Zusatztext';
  hintShowOnlyOnFocus = false;
  disabled = false;
  readonly = false;
  required = false;
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;

  constructor() {
    this.form = new FormGroup<CheckboxDummyForm>({
      checkboxExample: new FormControl<boolean | null>(null)
    });
    this.agb = new FormGroup<CheckboxAgbDummyForm>({
      checkbox1: new FormControl<boolean>(false, {validators: Validators.required, nonNullable: true}),
      checkbox2: new FormControl<boolean>(false, {validators: Validators.required, nonNullable: true}),
      checkbox3: new FormControl<boolean>(false, {validators: Validators.required, nonNullable: true}),
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

  exampleValidator(showError: boolean) {
    Object.keys(this.agb.controls).forEach((key) => {
      if (showError) {
        this.agb.get(key)!.markAsTouched();
      } else {
        this.agb.get(key)!.markAsUntouched();
      }
      this.agb.get(key)!.updateValueAndValidity();
    });
  }
}
