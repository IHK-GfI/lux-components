import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormCheckableBaseClass } from '../lux-form-model/lux-form-checkable-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-toggle',
  templateUrl: './lux-toggle.component.html',
  styleUrls: ['./lux-toggle.component.scss']
})
export class LuxToggleComponent<T = boolean> extends LuxFormCheckableBaseClass<T> implements OnInit {

  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }
}
