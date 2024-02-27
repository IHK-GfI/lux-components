import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { LuxUtil } from '../../../../lux-util/lux-util';

@Component({
  selector: 'lux-app-header-action-nav',
  templateUrl: './lux-app-header-action-nav.component.html'
})
export class LuxAppHeaderActionNavComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('templateRef', this.templateRef);
  }
}
