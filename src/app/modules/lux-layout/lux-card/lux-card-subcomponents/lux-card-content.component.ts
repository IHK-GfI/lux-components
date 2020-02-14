import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-card-content',
  template: '<ng-content></ng-content>'
})
export class LuxCardContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
