import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lux-app-content',
  templateUrl: './lux-app-content.component.html',
  styleUrls: ['./lux-app-content.component.scss']
})
export class LuxAppContentComponent implements OnInit {

  @Input() luxAriaRoleMainLabel = 'Inhaltsbereich';

  constructor() {}

  ngOnInit() {}
}
