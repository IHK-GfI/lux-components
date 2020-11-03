import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RenderPropertyItem } from './render-property-item';
import {
  exampleErrorCallback,
  examplePickValueFn,
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
    { label: 'Meine Aufgaben', short: 'MA', value: 'A' },
    { label: 'Gruppenaufgaben', short: 'GA', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', short: 'ZA', value: 'C' },
    { label: 'Vertretungsaufgaben', short: 'VA', value: 'D' }
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
  hintShowOnlyOnFocus: boolean = false;
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
  useFilterFn: boolean = false;

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

  onFilter(filterText: string, optionLabel: string, option: any): boolean {
    const filterTerms = filterText.split(' ');

    let result = true;
    if (filterTerms.length > 1) {
      filterTerms.forEach(term => result = result && optionLabel.indexOf(term) >= 0);
    } else {
      result = optionLabel.indexOf(filterTerms[0]) >= 0;
    }

    return result;
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  emptyCallback() {}
}
