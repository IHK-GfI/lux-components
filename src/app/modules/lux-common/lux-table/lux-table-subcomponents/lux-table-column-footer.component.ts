import { AfterContentInit, Component, ContentChild, TemplateRef } from "@angular/core";
import { LuxUtil } from "../../../lux-util/lux-util";

@Component({
  selector: 'lux-table-column-footer',
  template: ''
})
export class LuxTableColumnFooterComponent implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef!: TemplateRef<any>;

  ngAfterContentInit() {
    LuxUtil.assertNonNull('tempRef', this.tempRef)
  }
}
