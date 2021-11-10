import { Component, Input } from '@angular/core';

@Component({
  selector: 'lux-spinner',
  templateUrl: './lux-spinner.component.html',
  styleUrls: ['./lux-spinner.component.scss']
})
export class LuxSpinnerComponent {
  @Input() luxIndeterminate = true;
  @Input() luxValue = 0;

  constructor() {}

  get mode() {
    return this.luxIndeterminate ? 'indeterminate' : 'determinate';
  }

}
