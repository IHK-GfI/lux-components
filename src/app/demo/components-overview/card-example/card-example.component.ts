import { Component } from '@angular/core';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss']
})
export class CardExampleComponent {
  // region Helper-Properties für das Beispiel

  showActions = true;
  showIcon = true;
  showInfo = true;
  useExpandableContent = true;
  btn2Raised = true;

  // endregion

  // region Properties der Component

  disabled = false;
  titleLineBreak = false;
  title = `Lorem ipsum dolor sit amet, consectetur adipisici elit.`;
  subTitle = 'Sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
  expanded = false;
  heading = 2;
  headingValidator = Validators.pattern('[1-6]');

  // Properties für die Form-Controls
  testHint = 'Hinweistext';
  testOption: any = null;
  disabledForm = false;
  readonly = false;

  options = [
    {label: 'Option 1', value: 'A'},
    {label: 'Option 2', value: 'B'},
    {label: 'Option 3', value: 'C'},
    {label: 'Option 4', value: 'D'}
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

  constructor(private snackbar: LuxSnackbarService) {
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

  onCardClicked() {
    console.log('Card clicked');
    this.snackbar.open(3000, {
      text: 'Card clicked',
      iconName: 'fas fa-info'
    });
  }

  changeInfo($event: boolean) {
    if ($event === true) {
      this.useExpandableContent = false;
    }

    this.showInfo = $event;
  }

  changeSwitched($event: boolean) {
    if ($event === true) {
      this.showInfo = false;
      this.useExpandableContent = false;
    }
  }

  changeExpandable($event: boolean) {
    if ($event === true) {
      this.showInfo = false;
    }

    this.useExpandableContent = $event;
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
