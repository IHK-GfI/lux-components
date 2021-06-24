import { Component } from '@angular/core';

@Component({
  selector: 'lux-card-actions',
  template: '<div fxLayout="row" class="lux-flex-layout-gap-10"><ng-content></ng-content></div>'
})
export class LuxCardActionsComponent {
  constructor() {}
}
