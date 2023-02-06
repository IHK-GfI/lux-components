import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-tab',
  template: ''
})
export class LuxTabComponent implements AfterViewInit {
  @Input() luxTitle = '';
  @Input() luxIconName?: string;
  @Input() luxCounter?: number;
  @Input() luxCounterCap = 10;
  @Input() luxShowNotification?: boolean;
  @Input() luxDisabled = false;
  @Input() luxTagIdHeader?: string;
  @Input() luxTagIdContent?: string;
  @Input() luxImageSrc?: string;
  @Input() luxImageAlign : 'left' | 'center' | 'right' = 'center';
  @Input() luxImageWidth = '36px';
  @Input() luxImageHeight = '36px';

  @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('contentTemplate', this.contentTemplate);
  }
}
