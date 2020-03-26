import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LuxRadioComponent } from '../../../modules/lux-form/lux-radio/lux-radio.component';
import {
  exampleCompareWithFn,
  exampleErrorCallback,
  examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';
import { LuxFormSelectableBase } from '../../../modules/lux-form/lux-form-model/lux-form-selectable-base.class';

@Component({
  selector: 'app-radio-button-example',
  templateUrl: './radio-button-example.component.html'
})
export class RadioButtonExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  useErrorMessage: boolean = true;
  useTemplatesForLabels: boolean = false;
  useCompareWithFn: boolean = false;
  useValueFn: boolean;
  useSimpleArray: boolean;
  showOutputEvents: boolean = false;

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];

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

  controlBinding: string = 'radioExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  isVertical: boolean;
  label: string = 'Label';
  hint: string = 'Hint';
  controlValidators: ValidatorFn[] = [];
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';

  value;

  groupNameReactive = 'reactiveGroup';
  groupNameNormal = 'normalGroup';

  errorCallback = exampleErrorCallback;
  pickValueFn = examplePickValueFn;
  compareWithFn = exampleCompareWithFn;

  pickValueFnString: string;
  compareWithFnString: string;
  errorCallbackString: string;

  // endregion

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      radioExample: []
    });

    this.pickValueFnString = '' + this.pickValueFn;
    this.compareWithFnString = '' + this.compareWithFn;
    this.errorCallbackString = '' + this.errorCallback;
  }

  ngOnInit() {}

  showErrors(...radioComponents: LuxRadioComponent[]) {
    this.value = null;
    this.form.get('radioExample').setValue(null);

    this.changeRequired(true);

    radioComponents.forEach((comp: LuxRadioComponent) => {
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

  reset(...radioComponents: LuxRadioComponent[]) {
    this.value = undefined;
    this.form.get(this.controlBinding).setValue(undefined);

    radioComponents.forEach((comp: LuxRadioComponent) => {
      comp.formControl.markAsUntouched();
    });
  }
}
