import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lux-app-header-next-nav-menu',
  templateUrl: './lux-app-header-next-nav-menu.component.html',
})
export class LuxAppHeaderNextNavMenuComponent {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
  
  constructor() { }
}
