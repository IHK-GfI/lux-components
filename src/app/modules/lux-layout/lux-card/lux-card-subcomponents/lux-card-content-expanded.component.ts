import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-card-content-expanded',
  template: '<ng-content></ng-content>'
})
export class LuxCardContentExpandedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
