import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'lux-input-ac-example',
  templateUrl: './input-authentic-example.component.html'
})
export class InputAuthenticExampleComponent  {
  longLabel="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, laudantium sequi quo mollitia id magnam voluptatum suscipit assumenda perspiciatis ab! Sit voluptas qui sed quas, sapiente ea officia nesciunt eveniet obcaecati dolorem nostrum commodi temporibus esse minus, corrupti repellat hic consequatur pariatur!";
  longHint="Sit voluptas qui sed quas, sapiente ea officia nesciunt eveniet obcaecati dolorem nostrum commodi temporibus esse minus, corrupti repellat hic consequatur pariatur! Ducimus adipisci qui officia. Sit voluptas qui sed quas, sapiente ea officia nesciunt eveniet obcaecati dolorem nostrum commodi temporibus esse minus, corrupti repellat hic consequatur pariatur! Ducimus adipisci qui officia.";


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
  form: FormGroup;
  log = logResult;
  
  // endregion

  // region Properties der Component

  value: any;
  controlBinding = 'inputExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  numberLeft: boolean;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  autocomplete = 'off';
  inputType = 'text';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';
  maxLength: number;
  hideCounterLabel = false;
  labelLongFormat = false;
  // endregion
  
  //Werte für die Bespiel-Card
  exampleCompany='';
  exampleDate='';
  exampleStreet='';
  exampleNumber='';
  examplePLZ='';
  exampleCity='';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      inputExample: []
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
