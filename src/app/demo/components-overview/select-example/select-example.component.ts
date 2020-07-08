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
    { label: 'Afghanistan', value: 1 },
    { label: 'Albanien', value: 2 },
    { label: 'Algerien', value: 3 },
    { label: 'Bahamas', value: 1 },
    { label: 'Belgien', value: 2 },
    { label: 'Brasilien', value: 3 },
    { label: 'China', value: 1 },
    { label: 'Deutschland', value: 2 },
    { label: 'Dominikanische Republik', value: 3 },
    { label: 'Elfenbeinküste ', value: 1 },
    { label: 'Gabun', value: 2 },
    { label: 'Griechenland', value: 3 },
    { label: 'Honduras', value: 1 },
    { label: 'Jamaika', value: 2 },
    { label: 'Japan', value: 3 },
    { label: 'Kanada', value: 1 },
    { label: 'Libyen', value: 2 },
    { label: 'Mexiko', value: 3 },
    { label: 'Montenegro', value: 1 },
    { label: 'Neuseeland', value: 2 },
    { label: 'Niederlande', value: 3 },
    { label: 'Norwegen', value: 1 },
    { label: 'Österreich', value: 2 },
    { label: 'Peru', value: 3 },
    { label: 'Polen', value: 1 },
    { label: 'Portugal', value: 2 },
    { label: 'Rumänien', value: 3 },
    { label: 'Russland', value: 1 },
    { label: 'San Marino', value: 2 },
    { label: 'Schweden', value: 3 },
    { label: 'Schweiz', value: 1 },
    { label: 'Singapur', value: 2 },
    { label: 'Spanien', value: 3 },
    { label: 'Südafrika', value: 1 },
    { label: 'Taiwan', value: 2 },
    { label: 'Thailand', value: 3 },
    { label: 'Türkei', value: 1 },
    { label: 'Ukraine', value: 2 },
    { label: 'Vereinigte Staaten', value: 3 },
    { label: 'Weihnachtsinsel', value: 1 },
    { label: 'Zypern', value: 2 }
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
  };

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
    this.value = null;
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
