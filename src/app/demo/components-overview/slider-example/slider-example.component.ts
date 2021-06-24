import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SLIDER_COLORS } from '../../../modules/lux-form/lux-slider/lux-slider.component';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-slider-example',
  templateUrl: './slider-example.component.html',
  styles: ['']
})
export class SliderExampleComponent {
  // region Helper-Properties für das Beispiel

  useErrorMessage = true;
  useDisplayFn = false;
  showOutputEvents = false;

  colorOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Accent', value: 'accent' },
    { label: 'Warn', value: 'warn' }
  ];
  validatorOptions = [
    { value: Validators.max(100), label: 'Validators.max(100)' },
    { value: Validators.min(25), label: 'Validators.min(25)' }
  ];
  form: FormGroup;
  log = logResult;

  percent: number;
  percentReactive: number;
  tickIntervalNumber = 0;
  tickIntervalAuto = true;

  // endregion

  // region Properties der Component

  value = 0;
  displayWithFnString: string = this.displayFn + '';

  color: SLIDER_COLORS = 'primary';
  vertical = false;
  invert = false;
  showThumbLabel = true;
  alwaysVisible = true;
  tickInterval: any = 'auto';
  step = 1;
  controlBinding = 'sliderExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  max = 100;
  min = 0;
  controlValidators: ValidatorFn[] = [];
  errorCallback = exampleErrorCallback;
  errorCallbackString: string = this.errorCallback + '';

  // endregion

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sliderExample: new FormControl()
    });
  }

  tickIntervalChanged(checked) {
    this.tickIntervalAuto = checked;
    if (checked) {
      this.tickInterval = 'auto';
    } else {
      this.tickInterval = this.tickIntervalNumber;
    }
  }

  tickIntervalNumberChanged(interval) {
    this.tickInterval = interval;
    this.tickIntervalNumber = interval;
  }

  colorChanged(color: { label; value }) {
    this.color = color.value;
  }

  percentChanged(percent) {
    this.percent = percent;
    this.log(this.showOutputEvents, 'Percent changed', percent);
  }

  percentReactiveChanged(percent) {
    this.percentReactive = percent;
    this.log(this.showOutputEvents, 'Percent (Reactive Example) changed', percent);
  }

  displayFn(value: number | null): string | number {
    if (value && value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
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
