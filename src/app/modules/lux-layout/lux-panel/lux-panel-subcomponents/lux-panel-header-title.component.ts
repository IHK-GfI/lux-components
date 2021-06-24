import { Component } from '@angular/core';

@Component({
  selector: 'lux-panel-header-title',
  template: '<mat-panel-title><ng-content></ng-content></mat-panel-title>'
})
export class LuxPanelHeaderTitleComponent {
  constructor() {}
}
