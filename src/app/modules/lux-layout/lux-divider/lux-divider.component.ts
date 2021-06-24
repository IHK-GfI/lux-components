import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lux-divider',
  templateUrl: './lux-divider.component.html',
  styleUrls: ['./lux-divider.component.scss']
})
export class LuxDividerComponent implements OnInit {
  private _luxVertical = false;

  @Input() luxInset = false;

  @HostBinding('class') classes = '';

  get luxVertical(): boolean {
    return this._luxVertical;
  }

  @Input() set luxVertical(vertical: boolean) {
    this._luxVertical = vertical;
    this.updateHostClasses();
  }

  constructor() {}

  ngOnInit() {
    this.updateHostClasses();
  }

  private updateHostClasses() {
    this.classes = this.luxVertical ? 'lux-vertical-divider' : 'lux-horizontal-divider';
  }
}
