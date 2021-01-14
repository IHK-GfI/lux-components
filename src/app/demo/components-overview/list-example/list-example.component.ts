import { Component } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss']
})
export class ListExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;
  items: any[] = [];
  colors = Object.keys(LuxBackgroundColorsEnum);

  // endregion

  // region Properties der Component

  emptyLabel = 'Keine Daten!';
  emptyIconName = 'fas fa-exclamation';
  emptyIconSize = '5x';
  selectedPosition = 0;

  // endregion

  constructor() {
    this.clear();
    this.fill(10);
  }

  clear() {
    this.items = [];
  }

  fill(amount: number) {
    this.clear();
    for (let i = 0; i < amount; i++) {
      this.items.push({
        title: `Item #${i + 1}`,
        subTitle: `Untertitel Item #${i + 1}`,
        lineBreak: false,
        selected: false,
        iconName: 'fas fa-user'
      });
    }

    this.items[0].selected = true;
  }

  click($event) {
    this.log(this.showOutputEvents, 'luxClicked', $event);
  }
}
