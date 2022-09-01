import { Component, HostBinding } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

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
  testValue = '';
  testOption: any = null;
  testDate = '';
  testDate2 = '';
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
  form: UntypedFormGroup;
  addressForm: UntypedFormGroup;

  constructor() {
    this.form = new UntypedFormGroup({
      checkbox1: new UntypedFormControl('', Validators.requiredTrue),
      checkbox2: new UntypedFormControl('', Validators.requiredTrue),
      checkbox3: new UntypedFormControl('', Validators.requiredTrue),
    });

    this.addressForm = new UntypedFormGroup ({
      title: new UntypedFormControl('', Validators.required),
      firstname: new UntypedFormControl('', Validators.required),
      lastname: new UntypedFormControl('', Validators.required),
      streetAddress: new UntypedFormControl('', Validators.required),
      streetNumber: new UntypedFormControl('', Validators.required),
      addressInfo: new UntypedFormControl('', Validators.maxLength(100)),
      postalCode: new UntypedFormControl('', Validators.compose([Validators.required, Validators.maxLength(5)]) ),
      city: new UntypedFormControl('', Validators.required),
      country: new UntypedFormControl('', Validators.required),
      comment: new UntypedFormControl(''),
    })
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
