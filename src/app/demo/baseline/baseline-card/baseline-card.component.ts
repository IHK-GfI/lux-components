import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lux-baseline-card',
  templateUrl: './baseline-card.component.html',
  styleUrls: ['./baseline-card.component.scss']
})
export class BaselineCardComponent {

  // Properties für die Form-Controls
  testHint = 'Hinweistext';
  testOption: any = null;
  disabledForm = false;
  readonly = false;
  disabled = false;
  test = false;

  options = [
    {label: 'Option 1', value: 'A'},
    {label: 'Option 2', value: 'B'},
    {label: 'Option 3', value: 'C'},
    {label: 'Option 4', value: 'D'}
  ];
  options2 = [
    {label: 'Option 1', value: 'A'},
    {label: 'Option 2', value: 'B'},
    {label: 'Option 3', value: 'C'},
    {label: 'Option 4', value: 'D'},
    {label: 'Option 5', value: 'A'},
    {label: 'Option 6', value: 'B'},
    {label: 'Option 7', value: 'C'},
    {label: 'Option 8', value: 'D'},
    {label: 'Option 9', value: 'A'},
    {label: 'Option 10', value: 'B'},
    {label: 'Option 11', value: 'C'},
    {label: 'Option 12', value: 'D'}
  ];

  stateOptions = [
    {label: 'Default', value: 'defaultState'},
    {label: 'Disabled', value: 'disabledState'},
    {label: 'Readonly', value: 'readOnlyState'}
  ];
  selectedState: any = this.stateOptions[0];

  chipItems: string[] = [ 'Chip 0', 'Chip 1', 'Chip 2'];
  form: UntypedFormGroup;

  constructor() {
    this.form = new UntypedFormGroup({
      input: new UntypedFormControl('', Validators.required),
      textarea: new UntypedFormControl('', Validators.required),
      datepicker: new UntypedFormControl('', Validators.required),
      datetimepicker: new UntypedFormControl('', Validators.required),
      autocomplete: new UntypedFormControl('', Validators.required),
      select: new UntypedFormControl('', Validators.required),
      radio: new UntypedFormControl('', Validators.required),
      checkbox: new UntypedFormControl('', Validators.requiredTrue),
      toggle: new UntypedFormControl('', Validators.requiredTrue),
      slider: new UntypedFormControl('4', Validators.min(10)),
      file: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
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
