import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-panel-header-description',
  template: '<mat-panel-description><ng-content></ng-content></mat-panel-description>'
})
export class LuxPanelHeaderDescriptionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
