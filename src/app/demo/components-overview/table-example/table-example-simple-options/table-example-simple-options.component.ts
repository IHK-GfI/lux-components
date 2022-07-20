import { Component, Input, OnInit } from "@angular/core";
import { LuxUtil } from "../../../../modules/lux-util/lux-util";
import { TableExampleBaseClass } from "../table-example-base.class";

@Component({
  selector: 'table-example-simple-options',
  templateUrl: './table-example-simple-options.component.html'
})
export class TableExampleSimpleOptionsComponent implements OnInit{
  @Input() tableExample!: TableExampleBaseClass;

  constructor() {}

  ngOnInit() {
    LuxUtil.assertNonNull('tableExample', this.tableExample);
  }
}
