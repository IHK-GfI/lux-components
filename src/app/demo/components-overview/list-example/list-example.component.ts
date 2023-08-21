import { Component } from '@angular/core';
import { LuxBadgeColors } from '../../../modules/lux-util/lux-colors.enum';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss']
})
export class ListExampleComponent {
  showOutputEvents = false;
  log = logResult;
  items: any[] = [];
  colors = LuxBadgeColors;
  emptyLabel = 'Keine Daten!';
  emptyIconName = 'lux-exclamation-mark';
  emptyIconSize = '5x';
  selectedPosition = 0;

  constructor() {
    this.clear();
    this.fill(10);
  }

  clear() {
    this.items = [];
    this.selectedPosition = -1;
  }

  fill(amount: number) {
    this.clear();
    for (let i = 0; i < amount; i++) {
      this.items.push({
        title: `Item #${i + 1}`,
        subTitle: `Untertitel Item #${i + 1}`,
        lineBreak: false,
        selected: false,
        iconName: 'lux-interface-user-single'
      });
    }
  }

  click(event: any) {
    this.log(this.showOutputEvents, 'luxClicked', event);
  }
}
