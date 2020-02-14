import { Component } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-infinite-scrolling-example',
  templateUrl: './infinite-scrolling-example.component.html',
  styleUrls: ['./infinite-scrolling-example.component.scss']
})
export class InfiniteScrollingExampleComponent {
  showOutputEvents: boolean = false;
  listItems: string[] = [];
  log = logResult;
  created: boolean = false;

  immediateCallback: boolean = true;
  isLoading: boolean = false;
  scrollPercent: number = 85;

  constructor() {
    this.createListItems();
    this.recreateList();
  }

  recreateList() {
    this.created = false;
    setTimeout(() => {
      this.created = true;
    }, 500);
  }

  reset() {
    this.listItems = [];
    this.createListItems();
  }

  onScroll() {
    this.log(this.showOutputEvents, 'luxScrolled');
    this.createListItems();
  }

  trackByFn(index, item) {
    return index;
  }

  private createListItems() {
    for (let i = 0; i < 10; i++) {
      this.listItems.push('Test #' + this.listItems.length);
    }
  }
}
