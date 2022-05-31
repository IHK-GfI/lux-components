import { ConsoleLogger } from '@angular/compiler-cli/ngcc';
import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormCheckableBaseClass } from '../lux-form-model/lux-form-checkable-base.class';

@Component({
  selector: 'lux-checkbox-ac',
  templateUrl: './lux-checkbox-ac.component.html',
  styleUrls: ['./lux-checkbox-ac.component.scss']
})
export class LuxCheckboxAcComponent extends LuxFormCheckableBaseClass implements OnInit {
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;
  
  constructor(
    @Optional() public controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

}
