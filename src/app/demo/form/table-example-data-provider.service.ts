import { Injectable } from '@angular/core';
import { ICompanyType } from './model/company-type.interface';
import { ICountry } from './model/country.interface';
import { IGender } from './model/gender.interface';
import { IRole } from './model/roles.interface';

@Injectable()
export class TableExampleDataProviderService {
  genders: IGender[] = [
    { name: 'weiblich', short: 'w' },
    { name: 'männlich', short: 'm' }
  ];

  countries: ICountry[] = [
    { name: 'Deutschland', short: 'DE' },
    { name: 'Vereinigtes Königreich', short: 'UK' },
    { name: 'Tschechien', short: 'CZ' }
  ];

  roles: IRole[] = [{ name: 'Redakteur' }, { name: 'Chefredakteur' }];

  salutations: string[] = ['Dr.', 'Prof.', 'Herr', 'Frau'];

  companyTypes: ICompanyType[] = [{ value: 'AG' }, { value: 'GmbH' }, { value: 'OHG' }];

  constructor() {}
}
