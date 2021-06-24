import { ILuxTableHttpDao } from '../../../modules/lux-common/lux-table/lux-table-http/lux-table-http-dao.interface';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class TestHttpDao implements ILuxTableHttpDao {
  dataSourceFix: any[] = [
    { name: 'Hydrogen', symbol: 'H', date: new Date(2017, 11, 24) },
    { name: 'Helium', symbol: 'He', date: new Date(2017, 11, 22) },
    { name: 'Lithium', symbol: 'Li', date: new Date(2018, 11, 21) },
    { name: 'Beryllium', symbol: 'Be', date: new Date(2018, 11, 18) },
    { name: 'Boron', symbol: 'B', date: new Date(2018, 10, 24) },
    { name: 'Carbon', symbol: 'C', date: new Date(2018, 11, 24) },
    { name: 'Nitrogen', symbol: 'N', date: new Date(2018, 10, 24) },
    { name: 'Oxygen', symbol: 'O', date: new Date(2018, 11, 24) },
    { name: 'Fluorine', symbol: 'F', date: new Date(2018, 11, 24) },
    { name: 'Neon', symbol: 'Ne', date: new Date(2018, 10, 24) },
    { name: 'Sodium', symbol: 'Na', date: new Date(2018, 11, 24) },
    { name: 'Magnesium', symbol: 'Mg', date: new Date(2018, 9, 24) },
    { name: 'Aluminum', symbol: 'Al', date: new Date(2018, 11, 24) },
    { name: 'Silicon', symbol: 'Si', date: new Date(2018, 9, 24) },
    { name: 'Phosphorus', symbol: 'P', date: new Date(2018, 11, 24) },
    { name: 'Sulfur', symbol: 'S', date: new Date(2018, 9, 24) }
  ];

  filter = '';

  constructor(private logger: LuxConsoleService) {}

  loadData(conf: { page: number; pageSize: number; filter?: string; sort?: string; order?: string }): Observable<any> {
    // Beispiel; bis zum return wuerde das alles hier serverseitig stattfinden
    let tempDataSourceFix = this.dataSourceFix.slice(0, this.dataSourceFix.length);
    conf.pageSize = conf.pageSize ? conf.pageSize : tempDataSourceFix.length;
    conf.page = conf.page ? conf.page : 0;
    if (conf.filter) {
      conf.filter = conf.filter.toLocaleLowerCase();
      tempDataSourceFix = tempDataSourceFix.filter(
        (el: any) =>
          el.name.toLowerCase().indexOf(conf.filter) > -1 || el.symbol.toLowerCase().indexOf(conf.filter) > -1
      );
    }

    if (tempDataSourceFix.length > 0 && tempDataSourceFix[0][conf.sort]) {
      tempDataSourceFix = tempDataSourceFix.sort((a, b) => {
        if (conf.order === 'asc') {
          return a[conf.sort] - b[conf.sort];
        } else if (conf.order === 'desc') {
          return b[conf.sort] - a[conf.sort];
        }
        return 0;
      });
    }

    let currentPage = 0;
    if (this.isSameFilter(conf.filter)) {
      currentPage = Math.min(conf.page, Math.floor(tempDataSourceFix.length / conf.pageSize));
    }
    const start = currentPage * (conf.pageSize * 1);
    const end = start + conf.pageSize * 1;
    const result = tempDataSourceFix.slice(start, end);
    this.logger.log('gemockter http-Request...', result);
    this.filter = conf.filter;
    return of({ items: result, totalCount: tempDataSourceFix.length }).pipe(delay(1000));
  }

  isSameFilter(newFilter: string): boolean {
    return this.filter === newFilter;
  }
}
