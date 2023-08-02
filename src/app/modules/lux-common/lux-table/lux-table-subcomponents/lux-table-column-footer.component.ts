import { AfterContentInit, Component, ContentChild, TemplateRef } from '@angular/core';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-table-column-footer',
  template: ''
})
export class LuxTableColumnFooterComponent<T = any> implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef!: TemplateRef<T>;

  ngAfterContentInit() {
    LuxUtil.assertNonNull(`tempRef (missing <ng-template></ng-template> in <lux-table-column-footer>)`, this.tempRef);
  }
}
