import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { OnInit, Directive } from '@angular/core';
import {
  LuxBehandlungsOptionenUngueltige,
  LuxFieldValues,
  LuxLookupParameters
} from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-parameters';
import { LuxLookupService } from '../../../modules/lux-lookup/lux-lookup-service/lux-lookup.service';
import { LuxLookupHandlerService } from '../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupTableEntry } from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-table-entry';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import {
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Directive()
export abstract class LookupExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  options = [
    { label: LuxBehandlungsOptionenUngueltige.ausgrauen, value: 0 },
    { label: LuxBehandlungsOptionenUngueltige.anzeigen, value: 1 },
    { label: LuxBehandlungsOptionenUngueltige.ausblenden, value: 2 }
  ];

  fieldOptions = [...Object.keys(LuxFieldValues)];

  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];

  useErrorMessage: boolean = true;
  showOutputEvents: boolean = false;
  useRenderFn: boolean;
  useMock: boolean;
  mockInvalid: boolean;
  log = logResult;
  form: FormGroup;
  originalServices: LuxLookupService[] = [];
  renderFnString = this.renderFn + '';

  // endregion

  // region Properties der Component

  renderProp: string = 'kurzText';
  parameters: LuxLookupParameters = null;
  selected: any;
  customStyle;
  customInvalidStyle;
  behandlungUngueltige: LuxBehandlungsOptionenUngueltige = LuxBehandlungsOptionenUngueltige.anzeigen;
  disabled = false;
  controlBinding = 'lookup';
  readonly: boolean;
  required: boolean;
  tableNo: number = 1002;

  label: string = 'Label';
  hint: string = 'Hint';
  hintShowOnlyOnFocus: boolean = false;
  placeholder: string = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage: string = 'Das Feld enthält keinen gültigen Wert';
  value;

  errorCallback = exampleErrorCallback;
  errorCallbackString = this.errorCallback + '';

  // endregion

  protected constructor(
    protected lookupHandler: LuxLookupHandlerService,
    protected snackbar: LuxSnackbarService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.parameters = new LuxLookupParameters({
      knr: 101,
      fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
    });

    this.form = this.fb.group({
      lookup: ['']
    });
  }

  renderFn(entry: LuxLookupTableEntry) {
    return '[RenderFn] ' + entry.kurzText;
  }

  changeCustomStyle($event) {
    if ($event) {
      this.customStyle = { 'text-decoration': 'underline', color: 'green' };
    } else {
      this.customStyle = null;
    }
  }

  changeCustomInvalidStyle($event) {
    if ($event) {
      this.customInvalidStyle = { 'text-decoration': 'line-through', color: 'red' };
    } else {
      this.customInvalidStyle = null;
    }
  }

  changeOptionUngueltig($event) {
    this.behandlungUngueltige = this.options.find(option => option.value === +$event.value).label;
  }

  showSnackbar(text: string, action: string = 'OK') {
    this.snackbar.open(3000, {
      text: text,
      action: action,
      actionColor: 'green'
    });
  }

  dataLoaded($event: boolean) {
    if (!$event) {
      this.showSnackbar('Laden fehlgeschlagen.');
    } else {
      this.showSnackbar('Daten geladen.');
    }
    this.log(this.showOutputEvents, 'Daten geladen', $event);
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  emptyCallback() {}
}
