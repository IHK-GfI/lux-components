import { AfterViewInit, Component, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { LuxUtil } from '../../../../lux-util/lux-util';
import { LuxAppHeaderAcActionNavItemComponent } from './lux-app-header-ac-action-nav-item/lux-app-header-ac-action-nav-item.component';

@Component({
  selector: 'lux-app-header-ac-action-nav',
  templateUrl: './lux-app-header-ac-action-nav.component.html'
})
export class LuxAppHeaderAcActionNavComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;
  @ContentChildren(LuxAppHeaderAcActionNavItemComponent) menuItemComponents!: QueryList<LuxAppHeaderAcActionNavItemComponent>;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('templateRef', this.templateRef);
  }
}
