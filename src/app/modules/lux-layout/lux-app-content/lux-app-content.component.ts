import { Component, Input } from '@angular/core';

@Component({
  selector: 'lux-app-content',
  templateUrl: './lux-app-content.component.html',
  styleUrls: ['./lux-app-content.component.scss']
})
export class LuxAppContentComponent {
  @Input() luxAriaRoleMainLabel = 'Inhaltsbereich';

  constructor() {}
}
