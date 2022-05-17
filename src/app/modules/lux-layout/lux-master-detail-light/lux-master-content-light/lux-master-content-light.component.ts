import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-master-content-light',
  //templateUrl: './lux-master-content-light.component.html',
  template:'<ng-content></ng-content>',
  styleUrls: ['./lux-master-content-light.component.scss']
})
export class LuxMasterContentLightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
