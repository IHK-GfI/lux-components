import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip-example',
  templateUrl: './tooltip-example.component.html'
})
export class TooltipExampleComponent {
  positionOptions = ['left', 'right', 'above', 'below', 'before', 'after'];

  message = 'Tooltip';
  disabled = false;
  hideDelay = 0;
  showDelay = 0;
  position = 'above';

  constructor() {}
}
