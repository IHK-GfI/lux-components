import { AfterViewInit, ChangeDetectionStrategy, Component, Host, Input, Optional, SkipSelf, ViewChild } from '@angular/core';
import { LuxPanelComponent } from '../../../../modules/lux-layout/lux-panel/lux-panel.component';
import { logResult } from 'src/app/demo/example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-custom-panel',
  templateUrl: './custom-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPanelComponent extends LuxPanelComponent implements AfterViewInit {
  @Input() showOutputEvents = false;

  log = logResult;

  @ViewChild(LuxPanelComponent, { static: true }) luxPanel!: LuxPanelComponent;

  protected getMatExpansionPanel() {
    return this.luxPanel.matExpansionPanel;
  }
}
