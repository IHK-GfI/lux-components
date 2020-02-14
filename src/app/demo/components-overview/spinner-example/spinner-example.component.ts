import { Component, OnInit } from '@angular/core';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-spinner-example',
  templateUrl: './spinner-example.component.html'
})
export class SpinnerExampleComponent implements OnInit {
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

  addSpinnerProgress() {
    this.value = this.value + 10 > 100 ? 100 : this.value + 10;
  }

  subtractSpinnerProgress() {
    this.value = this.value - 10 < 0 ? 0 : this.value - 10;
  }
}
