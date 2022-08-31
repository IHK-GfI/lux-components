import { AfterContentInit, Component, ContentChild, TemplateRef } from '@angular/core';
import { LuxUtil } from '../../../../lux-util/lux-util';

@Component({
  selector: 'lux-detail-view',
  template: ''
})
export class LuxDetailViewComponent implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef!: TemplateRef<any>;

  constructor() {}

  ngAfterContentInit() {
    LuxUtil.assertNonNull('tempRef', this.tempRef);
  }

}
