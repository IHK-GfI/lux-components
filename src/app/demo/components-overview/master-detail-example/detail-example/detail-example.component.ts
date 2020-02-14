import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-example',
  templateUrl: './detail-example.component.html'
})
export class DetailExampleComponent implements OnInit {
  @Input() selectedDetail: any;
  @Input() masterDetailConfig: any;

  constructor() {}

  ngOnInit() {}
}
