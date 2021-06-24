import { Component, Input } from '@angular/core';
import { TableExampleComponent } from '../table-example.component';

@Component({
  selector: 'table-example-simple-options',
  templateUrl: './table-example-simple-options.component.html'
})
export class TableExampleSimpleOptionsComponent {
  @Input() tableExample: TableExampleComponent;

  constructor() {}
}
