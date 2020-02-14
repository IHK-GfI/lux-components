import { Component, OnInit } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'tile-example',
  templateUrl: './tile-example.component.html'
})
export class TileExampleComponent implements OnInit {
  showIcon = true;
  showOutputEvents = false;

  showNotification;
  counter = undefined;
  counterCap = 20;
  label = 'Tile Example';

  log = logResult;

  constructor() {}

  ngOnInit() {}
}
