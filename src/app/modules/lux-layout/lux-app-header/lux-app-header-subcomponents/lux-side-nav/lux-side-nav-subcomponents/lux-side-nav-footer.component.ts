import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-side-nav-footer',
  template: '<lux-divider></lux-divider><div class="lux-side-nav-footer-content"><ng-content></ng-content></div>'
})
export class LuxSideNavFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
