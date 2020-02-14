import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-textarea-example',
  templateUrl: './textarea-example.component.html'
})
export class TextareaExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  useErrorMessage: boolean = true;
  showOutputEvents: boolean = false;

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  autocompleteOptions = ['on', 'off'];
  form: FormGroup;
  log = logResult;

  // endregion

  // region Properties der Component

  value: any;
  controlBinding: string = 'textareaExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  label: string = 'Label';
  hint: string = 'Hint';
  placeholder: string = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';
  autocomplete: string = 'off';
  max: number = -1;
  min: number = 1;
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';
  maxLength: number;

  // endregion

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      textareaExample: ['']
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
