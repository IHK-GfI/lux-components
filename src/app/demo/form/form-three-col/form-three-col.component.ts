import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICompanyType } from '../model/company-type.interface';
import { ICountry } from '../model/country.interface';
import { IGender } from '../model/gender.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { TableExampleDataProviderService } from '../table-example-data-provider.service';
import { FormBase } from '../model/form-base.class';

@Component({
  selector: 'app-form-three-col',
  templateUrl: './form-three-col.component.html'
})
export class FormThreeColComponent extends FormBase implements OnInit {
  countries: ICountry[] = [];
  types: ICompanyType[] = [];
  genders: IGender[] = [];

  constructor(
    snackbar: LuxSnackbarService,
    private fb: FormBuilder,
    private dataProvider: TableExampleDataProviderService
  ) {
    super(snackbar);
    this.countries = this.dataProvider.countries;
    this.types = this.dataProvider.companyTypes;
    this.genders = this.dataProvider.genders;
  }

  ngOnInit() {
    this.myGroup = this.fb.group({
      customer: this.fb.group({
        name: ['', Validators.required],
        surname: [],
        gender: [this.genders[0]]
      }),
      address: this.fb.group({
        zip: ['', Validators.required],
        town: [],
        country: [],
        street: []
      }),
      feedback: this.fb.group({
        rating: ['', Validators.required],
        anonymous: [false]
      })
    });
  }
}
