import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxSliderColor } from '../../../modules/lux-form/lux-slider/lux-slider.component';
import {
  emptyErrorCallback,
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface SliderDummyForm {
  sliderExample: FormControl<number | null>;
}

@Component({
  selector: 'app-slider-example',
  templateUrl: './slider-example.component.html'
})
export class SliderExampleComponent {
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
  form: FormGroup<SliderDummyForm>;
  log = logResult;
  percent = 0;
  percentReactive = 0;
  tickIntervalNumber = 0;
  tickIntervalAuto = true;
  labelLongFormat = false;
  value = 0;
  displayWithFnString: string = this.displayFn + '';
  color: LuxSliderColor = 'primary';
  vertical = false;
  invert = false;
  showThumbLabel = true;
  alwaysVisible = true;
  tickInterval: any = 'auto';
  step = 1;
  controlBinding = 'sliderExample';
  disabled = false;
  readonly = false;
  required = false;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  max = 100;
  min = 0;
  controlValidators: ValidatorFn[] = [];
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  errorCallbackString: string = this.errorCallback + '';

  constructor() {
    this.form = new FormGroup<SliderDummyForm>({
      sliderExample: new FormControl<number | null>(null)
    });
  }

  tickIntervalChanged(checked: boolean) {
    this.tickIntervalAuto = checked;
    if (checked) {
      this.tickInterval = 'auto';
    } else {
      this.tickInterval = this.tickIntervalNumber;
    }
  }

  tickIntervalNumberChanged(interval: any) {
    this.tickInterval = interval;
    this.tickIntervalNumber = interval;
  }

  colorChanged(color: { label: string; value: LuxSliderColor }) {
    this.color = color.value;
  }

  percentChanged(percent: number) {
    this.percent = percent;
    this.log(this.showOutputEvents, 'Percent changed', percent);
  }

  percentReactiveChanged(percent: number) {
    this.percentReactive = percent;
    this.log(this.showOutputEvents, 'Percent (Reactive Example) changed', percent);
  }

  displayFn(value: number | null): string | number {
    if (value && value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value ?? 0;
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }
}
