import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICompanyType } from '../model/company-type.interface';
import { ICountry } from '../model/country.interface';
import { IGender } from '../model/gender.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { TableExampleDataProviderService } from '../table-example-data-provider.service';
import { FormBase } from '../model/form-base.class';

interface FormThreeColCustomer {
  name: FormControl<string>;
  surname: FormControl<string | null>;
  gender: FormControl<IGender | null>;
}

interface FormThreeColAddress {
  zip: FormControl<string>;
  town: FormControl<string | null>;
  country: FormControl<string | null>;
  street: FormControl<string | null>;
}

interface FormThreeColFeedback {
  rating: FormControl<string>;
  comment: FormControl<string | null>;
  anonymous: FormControl<boolean | null>;
}

interface FormThreeColDummyForm {
  customer: FormGroup<FormThreeColCustomer>;
  address: FormGroup<FormThreeColAddress>;
  feedback: FormGroup<FormThreeColFeedback>;
}

@Component({
  selector: 'app-form-three-col',
  templateUrl: './form-three-col.component.html'
})
export class FormThreeColComponent extends FormBase {
  myGroup: FormGroup<FormThreeColDummyForm>;
  countries: ICountry[] = [];
  types: ICompanyType[] = [];
  genders: IGender[] = [];

  constructor(snackbar: LuxSnackbarService, private dataProvider: TableExampleDataProviderService) {
    super(snackbar);

    this.countries = this.dataProvider.countries;
    this.types = this.dataProvider.companyTypes;
    this.genders = this.dataProvider.genders;

    this.myGroup = new FormGroup<FormThreeColDummyForm>({
      customer: new FormGroup<FormThreeColCustomer>({
        name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        surname: new FormControl<string | null>(null),
        gender: new FormControl<IGender | null>(this.genders[0])
      }),
      address: new FormGroup<FormThreeColAddress>({
        zip: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        town: new FormControl<string | null>(null),
        country: new FormControl<string | null>(null),
        street: new FormControl<string | null>(null)
      }),
      feedback: new FormGroup<FormThreeColFeedback>({
        rating: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        comment: new FormControl<string | null>(null),
        anonymous: new FormControl<boolean | null>(false)
      })
    });
  }

  hasUnsavedData(): boolean {
    return this.myGroup.dirty;
  }
}
