import { Component, Input, OnInit } from '@angular/core';
import { LuxUtil } from '../../lux-util/lux-util';

@Component({
  selector: 'lux-spinner',
  templateUrl: './lux-spinner.component.html',
  styleUrls: ['./lux-spinner.component.scss']
})
export class LuxSpinnerComponent implements OnInit {
  @Input() luxIndeterminate: boolean = true;
  @Input() luxValue: number = 0;

  constructor() {}

  get mode() {
    return this.luxIndeterminate ? 'indeterminate' : 'determinate';
  }

  ngOnInit() {}

  isIE(): boolean {
    return LuxUtil.isIE();
  }
}
