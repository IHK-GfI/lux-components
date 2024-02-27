import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxRadioAcComponent } from '../../../modules/lux-form/lux-radio-ac/lux-radio-ac.component';
import {
  emptyErrorCallback,
  exampleCompareWithFn,
  exampleErrorCallback,
  examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface RadioDummyForm {
  radioExample: FormControl;
}

@Component({
  selector: 'lux-radio-authentic-example',
  templateUrl: './radio-authentic-example.component.html',
  styleUrls: []
})
export class RadioAuthenticExampleComponent {
  useErrorMessage = true;
  useTemplatesForLabels = false;
  useCompareWithFn = false;
  useValueFn = false;
  useSimpleArray = false;
  showOutputEvents = false;
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  options: { label: string; value: number; disabled?: boolean }[] = [
    { label: 'Option #1', value: 1, disabled: true },
    { label: 'Option #2', value: 2 },
    { label: 'Option #3', value: 3 }
  ];
  optionsPrimitive: string[] = ['Option #1', 'Option #2', 'Option #3'];
  form: FormGroup<RadioDummyForm>;
  log = logResult;
  controlBinding = 'radioExample';
  disabled = false;
  disabledFirst = true;
  readonly = false;
  required = false;
  isVertical = false;
  label = 'Label';
  hint = 'Optionaler Zusatztext';
  hintShowOnlyOnFocus = false;
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  value: any;
  groupNameReactive = 'reactiveGroup';
  groupNameNormal = 'normalGroup';
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  pickValueFn = examplePickValueFn;
  compareWithFn = exampleCompareWithFn;
  pickValueFnString: string;
  compareWithFnString: string;
  errorCallbackString: string;
  labelLongFormat = false;
  denseFormat = false;

  constructor() {
    this.form = new FormGroup<RadioDummyForm>({
      radioExample: new FormControl()
    });

    this.pickValueFnString = '' + this.pickValueFn;
    this.compareWithFnString = '' + this.compareWithFn;
    this.errorCallbackString = '' + this.errorCallback;
  }

  showErrors(...radioComponents: LuxRadioAcComponent[]) {
    this.value = null;
    this.form.get('radioExample')!.setValue(null);

    this.changeRequired(true);

    radioComponents.forEach((comp: LuxRadioAcComponent) => {
      comp.formControl.markAsTouched();
    });
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  changeUseSimpleArray($event: boolean) {
    this.reset();
    this.useValueFn = $event === true ? false : this.useValueFn;
    this.useCompareWithFn = $event === true ? false : this.useCompareWithFn;
    if ($event === true) {
      this.disabledFirst = false;
    }
  }

  changeUseValueFn($event: boolean) {
    this.reset();
    this.useSimpleArray = $event === true ? false : this.useSimpleArray;
    this.useCompareWithFn = $event === true ? false : this.useCompareWithFn;
  }

  changeCompareWithFn($event: boolean) {
    this.reset();
    this.useSimpleArray = $event === true ? false : this.useSimpleArray;
    this.useValueFn = $event === true ? false : this.useValueFn;
  }

  reset(...radioComponents: LuxRadioAcComponent[]) {
    this.value = undefined;
    this.form.get(this.controlBinding)!.setValue(undefined);
    this.disabledFirst = false;

    radioComponents.forEach((comp: LuxRadioAcComponent) => {
      comp.formControl.markAsUntouched();
    });
  }

  onToggleDisabledFirst() {
    this.options[0].disabled = this.disabledFirst;
  }

  onRefresh() {
    this.options = JSON.parse(JSON.stringify(this.options));
  }
}
