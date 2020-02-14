import { Component, Input, OnInit } from '@angular/core';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-example-advanced-options',
  templateUrl: './file-example-advanced-options.component.html'
})
export class FileExampleAdvancedOptionsComponent implements OnInit {
  @Input() fileExample: FileExampleComponent;
  @Input() showHeaderConfigProperties: boolean;

  constructor() {}

  ngOnInit() {}
}
