import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-detail-header-light',
  //templateUrl: './lux-detail-header-light.component.html',
  template:'<ng-content></ng-content>',
  styleUrls: ['./lux-detail-header-light.component.scss']
})
export class LuxDetailHeaderLightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
