import { Component } from '@angular/core';

@Component({
  selector: 'app-timestamp-example',
  templateUrl: './timestamp-example.component.html'
})
export class TimestampExampleComponent {
  readonly initialNow = Date.now();
  now: number | null;
  nowISO: string;

  defaultText = '';
  prefix?: string;

  constructor() {
    this.now = this.initialNow;
    this.nowISO = new Date(this.now).toISOString();
  }

  updateNow(timestamp: string) {
    this.now = new Date(timestamp).getTime();
    this.nowISO = new Date(this.now).toISOString();
  }

  resetNow() {
    this.now = this.initialNow;
    this.nowISO = new Date(this.now).toISOString();
  }

  clearNow() {
    this.now = null;
    this.nowISO = '';
  }
}
