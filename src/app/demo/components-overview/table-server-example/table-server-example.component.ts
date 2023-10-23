import { Component, ViewChild } from '@angular/core';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { TestHttpDao } from './test-http-dao';
import { TableExampleBaseClass } from '../table-example/table-example-base.class';
import { LuxTableComponent } from '../../../modules/lux-common/lux-table/lux-table.component';

@Component({
  selector: 'app-table-server-example',
  templateUrl: './table-server-example.component.html'
})
export class TableServerExampleComponent extends TableExampleBaseClass {
  @ViewChild('myTable') tableComponent!: LuxTableComponent;

  httpDAO: TestHttpDao;
  reloadCount = 0;

  constructor(private logger: LuxConsoleService) {
    super();

    this.httpDAO = new TestHttpDao(this.logger);
  }

  getDataArr() {
    return this.httpDAO.data;
  }

  getTableComponent(): LuxTableComponent<any> {
    return this.tableComponent;
  }

  onSelectedChange(selected: Set<any>) {
    console.log('als Set:  ', selected);
  }

  onSelectedAsArrayChange(selected: any[]) {
    console.log('als Array:', selected);
  }

  reload() {
    this.reloadCount++;

    // Das Datenarray kürzen
    const newHttpDAO = new TestHttpDao(this.logger);
    newHttpDAO.dataSourceFix = newHttpDAO.dataSourceFix.slice(0, newHttpDAO.dataSourceFix.length - 2);

    // Die Namen ändern
    for (let i = 0; i < newHttpDAO.dataSourceFix.length; i++) {
      newHttpDAO.dataSourceFix[i].name += '_' + this.reloadCount;
    }

    // Das neue ILuxTableHttpDao setzen
    this.httpDAO = newHttpDAO;
  }
}
