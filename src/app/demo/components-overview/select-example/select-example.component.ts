import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { LuxFormSelectableBase } from '../../../modules/lux-form/lux-form-model/lux-form-selectable-base.class';
import {
  exampleCompareWithFn,
  exampleErrorCallback,
  examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-select-example',
  templateUrl: './select-example.component.html'
})
export class SelectExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  useErrorMessage: boolean = true;
  useTemplatesForLabels: boolean = false;
  useCompareWithFn: boolean = false;
  useValueFn: boolean;
  useSimpleArray: boolean;
  showOutputEvents: boolean = false;

  options: { label: string; value: number }[] = [
    { label: 'Option #1', value: 1 },
    { label: 'Option #2', value: 2 },
    { label: 'Option #3', value: 3 }
  ];

  optionsPrimitive: string[] = ['Option #1', 'Option #2', 'Option #3'];

  form: FormGroup;
  log = logResult;

  // endregion

  // region Properties der Component

  controlBinding: string = 'selectExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  label: string = 'Label';
  hint: string = 'Hint';
  placeholder: string = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';

  value;
  multiselectValue;

  errorCallback = exampleErrorCallback;
  pickValueFn = examplePickValueFn;
  compareWithFn = exampleCompareWithFn;

  pickValueFnString: string;
  compareWithFnString: string;
  errorCallbackString: string;

  // endregion

  defaultCompareWith = (o1, o2) => {
    return o1 === o2;
  }

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      selectExample: []
    });

    this.pickValueFnString = '' + this.pickValueFn;
    this.compareWithFnString = '' + this.compareWithFn;
    this.errorCallbackString = '' + this.errorCallback;

  }

  ngOnInit() {}

  showErrors(...comps: LuxFormSelectableBase[]) {
    this.value =  null;
    this.multiselectValue = null;
    this.form.get(this.controlBinding).setValue(null);

    this.changeRequired(true);

    comps.forEach((comp: LuxFormSelectableBase) => {
      comp.formControl.markAsTouched();
    });
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  changeUseSimpleArray($event: boolean) {
    this.reset();
    this.useValueFn = $event === true ? false : this.useValueFn;
    this.useCompareWithFn = $event === true ? false : this.useCompareWithFn;
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

  emptyCallback() {}

  reset(...comps: LuxFormSelectableBase[]) {
    this.value = undefined;
    this.multiselectValue = undefined;
    this.form.get(this.controlBinding).setValue(undefined);

    comps.forEach((comp: LuxFormSelectableBase) => {
      comp.formControl.markAsUntouched();
    });
  }
}
