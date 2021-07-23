import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxDatepickerStartViewType } from "../../../modules/lux-form/lux-datepicker/lux-datepicker.component";
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

  value: any = null;
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
  locale = 'de-DE';
  minDate: string;
  maxDate: string;
  startView: LuxDatepickerStartViewType = 'month';
  touchUi = false;

  // endregion

  customFilterString = this.customFilter + '';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      datepickerExample: []
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
