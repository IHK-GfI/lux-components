import { AfterContentInit, Component, ContentChild, TemplateRef } from '@angular/core';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-detail-view-light',
  template: ''
})
export class LuxDetailViewLightComponent implements AfterContentInit {
  @ContentChild(TemplateRef) tempRef!: TemplateRef<any>;

  constructor() {}

  ngAfterContentInit() {
    LuxUtil.assertNonNull('tempRef', this.tempRef);
  }
}
