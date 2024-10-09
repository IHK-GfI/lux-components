import { Component } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'tile-example',
  templateUrl: './tile-example.component.html'
})
export class TileExampleComponent {
  showIcon = true;
  showOutputEvents = false;
  counter = undefined;
  counterCap = 20;
  label = 'Tile Example';
  log = logResult;
  _showNotification = false;
  showShadow = true;

  get showNotification() {
    return this._showNotification;
  }

  set showNotification(show: boolean) {
    this._showNotification = show;

    if (show && this.counter) {
      this.counter = undefined;
    }
  }

  constructor() {}
}
