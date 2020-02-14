import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-list-item-content',
  template: '<ng-content></ng-content>'
})
export class LuxListItemContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
