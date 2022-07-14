import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ICountry } from '../model/country.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { TableExampleDataProviderService } from '../table-example-data-provider.service';
import { FormBase } from '../model/form-base.class';

@Component({
  selector: 'app-form-dual-col',
  templateUrl: './form-dual-col.component.html'
})
export class FormDualColComponent extends FormBase {
  streetsFormArray: UntypedFormArray;
  countries: ICountry[] = [];

  constructor(
    snackbar: LuxSnackbarService,
    private fb: UntypedFormBuilder,
    private dataProvider: TableExampleDataProviderService
  ) {
    super(snackbar);

    this.myGroup = this.fb.group({
      customerDetails: this.fb.group({
        name: ['', Validators.required],
        zip: ['', Validators.required],
        town: [''],
        country: [''],
        streets: this.fb.array([this.createStreetFormGroup()])
      }),
      orderDetails: this.fb.group({
        orderNo: ['', Validators.required],
        validDate: ['', Validators.required],
        validTime: [''],
        value: ['', Validators.compose([Validators.min(1), Validators.max(1000)])]
      })
    });
    this.streetsFormArray = (this.myGroup.get('customerDetails') as UntypedFormGroup).get('streets') as UntypedFormArray;

    this.countries = this.dataProvider.countries;
  }

  addStreet() {
    this.streetsFormArray.push(this.createStreetFormGroup());
  }

  removeStreet(index) {
    this.streetsFormArray.removeAt(index);
  }

  latestStreetGroupValid() {
    if (this.streetsFormArray && this.streetsFormArray.length > 0) {
      return this.streetsFormArray.at(this.streetsFormArray.length - 1).valid;
    }
    return true;
  }

  createStreetFormGroup(): UntypedFormGroup {
    return this.fb.group({
      streetName: ['', Validators.required],
      nr: ['', Validators.min(1)]
    });
  }
}
