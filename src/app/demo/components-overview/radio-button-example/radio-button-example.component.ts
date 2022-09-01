import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxRadioComponent } from '../../../modules/lux-form/lux-radio/lux-radio.component';
import {
  emptyErrorCallback,
  exampleCompareWithFn,
  exampleErrorCallback,
  examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-radio-button-example',
  templateUrl: './radio-button-example.component.html'
})
export class RadioButtonExampleComponent {
  // region Helper-Properties für das Beispiel

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

  form: UntypedFormGroup;
  log = logResult;

  // endregion

  // region Properties der Component

  controlBinding = 'radioExample';
  disabled = false;
  disabledFirst = true;
  readonly = false;
  required = false;
  isVertical = false;
  label = 'Label';
  hint = 'Hint';
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
  // endregion

  constructor(private _fb: UntypedFormBuilder) {
    this.form = this._fb.group({
      radioExample: []
    });

    this.pickValueFnString = '' + this.pickValueFn;
    this.compareWithFnString = '' + this.compareWithFn;
    this.errorCallbackString = '' + this.errorCallback;
  }

  showErrors(...radioComponents: LuxRadioComponent[]) {
    this.value = null;
    this.form.get('radioExample')!.setValue(null);

    this.changeRequired(true);

    radioComponents.forEach((comp: LuxRadioComponent) => {
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

  changeUseSimpleArray(useSimpleArray: boolean) {
    this.reset();
    this.useValueFn = useSimpleArray ? false : this.useValueFn;
    this.useCompareWithFn = useSimpleArray ? false : this.useCompareWithFn;
    if (useSimpleArray) {
      this.disabledFirst = false;
    }
  }

  changeUseValueFn(useValueFn: boolean) {
    this.reset();
    this.useSimpleArray = useValueFn ? false : this.useSimpleArray;
    this.useCompareWithFn = useValueFn ? false : this.useCompareWithFn;
  }

  changeCompareWithFn(useCompareWithFn: boolean) {
    this.reset();
    this.useSimpleArray = useCompareWithFn ? false : this.useSimpleArray;
    this.useValueFn = useCompareWithFn ? false : this.useValueFn;
  }

  reset(...radioComponents: LuxRadioComponent[]) {
    this.value = undefined;
    this.form.get(this.controlBinding)!.setValue(undefined);
    this.disabledFirst = false;

    radioComponents.forEach((comp: LuxRadioComponent) => {
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
