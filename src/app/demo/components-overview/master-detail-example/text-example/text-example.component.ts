import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'text-example',
  templateUrl: './text-example.component.html'
})
export class TextExampleComponent implements OnInit {
  @Input() title: String = 'Lorum ipsum';

  constructor() {}

  ngOnInit() {}
}
