import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-input-suffix',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class LuxInputSuffixComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
