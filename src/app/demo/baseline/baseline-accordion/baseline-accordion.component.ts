import { Component, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  // endregion

  prefixOptions = [ '', 'Frau', 'Herr']
  form: FormGroup = undefined; 
  addressForm: FormGroup = undefined;
  
  constructor() { 
    this.form = new FormGroup({
      checkbox1: new FormControl('', Validators.requiredTrue),
      checkbox2: new FormControl('', Validators.requiredTrue),
      checkbox3: new FormControl('', Validators.requiredTrue),
    });

    this.addressForm = new FormGroup ({
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      streetNumber: new FormControl('', Validators.required),
      addressInfo: new FormControl('', Validators.maxLength(100)),
      postalCode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)]) ),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      comment: new FormControl(''),
    })
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
}
