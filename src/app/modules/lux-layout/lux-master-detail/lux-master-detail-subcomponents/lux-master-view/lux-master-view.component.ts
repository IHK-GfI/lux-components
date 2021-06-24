import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'lux-master-view',
  template:
    '<ng-content select="lux-master-header"></ng-content>' +
    '<ng-content></ng-content>' +
    '<ng-content select="[lux-master-footer]"></ng-content>'
})
export class LuxMasterViewComponent {
  @HostBinding('class.lux-overflow-y-auto') overflowY = true;

  constructor() {}
}
