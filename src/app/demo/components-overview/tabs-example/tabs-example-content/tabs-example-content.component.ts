import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-example-content.component.html'
})
export class TabsExampleContentComponent implements OnInit, AfterViewInit {
  @Output() created: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.created.emit();
  }
}
