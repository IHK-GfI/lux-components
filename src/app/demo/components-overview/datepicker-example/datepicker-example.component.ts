import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.component.html'
})
export class DatepickerExampleComponent {
  // region Helper-Properties für das Beispiel

  useCustomFilter = false;
  useErrorMessage = true;
  showOutputEvents = false;
  form: FormGroup;
  log = logResult;

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' }
  ];

  // endregion

  // region Properties der Component

  value = new Date(2020, 5, 28, 14, 15); // '2021-09-07T23:00:00.000Z';
  controlBinding = 'datepickerExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  showToggle = true;
  opened = false;
  startDate: string;
  locale = null;
  minDate: string;
  maxDate: string;
  startView = 'month';
  touchUi = false;

  // endregion

  customFilterString = this.customFilter + '';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';

  constructor(@Inject(MAT_DATE_LOCALE) private matDateLocale, private fb: FormBuilder) {
    this.locale = matDateLocale === 'en' ? 'en-US' : matDateLocale;
    switch (matDateLocale) {
      case 'de':
        this.locale = 'de-De';
        break;
      case 'en':
        this.locale = 'en-US';
        break;
      case 'fr':
        this.locale = 'fr-FR';
        break;
      default:
        this.locale = matDateLocale;
    }

    this.form = this.fb.group({
      datepickerExample: [new Date(2020, 5, 28, 14, 15)] //['2021-09-07T23:00:00.000Z']
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

  customFilter(d: Date) {
    const day = d.getDay();
    // Samstage und Sonntage als Auswahl unterbinden
    return day !== 0 && day !== 6;
  }
}
