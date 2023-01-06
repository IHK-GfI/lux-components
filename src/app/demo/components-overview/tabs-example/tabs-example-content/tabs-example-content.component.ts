import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-example-content.component.html'
})
export class TabsExampleContentComponent implements AfterViewInit {
  @Output() created = new EventEmitter<void>();

  constructor() {}

  ngAfterViewInit() {
    this.created.emit();
  }
}
