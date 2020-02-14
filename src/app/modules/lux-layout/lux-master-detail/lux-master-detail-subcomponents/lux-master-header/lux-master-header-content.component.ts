import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-master-header-content',
  template: `
    <ng-content></ng-content>
  `
})
export class LuxMasterHeaderContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
