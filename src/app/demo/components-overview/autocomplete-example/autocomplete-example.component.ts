import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AutocompleteExampleOption } from './autocomplete-example-option';
import { RenderPropertyItem } from './render-property-item';
import {
  emptyErrorCallback,
  exampleErrorCallback,
  examplePickValueFn,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

interface AutocompleteForm {
  autocompleteExample: FormControl<string | null>;
}

@Component({
  selector: 'app-autocomplete-example',
  templateUrl: './autocomplete-example.component.html',
  styleUrls: ['./autocomplete-example.component.scss']
})
export class AutocompleteExampleComponent {
  useErrorMessage = true;
  showOutputEvents = false;
  showPrefix = false;
  showSuffix = false;
  longOptionLabel =
    'Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?';
  toggleOptions = true;
  optionMultiline = false;
  optionBlockSize = 500;
  options: AutocompleteExampleOption[] = this.createOption();

  options2: AutocompleteExampleOption[] = [
    { label: 'Meine Aufgaben 2', short: 'MA2', value: 'A2' },
    { label: 'Gruppenaufgaben 2', short: 'GA2', value: 'B2' },
    { label: 'Zurückgestellte Aufgaben 2', short: 'ZA2', value: 'C2' },
    { label: 'Vertretungsaufgaben 2', short: 'VA2', value: 'D2' }
  ];
  renderProperties: RenderPropertyItem[] = [
    { label: 'Bezeichnung (normal)', value: 'label' },
    { label: 'Bezeichnung (kurz)', value: 'short' },
    { label: 'Wert', value: 'value' }
  ];
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  form: FormGroup<AutocompleteForm>;
  log = logResult;
  labelLongFormat = false;
  value: AutocompleteExampleOption | string | null = null;
  controlBinding = 'autocompleteExample';
  renderProperty = 'label';
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  disabled = false;
  readonly = false;
  required = false;
  strict = true;
  selectAllOnClick = true;
  delay = 500;
  controlValidators: ValidatorFn[] = [];
  errorMessageNotAnOption = 'Der eingegebene Wert ist nicht Teil der Auswahl.';
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  errorCallbackString = this.errorCallback + '';
  usePickValueFn = false;
  pickValueFn = examplePickValueFn;
  useFilterFn = false;
  luxPanelWidth: string | number = '';

  constructor() {
    this.form = new FormGroup<AutocompleteForm>({
      autocompleteExample: new FormControl<string | null>(null)
    });
  }

  onRenderProperty(renderProperty: RenderPropertyItem) {
    this.renderProperty = renderProperty.value;
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  onFilter(filterText: string, optionLabel: string): boolean {
    const filterTerms = filterText.split(' ');

    let result = true;
    if (filterTerms.length > 1) {
      filterTerms.forEach((term) => (result = result && optionLabel.indexOf(term) >= 0));
    } else {
      result = optionLabel.indexOf(filterTerms[0]) >= 0;
    }

    return result;
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  private createOption() {
    const options = [
      { label: 'Meine Aufgaben', short: 'MA', value: 'A' },
      { label: 'Gruppenaufgaben', short: 'GA', value: 'B' },
      { label: 'Zurückgestellte Aufgaben', short: 'ZA', value: 'C' },
      { label: this.longOptionLabel, short: 'LI', value: 'D' },
      { label: 'Vertretungsaufgaben', short: 'VA', value: 'F' },
      { label: 'Neue Aufgaben', short: 'NA', value: 'G' },
      { label: 'Extraaufgaben', short: 'EA', value: 'H' },
      { label: 'Optionale Aufgaben', short: 'ZA', value: 'I' }
    ];

    for (let i = 0; i < 20000; i++) {
      const number = `${i}`.padStart(5, '0');
      options.push({ label: 'Lorem ipsum ' + number, short: 'LI_' + number, value: 'Li_' + number });
    }

    return options;
  }
}
