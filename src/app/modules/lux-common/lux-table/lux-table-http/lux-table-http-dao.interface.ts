import { Observable } from 'rxjs';
import { ILuxTableHttpDaoStructure } from './lux-table-http-dao-structure.interface';

export interface ILuxTableHttpDao {
  loadData(conf: {
    page?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
    order?: string;
  }): Observable<ILuxTableHttpDaoStructure>;
}
