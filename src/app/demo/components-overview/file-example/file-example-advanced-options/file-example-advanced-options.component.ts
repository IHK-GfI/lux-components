import { Component, Input, OnInit } from '@angular/core';
import { LuxUtil } from '../../../../modules/lux-util/lux-util';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-example-advanced-options',
  templateUrl: './file-example-advanced-options.component.html'
})
export class FileExampleAdvancedOptionsComponent implements OnInit {
  @Input() fileExample!: FileExampleComponent<any, any>;
  @Input() showHeaderConfigProperties!: boolean;

  constructor() {}

  ngOnInit() {
    LuxUtil.assertNonNull('fileExample', this.fileExample);
    LuxUtil.assertNonNull('showHeaderConfigProperties', this.showHeaderConfigProperties);
  }
}
