import { Component, OnInit } from '@angular/core';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-progress-example',
  templateUrl: './progress-example.component.html',
  styles: ['']
})
export class ProgressBarExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  sizes = ['small', 'medium', 'large'];
  colors = Object.keys(LuxBackgroundColorsEnum);
  modes = ['determinate', 'indeterminate'];

  // endregion

  // region Properties der Component

  size = 'medium';
  color = this.colors[0];
  mode = 'indeterminate';
  value = 0;

  // endregion

  constructor() {}

  ngOnInit() {}

  addBarProgress() {
    this.value = this.value + 10 > 100 ? 100 : this.value + 10;
  }

  subtractBarProgress() {
    this.value = this.value - 10 < 0 ? 0 : this.value - 10;
  }
}
