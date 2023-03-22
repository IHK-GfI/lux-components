import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  emptyErrorCallback,
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface TextareaDummyForm {
  textareaExample: FormControl<string | null>;
}

@Component({
  selector: 'lux-textarea-authentic-example',
  templateUrl: './textarea-authentic-example.component.html'
})
export class TextareaAuthenticExampleComponent {
  useErrorMessage = true;
  showOutputEvents = false;
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  autocompleteOptions = ['on', 'off'];
  form: FormGroup<TextareaDummyForm>;
  log = logResult;
  value: any;
  controlBinding = 'textareaExample';
  disabled = false;
  readonly = false;
  required = false;
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
  emptyCallback = emptyErrorCallback;
  errorCallbackString = this.errorCallback + '';
  maxLength = 0;
  hideCounterLabel = false;
  labelLongFormat = false;
  denseFormat = false;

  constructor() {
    this.form = new FormGroup<TextareaDummyForm>({
      textareaExample: new FormControl<string | null>(null)
    });
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }
}
