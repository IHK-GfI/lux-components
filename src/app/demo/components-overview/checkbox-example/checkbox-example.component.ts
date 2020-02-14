import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { exampleErrorCallback } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'lux-checkbox-example',
  templateUrl: './checkbox-example.component.html'
})
export class CheckboxExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  useErrorMessage: boolean = true;
  form: FormGroup;

  // endregion

  // region Properties der Component

  value;
  controlBinding: string = 'checkboxExample';
  label: string = 'Label';
  hint: string = 'Hint';
  disabled = false;
  readonly: boolean;
  required: boolean;
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';
  errorCallback = exampleErrorCallback;

  // endregion

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkboxExample: []
    });
  }

  ngOnInit() {}

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
