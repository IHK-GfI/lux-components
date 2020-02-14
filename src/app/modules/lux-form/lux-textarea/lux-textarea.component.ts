import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-textarea',
  templateUrl: './lux-textarea.component.html',
  styleUrls: ['./lux-textarea.component.scss']
})
export class LuxTextareaComponent extends LuxFormInputBaseClass implements OnInit {
  @Input() luxMaxRows: number = -1;
  @Input() luxMinRows: number = 0;
  @Input() luxMaxLength: number;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
