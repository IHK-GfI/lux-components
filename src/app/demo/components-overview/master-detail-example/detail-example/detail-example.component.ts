import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-example',
  templateUrl: './detail-example.component.html'
})
export class DetailExampleComponent {
  @Input() selectedDetail: any;
  @Input() masterDetailConfig: any;

  constructor() {}
}
