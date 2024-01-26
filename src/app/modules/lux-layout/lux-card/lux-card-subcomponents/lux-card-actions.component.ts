import { Component } from '@angular/core';

@Component({
  selector: 'lux-card-actions',
  template: '<div class="lux-flex lux-justify-end lux-items-center lux-gap-3"><ng-content></ng-content></div>'
})
export class LuxCardActionsComponent {
  constructor() {}
}
