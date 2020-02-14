import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-step-content',
  template: '<ng-content></ng-content>',
  styles: ['']
})
export class LuxStepContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
