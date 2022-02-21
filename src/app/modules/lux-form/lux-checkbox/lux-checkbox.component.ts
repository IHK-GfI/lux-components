import { ChangeDetectorRef, Component, OnInit, Optional, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormCheckableBaseClass } from '../lux-form-model/lux-form-checkable-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-checkbox',
  templateUrl: './lux-checkbox.component.html',
  styleUrls: ['./lux-checkbox.component.scss']
})
export class LuxCheckboxComponent extends LuxFormCheckableBaseClass implements OnInit {
  @Input() luxLabelLongFormat = false;
  
  constructor(
    @Optional() public controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }
}
