import { AfterContentInit, Component, ContentChild, TemplateRef } from '@angular/core';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-table-column-content',
  template: ''
})
export class LuxTableColumnContentComponent<T = any> implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef?: TemplateRef<T>;

  ngAfterContentInit() {
    LuxUtil.assertNonNull(`tempRef (missing <ng-template></ng-template> in <lux-table-column-content>)`, this.tempRef);
  }
}
