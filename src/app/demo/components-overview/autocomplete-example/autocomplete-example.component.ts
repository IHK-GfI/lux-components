import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AutocompleteExampleOption } from './autocomplete-example-option';
import { RenderPropertyItem } from './render-property-item';
import {
  emptyErrorCallback,
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
export class AutocompleteExampleComponent {
  // region Helper-Properties für das Beispiel

  useErrorMessage = true;
  showOutputEvents = false;
  showPrefix = false;
  showSuffix = false;
  longOptionLabel='Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?';
  toggleOptions = true;
  optionMultiline = false;

  options: AutocompleteExampleOption[] = [
    { label: 'Meine Aufgaben', short: 'MA', value: 'A' },
    { label: 'Gruppenaufgaben', short: 'GA', value: 'B' },
    { label: 'Zurückgestellte Aufgaben', short: 'ZA', value: 'C' },
    { label: this.longOptionLabel, short: 'LI', value: 'D' },
    { label: 'Vertretungsaufgaben', short: 'VA', value: 'F' },
    { label: 'Neue Aufgaben', short: 'NA', value: 'G' },
    { label: 'Extraaufgaben', short: 'EA', value: 'H' },
    { label: 'Optionale Aufgaben', short: 'ZA', value: 'I' }
  ];

  options2: AutocompleteExampleOption[] = [
    { label: 'Meine Aufgaben 2', short: 'MA2', value: 'A2' },
    { label: 'Gruppenaufgaben 2', short: 'GA2', value: 'B2' },
    { label: 'Zurückgestellte Aufgaben 2', short: 'ZA2', value: 'C2' },
    { label: 'Vertretungsaufgaben 2', short: 'VA2', value: 'D2' }
  ];

  renderProperties: RenderPropertyItem[] = [
    { label: 'Bezeichnung (normal)', value: 'label'},
    { label: 'Bezeichnung (kurz)', value: 'short'},
    { label: 'Wert', value: 'value'}
  ];

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];

  form: UntypedFormGroup;
  log = logResult;
  labelLongFormat = false;
  // endregion

  // region Properties der Component

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

  // endregion

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      autocompleteExample: []
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

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }
}
