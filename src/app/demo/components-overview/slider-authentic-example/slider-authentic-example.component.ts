import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxSliderAcColor } from '../../../modules/lux-form/lux-slider-ac/lux-slider-ac.component';
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
  selector: 'lux-slider-authentic-example',
  templateUrl: './slider-authentic-example.component.html'
})
export class SliderAuthenticExampleComponent {
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
  labelLongFormat = false;
  value = 0;
  displayWithFnString: string = this.displayFn + '';
  color: LuxSliderAcColor = 'primary';
  showThumbLabel = true;
  step = 1;
  controlBinding = 'sliderExample';
  disabled = false;
  readonly = false;
  required = false;
  denseFormat = false;
  label = 'Label';
  hint = 'Optionaler Zusatztext';
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
      sliderExample: new FormControl<number>(0)
    });
  }

  colorChanged(color: { label: string; value: LuxSliderAcColor }) {
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

  displayFn(value: number): string {
    if (value && value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value ? ('' + value) : '0';
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }
}
