import { Component, OnInit } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss']
})
export class ListExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showOutputEvents: boolean = false;
  log = logResult;
  items: any[] = [];

  // endregion

  // region Properties der Component

  emptyLabel: string = 'Keine Daten!';
  emptyIconName: string = 'fas fa-exclamation';
  emptyIconSize: string = '5x';
  selectedPosition: number = 0;
  focusedPosition: number = 0;

  // endregion

  constructor() {
    this.clear();
    this.fill(5);
  }

  ngOnInit() {}

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
