import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lux-label',
  template: '<span [id]="luxId"><ng-content></ng-content></span>'
})
export class LuxLabelComponent implements OnInit {
  @Input() luxId?: string;

  constructor() {}

  ngOnInit() {
    if (!this.luxId) {
      console.warn('lux-label -> The property "luxId" is missing.');
    }
  }
}
