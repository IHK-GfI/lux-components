import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'example-base-content',
  template: '<ng-content></ng-content>'
})
export class ExampleBaseContentComponent implements OnChanges {
  @Input() exampleCentered = false;

  @HostBinding('class.example-content-centered') centered = false;

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.exampleCentered) {
      this.centered = simpleChanges.exampleCentered.currentValue;
    }
  }
}
