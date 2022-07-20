import { Component } from '@angular/core';

@Component({
  selector: 'app-ripple-example',
  templateUrl: './ripple-example.component.html'
})
export class RippleExampleComponent {
  color = null;
  unbounded = false;
  centered = false;
  radius = 0;
  disabled = false;
  enterDuration = 0;
  exitDuration = 0;

  constructor() {}
}
