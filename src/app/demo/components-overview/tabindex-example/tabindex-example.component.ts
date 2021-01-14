import { Component } from '@angular/core';

@Component({
  selector: 'lux-tabindex-example',
  templateUrl: './tabindex-example.component.html'
})
export class TabindexExampleComponent {
  chipItems = ['Test1', 'Test2'];
  options = [{ label: 'Test1' }, { label: 'Test2' }];

  constructor() {}
}
