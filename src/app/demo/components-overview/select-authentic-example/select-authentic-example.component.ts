import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { LuxFormSelectableBase } from '../../../modules/lux-form/lux-form-model/lux-form-selectable-base.class';
import {
  emptyErrorCallback,
  exampleCompareWithFn,
  exampleErrorCallback,
  examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface SelectDummyForm {
  selectExample: FormControl<any>;
}

@Component({
  selector: 'lux-select-authentic-example',
  templateUrl: './select-authentic-example.component.html'
})
export class SelectAuthenticExampleComponent {
  useErrorMessage = true;
  useTemplatesForLabels = false;
  useCompareWithFn = false;
  useValueFn = false;
  useSimpleArray = false;
  showOutputEvents = false;
  options: { label: string; value: number }[] = [
    {
      label:
        'Argentinien, Bolivien, Chile, Costa Rica, Dominikanische Republik, Ecuador, El Salvador, Guatemala, Honduras, Kolumbien, Kuba, Mexiko',
      value: 0
    },
    { label: 'Afghanistan', value: 1 },
    { label: 'Albanien', value: 2 },
    { label: 'Algerien', value: 3 },
    { label: 'Bahamas', value: 4 },
    { label: 'Belgien', value: 5 },
    { label: 'Brasilien', value: 6 },
    { label: 'China', value: 7 },
    { label: 'Deutschland', value: 8 },
    { label: 'Dominikanische Republik', value: 9 },
    { label: 'Elfenbeinküste ', value: 10 },
    { label: 'Gabun', value: 11 },
    { label: 'Griechenland', value: 12 },
    { label: 'Honduras', value: 13 },
    { label: 'Jamaika', value: 14 },
    { label: 'Japan', value: 15 },
    { label: 'Kanada', value: 16 },
    { label: 'Libyen', value: 17 },
    { label: 'Mexiko', value: 18 },
    { label: 'Montenegro', value: 19 },
    { label: 'Neuseeland', value: 20 },
    { label: 'Niederlande', value: 21 },
    { label: 'Norwegen', value: 22 },
    { label: 'Österreich', value: 23 },
    { label: 'Peru', value: 24 },
    { label: 'Polen', value: 25 },
    { label: 'Portugal', value: 26 },
    { label: 'Rumänien', value: 27 },
    { label: 'Russland', value: 28 },
    { label: 'San Marino', value: 29 },
    { label: 'Schweden', value: 30 },
    { label: 'Schweiz', value: 31 },
    { label: 'Singapur', value: 32 },
    { label: 'Spanien', value: 33 },
    { label: 'Südafrika', value: 34 },
    { label: 'Taiwan', value: 35 },
    { label: 'Thailand', value: 36 },
    { label: 'Türkei', value: 37 },
    { label: 'Ukraine', value: 38 },
    { label: 'Vereinigte Staaten', value: 39 },
    { label: 'Weihnachtsinsel', value: 40 },
    { label: 'Zypern', value: 41 }
  ];
  optionsPrimitive: string[] = ['Option #1', 'Option #2', 'Option #3'];
  form: FormGroup<SelectDummyForm>;
  log = logResult;
  labelLongFormat = false;
  controlBinding = 'selectExample';
  disabled = false;
  readonly = false;
  required = false;
  denseFormat = false;
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  value: any = null;
  multiselectValue: any = null;
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  pickValueFn = examplePickValueFn;
  compareWithFn = exampleCompareWithFn;
  pickValueFnString: string;
  compareWithFnString: string;
  errorCallbackString: string;
  defaultCompareWith = (o1: any, o2: any) => o1 === o2;

  constructor() {
    this.form = new FormGroup<SelectDummyForm>({
      selectExample: new FormControl<any>(null)
    });

    this.pickValueFnString = '' + this.pickValueFn;
    this.compareWithFnString = '' + this.compareWithFn;
    this.errorCallbackString = '' + this.errorCallback;
  }

  showErrors(...comps: LuxFormSelectableBase[]) {
    this.value = null;
    this.multiselectValue = null;
    this.form.get(this.controlBinding)!.setValue(null);

    this.changeRequired(true);

    comps.forEach((comp: LuxFormSelectableBase) => {
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
  }

  changeUseValueFn(useValueFn: boolean) {
    this.reset();
    this.useSimpleArray = useValueFn ? false : this.useSimpleArray;
    this.useCompareWithFn = useValueFn ? false : this.useCompareWithFn;
  }

  changeCompareWithFn(useCompareWithfn: boolean) {
    this.reset();
    this.useSimpleArray = useCompareWithfn ? false : this.useSimpleArray;
    this.useValueFn = useCompareWithfn ? false : this.useValueFn;
  }

  reset(...comps: LuxFormSelectableBase[]) {
    this.value = undefined;
    this.multiselectValue = undefined;
    this.form.get(this.controlBinding)!.setValue(undefined);

    comps.forEach((comp: LuxFormSelectableBase) => {
      comp.formControl.markAsUntouched();
    });
  }
}
