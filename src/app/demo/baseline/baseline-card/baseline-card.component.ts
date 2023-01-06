import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILuxFileObject } from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';

interface DummyForm {
  input: FormControl<string | null>;
  textarea: FormControl<string>;
  datepicker: FormControl<string>;
  datetimepicker: FormControl<string>;
  autocomplete: FormControl<string>;
  select: FormControl<string>;
  radio: FormControl<string>;
  checkbox: FormControl<boolean>;
  toggle: FormControl<boolean>;
  slider: FormControl<number>;
  file: FormControl<ILuxFileObject | null>;
  password: FormControl<string>;
}

@Component({
  selector: 'lux-baseline-card',
  templateUrl: './baseline-card.component.html',
  styleUrls: ['./baseline-card.component.scss']
})
export class BaselineCardComponent {
  testHint = 'Hinweistext';
  testOption: any = null;
  disabledForm = false;
  readonly = false;
  disabled = false;
  test = false;

  options = [
    { label: 'Option 1', value: 'A' },
    { label: 'Option 2', value: 'B' },
    { label: 'Option 3', value: 'C' },
    { label: 'Option 4', value: 'D' }
  ];
  options2 = [
    { label: 'Option 1', value: 'A' },
    { label: 'Option 2', value: 'B' },
    { label: 'Option 3', value: 'C' },
    { label: 'Option 4', value: 'D' },
    { label: 'Option 5', value: 'A' },
    { label: 'Option 6', value: 'B' },
    { label: 'Option 7', value: 'C' },
    { label: 'Option 8', value: 'D' },
    { label: 'Option 9', value: 'A' },
    { label: 'Option 10', value: 'B' },
    { label: 'Option 11', value: 'C' },
    { label: 'Option 12', value: 'D' }
  ];

  stateOptions = [
    { label: 'Default', value: 'defaultState' },
    { label: 'Disabled', value: 'disabledState' },
    { label: 'Readonly', value: 'readOnlyState' }
  ];
  selectedState: any = this.stateOptions[0];

  chipItems: string[] = ['Chip 0', 'Chip 1', 'Chip 2'];
  form: FormGroup;

  constructor() {
    this.form = new FormGroup<DummyForm>({
      input: new FormControl(null, { validators: Validators.required, nonNullable: false}),
      textarea: new FormControl('', { validators: Validators.required, nonNullable: true}),
      datepicker: new FormControl('', { validators: Validators.required, nonNullable: true}),
      datetimepicker: new FormControl('', { validators: Validators.required, nonNullable: true}),
      autocomplete: new FormControl('', { validators: Validators.required, nonNullable: true}),
      select: new FormControl('', { validators: Validators.required, nonNullable: true}),
      radio: new FormControl('', { validators: Validators.required, nonNullable: true}),
      checkbox: new FormControl(false, { validators: Validators.required, nonNullable: true}),
      toggle: new FormControl(false, { validators: Validators.required, nonNullable: true}),
      slider: new FormControl(4, { validators: Validators.min(10), nonNullable: true}),
      file: new FormControl<ILuxFileObject | null>(null, Validators.required),
      password: new FormControl('', { validators: Validators.required, nonNullable: true}),
    });
  }

  chipRemoved(index: number) {
    console.log(index);
  }
  chipAdded(newChip: string) {
    console.log(newChip);
  }
  chipItemClicked(index: any) {
    console.log(index);
  }

  toggleErrors(showErrorState: boolean) {
    Object.keys(this.form.controls).forEach((key) => {
      if (showErrorState) {
        this.form.get(key)!.markAsTouched();
      } else {
        this.form.get(key)!.markAsUntouched();
      }
      this.form.get(key)!.updateValueAndValidity();
    });
  }

  switchStates() {
    switch (this.selectedState.value) {
      case 'disabledState':
        this.disabledForm = true;
        this.readonly = false;
        break;
      case 'readOnlyState':
        this.disabledForm = false;
        this.readonly = true;
        break;
      default:
        this.disabledForm = false;
        this.readonly = false;
        break;
    }
  }
}
