import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timestamp-example',
  templateUrl: './timestamp-example.component.html'
})
export class TimestampExampleComponent implements OnInit {
  readonly initialNow = Date.now();
  now: number = this.initialNow;
  nowISO: string = new Date(this.now).toISOString();

  defaultText: string = '';
  prefix: string = undefined;

  constructor() {}

  ngOnInit() {}

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
