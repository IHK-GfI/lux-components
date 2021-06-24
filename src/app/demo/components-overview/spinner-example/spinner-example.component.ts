import { Component } from '@angular/core';
import { LuxBackgroundColorsEnum, LuxProgressColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-spinner-example',
  templateUrl: './spinner-example.component.html'
})
export class SpinnerExampleComponent {

  sizes = ['small', 'medium', 'large'];
  colors = LuxProgressColors;
  backgroundColor = '';
  modes = ['determinate', 'indeterminate'];

  size = 'medium';
  mode = 'determinate';
  value = 70;

  constructor() {}

  addSpinnerProgress() {
    this.value = this.value + 10 > 100 ? 100 : this.value + 10;
  }

  subtractSpinnerProgress() {
    this.value = this.value - 10 < 0 ? 0 : this.value - 10;
  }
}
