import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  emptyErrorCallback,
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface InputDummyForm {
  inputExample: FormControl<string | null>;
}

@Component({
  selector: 'lux-input-ac-example',
  templateUrl: './input-authentic-example.component.html',
  styleUrls: ['./input-authentic-example.component.scss']
})
export class InputAuthenticExampleComponent {
  longLabel =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, laudantium sequi quo mollitia id magnam voluptatum suscipit assumenda perspiciatis ab! Sit voluptas qui sed quas, sapiente ea officia nesciunt eveniet obcaecati dolorem nostrum commodi temporibus esse minus, corrupti repellat hic consequatur pariatur!';
  longHint =
    'Sit voluptas qui sed quas, sapiente ea officia nesciunt eveniet obcaecati dolorem nostrum commodi temporibus esse minus, corrupti repellat hic consequatur pariatur! Ducimus adipisci qui officia. Sit voluptas qui sed quas, sapiente ea officia nesciunt eveniet obcaecati dolorem nostrum commodi temporibus esse minus, corrupti repellat hic consequatur pariatur! Ducimus adipisci qui officia.';

  showSuffix = false;
  showPrefix = false;
  useErrorMessage = true;
  showOutputEvents = false;
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  typeOptions = ['text', 'number', 'email', 'time', 'password', 'color'];
  autocompleteOptions = ['on', 'off'];
  form: FormGroup<InputDummyForm>;
  log = logResult;
  value: any;
  controlBinding = 'inputExample';
  disabled = false;
  readonly = false;
  required = false;
  numberLeft = false;
  label = 'Label';
  hint = 'Optionaler Zusatztext';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  autocomplete = 'off';
  inputType = 'text';
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  errorCallbackString = this.errorCallback + '';
  maxLength = 0;
  hideCounterLabel = false;
  labelLongFormat = false;
  denseFormat = false;
  exampleCompany = '';
  exampleDate = '';
  exampleStreet = '';
  exampleNumber = '';

  constructor() {
    this.form = new FormGroup<InputDummyForm>({
      inputExample: new FormControl<string | null>(null)
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
