import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.component.html'
})
export class DatepickerExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  useCustomFilter: boolean = false;
  useErrorMessage: boolean = true;
  showOutputEvents: boolean = false;
  form: FormGroup;
  log = logResult;

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' }
  ];

  // endregion

  // region Properties der Component

  value: any = null;
  controlBinding: string = 'datepickerExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  label: string = 'Label';
  hint: string = 'Hint';
  hintShowOnlyOnFocus: boolean = false;
  placeholder: string = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';
  showToggle: boolean = true;
  opened: boolean = false;
  startDate: string;
  locale: string = 'de-DE';
  minDate: string;
  maxDate: string;
  startView: string = 'month';
  touchUi: boolean = false;

  // endregion

  customFilterString = this.customFilter + '';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      datepickerExample: []
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

  customFilter(d: Date) {
    const day = d.getDay();
    // Samstage und Sonntage als Auswahl unterbinden
    return day !== 0 && day !== 6;
  }
}
