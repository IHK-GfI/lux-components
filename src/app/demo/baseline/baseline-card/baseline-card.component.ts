import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup = undefined;
  // endregion

  constructor() {
    this.form = new FormGroup({
      input: new FormControl('', Validators.required),
      textarea: new FormControl('', Validators.required),
      datepicker: new FormControl('', Validators.required),
      datetimepicker: new FormControl('', Validators.required),
      autocomplete: new FormControl('', Validators.required),
      select: new FormControl('', Validators.required),
      radio: new FormControl('', Validators.required),
      checkbox: new FormControl('', Validators.requiredTrue),
      toggle: new FormControl('', Validators.requiredTrue),
      slider: new FormControl('4', Validators.min(10)),
      file: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  chipRemoved($event: any) {
    console.log($event);
  }
  chipAdded($event: string) {
      console.log($event);
  }
  chipItemClicked($event: any) {
      console.log($event);
  }

  toggleErrors($event: boolean) {
    Object.keys(this.form.controls).forEach((key) => {
      if ($event) {
        this.form.get(key).markAsTouched();
      } else {
        this.form.get(key).markAsUntouched();
      }
      this.form.get(key).updateValueAndValidity();
    });
  }
  
  switchStates($event: boolean) {
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
