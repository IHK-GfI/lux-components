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
    { label: '1: Lorem ipsum', value: 'A' },
    { label: '2: Dolor sit amet', value: 'B' },
    { label: '3: Consectetur', value: 'C' },
    { label: '4: Adipisicing elit', value: 'D' },
    { label: '5: Vitae consectetur distinctio', value: 'A' },
    { label: '6: Fugiat non', value: 'B' },
    { label: '7: Consequuntur', value: 'C' },
    { label: '8: Eveniet illo', value: 'D' },
    { label: '9: Dolores maiores', value: 'A' },
    { label: '10: Corporis officia', value: 'B' }
  ];
  stateOptions = [
    { label: 'Default', value: 'defaultState' },
    { label: 'Disabled', value: 'disabledState' },
    { label: 'Readonly', value: 'readOnlyState' }
  ];
  selectedState: any = this.stateOptions[0];

  chipItems: string[] = ['Chip 0', 'Chip 1', 'Chip 2'];
  chipOptions: string[] = ['Neuer Chip 1', 'Neuer Chip 2', 'Neuer Chip 3'];
  form: FormGroup;

  constructor() {
    this.form = new FormGroup<DummyForm>({
      input: new FormControl(null, { validators: Validators.required, nonNullable: false }),
      textarea: new FormControl('', { validators: Validators.required, nonNullable: true }),
      datepicker: new FormControl('', { validators: Validators.required, nonNullable: true }),
      datetimepicker: new FormControl('', { validators: Validators.required, nonNullable: true }),
      autocomplete: new FormControl('', { validators: Validators.required, nonNullable: true }),
      select: new FormControl('', { validators: Validators.required, nonNullable: true }),
      radio: new FormControl('', { validators: Validators.required, nonNullable: true }),
      checkbox: new FormControl(false, { validators: Validators.required, nonNullable: true }),
      toggle: new FormControl(false, { validators: Validators.required, nonNullable: true }),
      slider: new FormControl(4, { validators: Validators.min(10), nonNullable: true }),
      file: new FormControl<ILuxFileObject | null>(null, Validators.required),
      password: new FormControl('', { validators: Validators.required, nonNullable: true })
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
