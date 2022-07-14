import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ICountry } from '../model/country.interface';
import { IGender } from '../model/gender.interface';
import { IRole } from '../model/roles.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { TableExampleDataProviderService } from '../table-example-data-provider.service';
import { FormBase } from '../model/form-base.class';

@Component({
  selector: 'app-form-single-col',
  templateUrl: './form-single-col.component.html'
})
export class FormSingleColComponent extends FormBase {
  roles: IRole[] = [];
  countries: ICountry[] = [];
  genders: IGender[] = [];
  salutations: string[] = [];

  constructor(
    snackbar: LuxSnackbarService,
    private fb: UntypedFormBuilder,
    private dataProvider: TableExampleDataProviderService
  ) {
    super(snackbar);
    this.myGroup = this.fb.group({
      userInformation: this.fb.group({
        username: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*')])
        ],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [''],
        salutation: [''],
        gender: ['', Validators.required],
        age: ['', Validators.compose([Validators.min(18), Validators.max(100)])],
        country: [],
        deactivated: ['deaktiviertes Element']
      }),
      date: ['', Validators.required],
      roles: ['', Validators.required],
      eula: ['', Validators.requiredTrue]
    });
    this.roles = this.dataProvider.roles;
    this.countries = this.dataProvider.countries;
    this.genders = this.dataProvider.genders;
    this.salutations = this.dataProvider.salutations;
  }

  addRole(name: string) {
    this.roles.push({ name });
  }

  removeRole(i: number) {
    this.roles = this.roles.filter((role, index) => index !== i);
  }
}
