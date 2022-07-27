import { AfterContentInit, Component, ContentChild, TemplateRef } from "@angular/core";
import { LuxUtil } from "../../../lux-util/lux-util";

@Component({
  selector: 'lux-table-column-content',
  template: ''
})
export class LuxTableColumnContentComponent implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef!: TemplateRef<any>;

  ngAfterContentInit() {
    LuxUtil.assertNonNull('tempRef', this.tempRef)
  }
}
