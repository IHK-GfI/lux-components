import { AfterContentInit, Component, ContentChild, TemplateRef } from '@angular/core';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-table-column-header',
  template: ''
})
export class LuxTableColumnHeaderComponent<T = any> implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef!: TemplateRef<T>;

  ngAfterContentInit() {
    LuxUtil.assertNonNull(`tempRef (missing <ng-template></ng-template> in <lux-table-column-header>)`, this.tempRef);
  }
}
