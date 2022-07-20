import { Component, Input, OnInit } from "@angular/core";
import { LuxUtil } from "../../../../modules/lux-util/lux-util";
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-example-simple-options',
  templateUrl: './file-example-simple-options.component.html'
})
export class FileExampleSimpleOptionsComponent implements OnInit {
  @Input() fileExample!: FileExampleComponent;

  constructor() {}

  ngOnInit() {
    LuxUtil.assertNonNull('fileExample', this.fileExample);
  }
}
