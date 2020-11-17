import { Component, OnInit } from '@angular/core';
import { LuxProgressColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-progress-example',
  templateUrl: './progress-example.component.html',
  styles: ['']
})
export class ProgressBarExampleComponent implements OnInit {

  sizes = ['small', 'medium', 'large'];
  colors = LuxProgressColors;
  backgroundColor = '';
  modes = ['determinate', 'indeterminate'];

  size = 'medium';
  mode = 'determinate';
  value = 70;


  constructor() {}

  ngOnInit() {}

  addBarProgress() {
    this.value = this.value + 10 > 100 ? 100 : this.value + 10;
  }

  subtractBarProgress() {
    this.value = this.value - 10 < 0 ? 0 : this.value - 10;
  }
}
