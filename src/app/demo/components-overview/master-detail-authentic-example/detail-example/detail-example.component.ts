import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-example',
  templateUrl: './detail-example.component.html'
})
export class DetailExampleComponent {
  @Input() selectedDetail?: any;
  @Input() masterDetailConfig?: {
    emptyIconDetail: string;
    emptyIconMaster: string;
    emptyIconDetailSize: string;
    emptyIconMasterSize: string;
    emptyLabelDetail: string;
    emptyLabelMaster: string;
    opened: boolean;
    lineBreak: boolean;
    masterIsReloading: boolean;
    ignoreScrollLoading: boolean;
    alignEmptyElements: boolean;
  };

  constructor() {}
}
