import { Injectable } from '@angular/core';
import { LuxLookupTableEntry } from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-table-entry';
import { mockResult } from './mock-result';
import { LuxLookupService } from '../../../modules/lux-lookup/lux-lookup-service/lux-lookup.service';
import { of } from 'rxjs';
import { LuxLookupParameters } from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-parameters';

@Injectable()
export class MockLuxLookupService extends LuxLookupService {
  getLookupTable(tableNo: string, parameters: LuxLookupParameters) {
    return of(this.filterKeys([...mockResult], parameters));
  }

  /**
   * Filtert das Mock Ergebnis anhand evtl. übergebener Key-Werte.
   * @param array
   * @param parameters
   */
  private filterKeys(array: LuxLookupTableEntry[], parameters: LuxLookupParameters) {
    if (!parameters.keys || parameters.keys.length === 0) {
      return array;
    }
    return array.filter((entry) => parameters.keys.indexOf(entry.key) > -1);
  }
}
