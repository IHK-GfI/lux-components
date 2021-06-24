import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-example',
  templateUrl: './text-example.component.html'
})
export class TextExampleComponent {
  @Input() title = 'Lorum ipsum';

  constructor() {}
}
