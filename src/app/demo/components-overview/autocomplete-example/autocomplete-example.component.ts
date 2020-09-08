import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RenderPropertyItem } from './render-property-item';
import {
  exampleErrorCallback, examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-autocomplete-example',
  templateUrl: './autocomplete-example.component.html',
  styleUrls: ['./autocomplete-example.component.scss']
})
export class AutocompleteExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  useErrorMessage: boolean = true;
  showOutputEvents: boolean = false;

  options = [
    { label: 'Meine Aufgaben', value: 'A' },
    { label: 'Gruppenaufgaben', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', value: 'C' },
    { label: 'Vertretungsaufgaben', value: 'D' }
  ];

  renderProperties: RenderPropertyItem[] = [
    new RenderPropertyItem('Bezeichnung (normal)', 'label'),
    new RenderPropertyItem('Bezeichnung (kurz)', 'short'),
    new RenderPropertyItem('Wert', 'value')
  ];

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];

  form: FormGroup;
  log = logResult;

  // endregion

  // region Properties der Component

  value;
  controlBinding: string = 'autocompleteExample';
  renderProperty = 'label';
  label: string = 'Label';
  hint: string = 'Hint';
  placeholder: string = 'Placeholder';
  disabled = false;
  readonly: boolean;
  required: boolean;
  strict = true;
  selectAllOnClick = true;
  delay: number = 500;
  controlValidators: ValidatorFn[] = [];
  errorMessageNotAnOption: string = 'Der eingegebene Wert ist nicht Teil der Auswahl.';
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';
  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';
  usePickValueFn: boolean = false;
  pickValueFn = examplePickValueFn;

  // endregion

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      autocompleteExample: []
    });
  }

  ngOnInit() {}

  onRenderProperty(renderProperty: RenderPropertyItem) {
    this.renderProperty = renderProperty.value;
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  emptyCallback() {}
}
