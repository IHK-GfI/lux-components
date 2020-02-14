import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ripple-example',
  templateUrl: './ripple-example.component.html'
})
export class RippleExampleComponent implements OnInit {
  color;
  unbounded = false;
  centered = false;
  radius = 0;
  animation;
  disabled = false;
  enterDuration;
  exitDuration;

  constructor() {}

  ngOnInit() {}
}
