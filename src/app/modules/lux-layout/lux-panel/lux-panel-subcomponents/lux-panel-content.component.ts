import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-panel-content',
  template: '<ng-content></ng-content>'
})
export class LuxPanelContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
