import { Component } from '@angular/core';

@Component({
  selector: 'lux-panel-action',
  template: '<mat-action-row><ng-content></ng-content></mat-action-row>'
})
export class LuxPanelActionComponent {
  constructor() {}
}
