import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-panel-action',
  template: '<mat-action-row><ng-content></ng-content></mat-action-row>'
})
export class LuxPanelActionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
