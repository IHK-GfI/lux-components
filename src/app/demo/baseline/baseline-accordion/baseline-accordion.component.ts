import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface DummyForm {
  checkbox1: FormControl<boolean>;
  checkbox2: FormControl<boolean>;
  checkbox3: FormControl<boolean>;
}

interface DummyAddressForm {
  title: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  streetAddress: FormControl<string>;
  streetNumber: FormControl<string>;
  addressInfo: FormControl<string>;
  postalCode: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
  comment: FormControl<string>;
}

@Component({
  selector: 'lux-baseline-accordion',
  templateUrl: './baseline-accordion.component.html',
  styleUrls: ['./baseline-accordion.component.scss']
})
export class BaselineAccordionComponent {
  @HostBinding('class.show-frames') showFramesFormControls = false;
  @HostBinding('class.show-frames-panel') showFramesPanel = false;

  // Properties für die Form-Controls
  testHint = 'Hinweistext für ein Form-Control';
  options = [
    {label: 'Option 1', value: 'A'},
    {label: 'Option 2', value: 'B'},
    {label: 'Option 3', value: 'C'},
    {label: 'Option 4', value: 'F'}
  ];
  chipItems: string[] = [ 'Tomaten', 'Bananen', 'Zitronen'];

  countries = [
    {label: 'Belgien', value: 'A'},
    {label: 'Bulgarien', value: 'B'},
    {label: 'Dänemark', value: 'C'},
    {label: 'Deutschland', value: 'F'},
    {label: 'Estland', value: 'A'},
    {label: 'Finnland', value: 'B'},
    {label: 'Frankreich', value: 'C'},
    {label: 'Griechenland', value: 'F'},
  ]

  prefixOptions = [ '', 'Frau', 'Herr']
  form: FormGroup<DummyForm>;
  addressForm: FormGroup<DummyAddressForm>;
  addressForm2: FormGroup<DummyAddressForm>;

  constructor() {
    this.form = new FormGroup<DummyForm>({
      checkbox1: new FormControl(false, { validators: Validators.requiredTrue, nonNullable: true}),
      checkbox2: new FormControl(false, { validators: Validators.requiredTrue, nonNullable: true}),
      checkbox3: new FormControl(false, { validators: Validators.requiredTrue, nonNullable: true})
    });

    this.addressForm = new FormGroup<DummyAddressForm>({
      title: new FormControl('', { validators: Validators.required, nonNullable: true}),
      firstname: new FormControl('', { validators: Validators.required, nonNullable: true}),
      lastname: new FormControl('', { validators: Validators.required, nonNullable: true}),
      streetAddress: new FormControl('', { validators: Validators.required, nonNullable: true}),
      streetNumber: new FormControl('', { validators: Validators.required, nonNullable: true}),
      addressInfo: new FormControl('', { validators: Validators.maxLength(100), nonNullable: true}),
      postalCode: new FormControl('', { validators: Validators.compose([Validators.required, Validators.maxLength(5)]), nonNullable: true}),
      city: new FormControl('', { validators: Validators.required, nonNullable: true}),
      country: new FormControl('', { validators: Validators.required, nonNullable: true}),
      comment: new FormControl('', { nonNullable: true})
    });

    this.addressForm2 = new FormGroup<DummyAddressForm>({
      title: new FormControl('', { validators: Validators.required, nonNullable: true}),
      firstname: new FormControl('', { validators: Validators.required, nonNullable: true}),
      lastname: new FormControl('', { validators: Validators.required, nonNullable: true}),
      streetAddress: new FormControl('', { validators: Validators.required, nonNullable: true}),
      streetNumber: new FormControl('', { validators: Validators.required, nonNullable: true}),
      addressInfo: new FormControl('', { validators: Validators.maxLength(100), nonNullable: true}),
      postalCode: new FormControl('', { validators: Validators.compose([Validators.required, Validators.maxLength(5)]), nonNullable: true}),
      city: new FormControl('', { validators: Validators.required, nonNullable: true}),
      country: new FormControl('', { validators: Validators.required, nonNullable: true}),
      comment: new FormControl('', { nonNullable: true})
    });
  }

  chipRemoved(index: number) {
    console.log(index);
  }
  chipAdded(newChip: string) {
      console.log(newChip);
  }
  chipItemClicked(index: number) {
      console.log(index);
  }
}
