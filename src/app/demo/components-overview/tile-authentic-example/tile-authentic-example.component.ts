import { Component, OnInit } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-tile-authentic-example',
  templateUrl: './tile-authentic-example.component.html',
  styleUrls: ['./tile-authentic-example.component.scss']
})
export class TileAuthenticExampleComponent {
  showIcon = true;
  showOutputEvents = false;

  showNotification;
  counter = undefined;
  counterCap = 20;
  label = 'Tile-Authentic';
  subTitle = 'Die neue Kachel mit einem Subtitle'
  log = logResult;

  constructor() { }

}