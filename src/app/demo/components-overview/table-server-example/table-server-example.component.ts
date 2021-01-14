import { Component } from '@angular/core';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { TestHttpDao } from './test-http-dao';
import { TableExampleBaseClass } from '../table-example/table-example-base.class';

@Component({
  selector: 'app-table-server-example',
  templateUrl: './table-server-example.component.html'
})
export class TableServerExampleComponent extends TableExampleBaseClass {
  httpDAO = null;

  constructor(private logger: LuxConsoleService) {
    super();
    this.httpDAO = new TestHttpDao(this.logger);
  }
}
