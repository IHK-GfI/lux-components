import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lux-app-header-action-nav',
  templateUrl: './lux-app-header-action-nav.component.html',
  styleUrls: ['./lux-app-header-action-nav.component.scss']
})
export class LuxAppHeaderActionNavComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
