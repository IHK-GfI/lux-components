import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-side-nav-header',
  template: '<div class="lux-side-nav-header-content"><ng-content></ng-content></div>'
})
export class LuxSideNavHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
