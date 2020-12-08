import { mockResult } from './mock-result';
import { LuxLookupService } from '../../../modules/lux-lookup/lux-lookup-service/lux-lookup.service';
import { of } from 'rxjs';
import { LuxLookupParameters } from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-parameters';

export class MockLuxLookupService extends LuxLookupService {

  getLookupTable(tableNo, parameters) {
    return of(this.filterKeys([...mockResult], parameters));
  }

  /**
   * Filtert das Mock Ergebnis anhand evtl. übergebener Key-Werte.
   * @param array
   * @param parameters
   */
  private filterKeys(array, parameters: LuxLookupParameters) {
    if (!parameters.keys || parameters.keys.length === 0) {
      return array;
    }
    return array.filter(entry => parameters.keys.indexOf(+entry.key) > -1);
  }
}
