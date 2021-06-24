import { Component } from '@angular/core';

@Component({
  selector: 'app-timestamp-example',
  templateUrl: './timestamp-example.component.html'
})
export class TimestampExampleComponent {
  readonly initialNow = Date.now();
  now: number = this.initialNow;
  nowISO: string = new Date(this.now).toISOString();

  defaultText = '';
  prefix: string = undefined;

  constructor() {}

  updateNow($event: string) {
    this.now = new Date($event).getTime();
    this.nowISO = new Date(this.now).toISOString();
  }

  resetNow() {
    this.now = this.initialNow;
    this.nowISO = new Date(this.now).toISOString();
  }

  clearNow() {
    this.now = undefined;
    this.nowISO = '';
  }
}
