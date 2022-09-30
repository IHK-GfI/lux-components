import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-detail-content-light',
  //templateUrl: './lux-detail-content-light.component.html',
  template:'<ng-content></ng-content>',
  styleUrls: ['./lux-detail-content-light.component.scss']
})
export class LuxDetailContentLightComponent {

  constructor() { }

}
