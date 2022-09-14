import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountry } from '../model/country.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { TableExampleDataProviderService } from '../table-example-data-provider.service';
import { FormBase } from '../model/form-base.class';

interface FormDualDummyForm {
  customerDetails: FormGroup<FormDualCustomerForm>;
  orderDetails: FormGroup<FormDualOrderForm>;
}

interface FormDualCustomerForm {
  name: FormControl<string>;
  zip: FormControl<string>;
  town: FormControl<string | null>;
  country: FormControl<string | null>;
  streets: FormArray<FormGroup<FormDualStreetForm>>;
}

interface FormDualOrderForm {
  orderNo: FormControl<string>;
  validDate: FormControl<string>;
  validTime: FormControl<string | null>;
  value: FormControl<string>;
}

interface FormDualStreetForm {
  streetName: FormControl<string>;
  nr: FormControl<string>;
}

@Component({
  selector: 'app-form-dual-col',
  templateUrl: './form-dual-col.component.html'
})
export class FormDualColComponent extends FormBase {
  myGroup: FormGroup<FormDualDummyForm>;
  streetsFormArray: FormArray<FormGroup<FormDualStreetForm>>;
  countries: ICountry[] = [];

  constructor(snackbar: LuxSnackbarService, private dataProvider: TableExampleDataProviderService) {
    super(snackbar);

    this.myGroup = new FormGroup<FormDualDummyForm>({
      customerDetails: new FormGroup<FormDualCustomerForm>({
        name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        zip: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        town: new FormControl<string | null>(null),
        country: new FormControl<string | null>(null),
        streets: new FormArray<FormGroup<FormDualStreetForm>>([this.createStreetFormGroup()])
      }),
      orderDetails: new FormGroup<FormDualOrderForm>({
        orderNo: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        validDate: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        validTime: new FormControl<string | null>(null),
        value: new FormControl<string>('', { validators: Validators.compose([Validators.min(1), Validators.max(1000)]), nonNullable: true })
      })
    });
    this.streetsFormArray = (this.myGroup.get('customerDetails') as FormGroup).get('streets') as FormArray<FormGroup<FormDualStreetForm>>;

    this.countries = this.dataProvider.countries;
  }

  hasUnsavedData(): boolean {
    return this.myGroup.dirty;
  }

  addStreet() {
    this.streetsFormArray.push(this.createStreetFormGroup());
  }

  removeStreet(index: number) {
    this.streetsFormArray.removeAt(index);
  }

  latestStreetGroupValid() {
    if (this.streetsFormArray && this.streetsFormArray.length > 0) {
      return this.streetsFormArray.at(this.streetsFormArray.length - 1).valid;
    }
    return true;
  }

  createStreetFormGroup(): FormGroup<FormDualStreetForm> {
    return new FormGroup<FormDualStreetForm>({
      streetName: new FormControl('', { validators: Validators.required, nonNullable: true }),
      nr: new FormControl('', { validators: Validators.min(1), nonNullable: true })
    });
  }
}
