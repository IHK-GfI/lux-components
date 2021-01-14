import { Component, Input } from '@angular/core';
import { TableExampleComponent } from '../table-example.component';
import { ResponsiveBehaviour } from '../responsive-behaviour';

@Component({
  selector: 'table-example-advanced-options',
  templateUrl: './table-example-advanced-options.component.html'
})
export class TableExampleAdvancedOptionsComponent {
  BEHAVIOURS = ResponsiveBehaviour.BEHAVIOURS;

  @Input() tableExample: TableExampleComponent;

  constructor() {}

}
