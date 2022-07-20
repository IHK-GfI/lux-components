import { Component, Input, OnInit } from "@angular/core";
import { LuxUtil } from "../../../../modules/lux-util/lux-util";
import { TableExampleBaseClass } from "../table-example-base.class";
import { ResponsiveBehaviour } from '../responsive-behaviour';

@Component({
  selector: 'table-example-advanced-options',
  templateUrl: './table-example-advanced-options.component.html'
})
export class TableExampleAdvancedOptionsComponent implements OnInit{
  BEHAVIOURS = ResponsiveBehaviour.BEHAVIOURS;

  @Input() tableExample!: TableExampleBaseClass;

  constructor() {}

  ngOnInit() {
    LuxUtil.assertNonNull('tableExample', this.tableExample);
  }

}
