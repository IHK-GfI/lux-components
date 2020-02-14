import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-input-prefix',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class LuxInputPrefixComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
