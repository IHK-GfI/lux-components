import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LuxThemeService } from '../../../modules/lux-theme/lux-theme.service';
import { Subscription } from 'rxjs';

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

interface DummyStateForm {
  defaultItem: FormControl<string>;
  activeItem: FormControl<string>;
  disabledItem: FormControl<string>;
  errorItem: FormControl<string>;
  hoverItem: FormControl<string>;
  readonlyItem: FormControl<string>;
}

@Component({
  selector: 'lux-baseline-accordion',
  templateUrl: './baseline-accordion.component.html',
  styleUrls: ['./baseline-accordion.component.scss']
})
export class BaselineAccordionComponent implements OnInit {
  // Properties für die Form-Controls
  testHint = 'Hinweistext für ein Form-Control';
  options = [
    { label: 'Option 1', value: 'A' },
    { label: 'Option 2', value: 'B' },
    { label: 'Option 3', value: 'C' },
    { label: 'Option 4', value: 'F' }
  ];
  chipItems: string[] = ['Tomaten', 'Bananen', 'Zitronen'];

  countries = [
    { label: 'Belgien', value: 'A' },
    { label: 'Bulgarien', value: 'B' },
    { label: 'Dänemark', value: 'C' },
    { label: 'Deutschland', value: 'F' },
    { label: 'Estland', value: 'A' },
    { label: 'Finnland', value: 'B' },
    { label: 'Frankreich', value: 'C' },
    { label: 'Griechenland', value: 'F' }
  ];
  chipOptions: string[] = ['Neuer Chip 1', 'Neuer Chip 2', 'Neuer Chip 3'];

  prefixOptions = ['', 'Frau', 'Herr'];
  form: FormGroup<DummyForm>;
  addressForm: FormGroup<DummyAddressForm>;
  addressForm2: FormGroup<DummyAddressForm>;
  stateForm: FormGroup<DummyStateForm>;

  themeName: string;
  subscription: Subscription;

  constructor(private themeService: LuxThemeService) {
    this.form = new FormGroup<DummyForm>({
      checkbox1: new FormControl(false, { validators: Validators.requiredTrue, nonNullable: true }),
      checkbox2: new FormControl(false, { validators: Validators.requiredTrue, nonNullable: true }),
      checkbox3: new FormControl(false, { validators: Validators.requiredTrue, nonNullable: true })
    });

    this.addressForm = new FormGroup<DummyAddressForm>({
      title: new FormControl('', { validators: Validators.required, nonNullable: true }),
      firstname: new FormControl('', { validators: Validators.required, nonNullable: true }),
      lastname: new FormControl('', { validators: Validators.required, nonNullable: true }),
      streetAddress: new FormControl('', { validators: Validators.required, nonNullable: true }),
      streetNumber: new FormControl('', { validators: Validators.required, nonNullable: true }),
      addressInfo: new FormControl('', { validators: Validators.maxLength(100), nonNullable: true }),
      postalCode: new FormControl('', {
        validators: Validators.compose([Validators.required, Validators.maxLength(5)]),
        nonNullable: true
      }),
      city: new FormControl('', { validators: Validators.required, nonNullable: true }),
      country: new FormControl('', { validators: Validators.required, nonNullable: true }),
      comment: new FormControl('', { nonNullable: true })
    });

    this.addressForm2 = new FormGroup<DummyAddressForm>({
      title: new FormControl('', { validators: Validators.required, nonNullable: true }),
      firstname: new FormControl('', { validators: Validators.required, nonNullable: true }),
      lastname: new FormControl('', { validators: Validators.required, nonNullable: true }),
      streetAddress: new FormControl('', { validators: Validators.required, nonNullable: true }),
      streetNumber: new FormControl('', { validators: Validators.required, nonNullable: true }),
      addressInfo: new FormControl('', { validators: Validators.maxLength(100), nonNullable: true }),
      postalCode: new FormControl('', {
        validators: Validators.compose([Validators.required, Validators.maxLength(5)]),
        nonNullable: true
      }),
      city: new FormControl('', { validators: Validators.required, nonNullable: true }),
      country: new FormControl('', { validators: Validators.required, nonNullable: true }),
      comment: new FormControl('', { nonNullable: true })
    });

    this.stateForm = new FormGroup<DummyStateForm>({
      defaultItem: new FormControl('', { nonNullable: true }),
      activeItem: new FormControl('Beispieleintrag', { nonNullable: true }),
      disabledItem: new FormControl('Beispieleintrag', { nonNullable: true }),
      errorItem: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(5)]), nonNullable: true }),
      hoverItem: new FormControl('', { nonNullable: true }),
      readonlyItem: new FormControl('', { nonNullable: true })
    });

    this.themeName = this.themeService.getTheme().name;
    this.subscription = this.themeService.getThemeAsObservable().subscribe((theme) => {
      this.themeName = theme.name;
    });
  }

  ngOnInit() {
    this.stateForm.get('errorItem')!.markAsTouched();
    this.stateForm.get('errorItem')!.markAsDirty();
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
