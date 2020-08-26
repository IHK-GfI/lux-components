import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  url: string = '/';

  constructor() { }

  ngOnInit(): void {
    window.location.href = this.url;
  }
}
