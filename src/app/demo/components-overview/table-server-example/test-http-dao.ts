import { ILuxTableHttpDao } from '../../../modules/lux-common/lux-table/lux-table-http/lux-table-http-dao.interface';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class TestHttpDao implements ILuxTableHttpDao {
  dataSourceFix: any[] = [
    { name: 'Hydrogen', symbol: 'H', date: new Date(2017, 11, 24), disabled: false },
    { name: 'Helium', symbol: 'He', date: new Date(2017, 11, 22), disabled: false },
    { name: 'Lithium', symbol: 'Li', date: new Date(2018, 11, 21), disabled: false },
    { name: 'Beryllium', symbol: 'Be', date: new Date(2018, 11, 18), disabled: false },
    { name: 'Boron', symbol: 'B', date: new Date(2018, 10, 24), disabled: false },
    { name: 'Carbon', symbol: 'C', date: new Date(2018, 11, 24), disabled: false },
    { name: 'Nitrogen', symbol: 'N', date: new Date(2018, 10, 24), disabled: false },
    { name: 'Oxygen', symbol: 'O', date: new Date(2018, 11, 24), disabled: false },
    { name: 'Fluorine', symbol: 'F', date: new Date(2018, 11, 24), disabled: false },
    { name: 'Neon', symbol: 'Ne', date: new Date(2018, 10, 24), disabled: false },
    { name: 'Sodium', symbol: 'Na', date: new Date(2018, 11, 24), disabled: false },
    { name: 'Magnesium', symbol: 'Mg', date: new Date(2018, 9, 24), disabled: false },
    { name: 'Aluminum', symbol: 'Al', date: new Date(2018, 11, 24), disabled: false },
    { name: 'Silicon', symbol: 'Si', date: new Date(2018, 9, 24), disabled: false },
    { name: 'Phosphorus', symbol: 'P', date: new Date(2018, 11, 24), disabled: false },
    { name: 'Sulfur', symbol: 'S', date: new Date(2018, 9, 24), disabled: false }
  ];

  filter = '';
  data: any[] = [];

  constructor(private logger: LuxConsoleService) {}

  loadData(conf: { page: number; pageSize: number; filter?: string; sort?: string; order?: string }): Observable<any> {
    this.logger.log('gemockter http-Request (config):', conf);

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

    if (tempDataSourceFix.length > 0 && conf.sort && tempDataSourceFix[0][conf.sort]) {
      tempDataSourceFix = tempDataSourceFix.sort((a, b) => {
        if (conf.order === 'asc') {
          return a[conf.sort!] > b[conf.sort!] ? -1 : 1;
        } else if (conf.order === 'desc') {
          return b[conf.sort!] > a[conf.sort!] ? -1 : 1;
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
    this.logger.log('gemockter http-Request (result):', result);
    this.data = result;
    this.filter = conf.filter ?? '';
    return of({ items: result, totalCount: tempDataSourceFix.length }).pipe(delay(1000));
  }

  isSameFilter(newFilter: string | undefined): boolean {
    return this.filter === newFilter;
  }
}
