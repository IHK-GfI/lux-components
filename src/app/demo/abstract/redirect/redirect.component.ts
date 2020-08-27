import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {

  url: string = '/';

  constructor() { }

  ngOnInit(): void {
    window.location.href = this.url;
  }
}
