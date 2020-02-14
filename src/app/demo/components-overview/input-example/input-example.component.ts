import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-input-example',
  templateUrl: './input-example.component.html'
})
export class InputExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showSuffix: boolean = false;
  showPrefix: boolean = false;
  useErrorMessage: boolean = true;
  showOutputEvents: boolean = false;
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  typeOptions = ['text', 'number', 'email', 'time', 'password', 'color'];
  autocompleteOptions = ['on', 'off'];
  form: FormGroup;
  log = logResult;

  // endregion

  // region Properties der Component

  value: any;
  controlBinding: string = 'inputExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  numberLeft: boolean;
  label: string = 'Label';
  hint: string = 'Hint';
  placeholder: string = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';
  autocomplete: string = 'off';
  inputType = 'text';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';
  maxLength: number;

  // endregion

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      inputExample: []
    });
  }

  ngOnInit() {}

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  emptyCallback() {}
}
