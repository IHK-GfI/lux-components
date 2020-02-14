import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'lux-master-view',
  template:
    '<ng-content select="lux-master-header"></ng-content>' +
    '<ng-content></ng-content>' +
    '<ng-content select="[lux-master-footer]"></ng-content>'
})
export class LuxMasterViewComponent implements OnInit {
  @HostBinding('class.lux-overflow-y-auto') overflowY: boolean = true;

  constructor() {}

  ngOnInit() {}
}
