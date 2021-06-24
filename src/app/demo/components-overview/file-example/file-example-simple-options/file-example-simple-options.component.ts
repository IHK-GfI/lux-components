import { Component, Input } from '@angular/core';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-example-simple-options',
  templateUrl: './file-example-simple-options.component.html'
})
export class FileExampleSimpleOptionsComponent {
  @Input() fileExample: FileExampleComponent;

  constructor() {}
}
