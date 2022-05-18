import { Component, Input } from '@angular/core';
import { TableExampleBaseClass } from "../table-example-base.class";

@Component({
  selector: 'table-example-simple-options',
  templateUrl: './table-example-simple-options.component.html'
})
export class TableExampleSimpleOptionsComponent {
  @Input() tableExample: TableExampleBaseClass;

  constructor() {}
}
