import { Component, OnInit } from "@angular/core";
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { TestHttpDao } from './test-http-dao';
import { TableExampleBaseClass } from '../table-example/table-example-base.class';

@Component({
  selector: 'app-table-server-example',
  templateUrl: './table-server-example.component.html'
})
export class TableServerExampleComponent extends TableExampleBaseClass implements OnInit {
  httpDAO = null;
  reloadCount = 0;

  constructor(private logger: LuxConsoleService) {
    super();
  }

  getDataArr() {
    return this.httpDAO.data;
  }

  ngOnInit() {
    this.httpDAO = new TestHttpDao(this.logger);
  }

  onSelectedChange($event) {
    console.log('als Set:  ', $event);
  }

  onSelectedAsArrayChange($event) {
    console.log('als Array:', $event);
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
