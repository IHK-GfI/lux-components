import { Component } from '@angular/core';
import { LuxProgressSizeType, LuxProgressModeType } from "../../../modules/lux-common/lux-progress/lux-progress.component";
import { LuxProgressColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-progress-example',
  templateUrl: './progress-example.component.html'
})
export class ProgressBarExampleComponent {
  sizes = ['small', 'medium', 'large'];
  colors = LuxProgressColors;
  backgroundColor = '';
  modes = ['determinate', 'indeterminate'];

  size: LuxProgressSizeType = 'medium';
  mode: LuxProgressModeType = 'determinate';
  value = 70;

  constructor() {}

  addBarProgress() {
    this.value = this.value + 10 > 100 ? 100 : this.value + 10;
  }

  subtractBarProgress() {
    this.value = this.value - 10 < 0 ? 0 : this.value - 10;
  }
}
