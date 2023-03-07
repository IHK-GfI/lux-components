import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxDateFilterAcFn } from '../../../modules/lux-form/lux-datepicker-ac/lux-datepicker-ac.component';
import { LuxStartView } from '../../../modules/lux-form/lux-datepicker/lux-datepicker.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  emptyErrorCallback,
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface DatepickerDummyForm {
  datepickerExample: FormControl<string | null>;
}

@Component({
  selector: 'lux-datepicker-authentic-example',
  templateUrl: './datepicker-authentic-example.component.html'
})
export class DatepickerAuthenticExampleComponent {
  useCustomFilter = false;
  useErrorMessage = true;
  showOutputEvents = false;
  form: FormGroup<DatepickerDummyForm>;
  log = logResult;
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' }
  ];
  value = '2020-05-28T14:15:00.000Z';
  controlBinding = 'datepickerExample';
  disabled = false;
  readonly = false;
  required = false;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  showToggle = true;
  opened = false;
  startDate: string | null = null;
  locale = 'de-DE';
  minDate: string | null = null;
  maxDate: string | null = null;
  startView: LuxStartView = 'month';
  touchUi = false;
  labelLongFormat = false;
  customFilterString = this.weekendFilterFn + '';
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  errorCallbackString = this.errorCallback + '';
  customFilter?: LuxDateFilterAcFn;

  constructor(@Inject(MAT_DATE_LOCALE) private matDateLocale: string, private cdr: ChangeDetectorRef) {
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

    this.form = new FormGroup<DatepickerDummyForm>({
      datepickerExample: new FormControl<string | null>(new Date(2020, 5, 28, 14, 15) as any) // Das FormControl wandelt das Date-Objekt in einen String um -> ['2021-09-07T23:00:00.000Z']
    });
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  weekendFilterFn(d: Date | null) {
    const day = d ? d.getDay() : 0;
    // Samstage und Sonntage als Auswahl unterbinden
    return day !== 0 && day !== 6;
  }

  toggleCustomFilter() {
    this.customFilter = this.customFilter ? undefined : this.weekendFilterFn;
    this.cdr.detectChanges();
  }
}
