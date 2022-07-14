import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-textarea-example',
  templateUrl: './textarea-example.component.html'
})
export class TextareaExampleComponent {
  // region Helper-Properties für das Beispiel

  useErrorMessage = true;
  showOutputEvents = false;

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  autocompleteOptions = ['on', 'off'];
  form: UntypedFormGroup;
  log = logResult;

  // endregion

  // region Properties der Component

  value: any;
  controlBinding = 'textareaExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  autocomplete = 'off';
  max = -1;
  min = 1;
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';
  maxLength: number;
  hideCounterLabel = false;
  labelLongFormat = false;
  
  // endregion

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      textareaExample: ['']
    });
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  emptyCallback() {}
}
