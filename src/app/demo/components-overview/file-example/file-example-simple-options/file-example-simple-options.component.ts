import { Component, Input, OnInit } from '@angular/core';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-example-simple-options',
  templateUrl: './file-example-simple-options.component.html'
})
export class FileExampleSimpleOptionsComponent implements OnInit {
  @Input() fileExample: FileExampleComponent;

  constructor() {}

  ngOnInit() {}
}
