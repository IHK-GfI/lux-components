import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxDateTimeStartView } from "../../../modules/lux-form/lux-datetimepicker/lux-datetimepicker-model/lux-datetimepicker-types";
import {
  LuxDateTimePickerComponent,
} from '../../../modules/lux-form/lux-datetimepicker/lux-datetimepicker.component';
import {
  exampleErrorCallback,
  logResult,
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-datetimeicker-example',
  templateUrl: './datetimepicker-example.component.html'
})
export class DateTimepickerExampleComponent {
  @ViewChild('test2') dateTimeInFormComponent: LuxDateTimePickerComponent;

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

  value = null;
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
  labelLongFormat = false;
  minDate = '01.01.2000, 00:00';
  maxDate = '31.12.2100, 23:59';
  startView: LuxDateTimeStartView = 'month';
  startDate: string = null;
  startTime: number[] = null;
  _startTimeAsString: string = null;

  get startTimeAsString(): string {
    return this._startTimeAsString;
  }

  set startTimeAsString(startTime) {
    this._startTimeAsString = startTime;

    if (startTime && startTime.indexOf(':') >= 0) {
      const timeArr = startTime.trim().split(':');
      if (timeArr.length === 2) {
        this.startTime = [+timeArr[0], +timeArr[1]];
      } else {
        this.startTime = null;
      }
    } else {
      this.startTime = null;
    }
  }

  // endregion

  customFilterString = this.customFilter + '';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      datepickerExample: ['']
    });
  }

  changeRequired(required: boolean) {
    this.required = required;
    if (required) {
      this.form.get(this.controlBinding).setValidators([Validators.required, this.dateTimeInFormComponent.dateTimeValidator]);
    } else {
      this.form.get(this.controlBinding).setValidators(this.dateTimeInFormComponent.dateTimeValidator);
    }
    this.form.get(this.controlBinding).updateValueAndValidity();
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
