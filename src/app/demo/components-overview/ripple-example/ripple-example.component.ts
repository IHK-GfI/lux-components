import { Component } from '@angular/core';

@Component({
  selector: 'app-ripple-example',
  templateUrl: './ripple-example.component.html'
})
export class RippleExampleComponent {
  color;
  unbounded = false;
  centered = false;
  radius = 0;
  animation;
  disabled = false;
  enterDuration;
  exitDuration;

  constructor() {}
}
