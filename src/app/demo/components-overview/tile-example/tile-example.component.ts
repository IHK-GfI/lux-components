import { Component } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'tile-example',
  templateUrl: './tile-example.component.html'
})
export class TileExampleComponent {
  showIcon = true;
  showOutputEvents = false;
  showNotification = false;
  counter = undefined;
  counterCap = 20;
  label = 'Tile Example';
  subTitle = 'Kurzer erklärender Text'
  log = logResult;

  constructor() {}
}
