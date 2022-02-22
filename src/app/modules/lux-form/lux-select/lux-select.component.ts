import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  Optional,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormSelectableBase } from '../lux-form-model/lux-form-selectable-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'lux-select',
  templateUrl: './lux-select.component.html',
  styleUrls: ['./lux-select.component.scss']
})
export class LuxSelectComponent extends LuxFormSelectableBase {
  // Potentiell eingebettetes Template für Darstellung der Labels
  @ContentChild(TemplateRef) tempRef: TemplateRef<any>;
  @ViewChildren(MatOption) matOptions: QueryList<MatOption>;
  @ViewChild('select', { read: MatSelect }) matSelect: MatSelect;

  @Input() luxPlaceholder: string;
  @Input() luxMultiple = false;
  @Input() luxTagId: string;

  displayedViewValue: string;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService,
    private liveAnnouncer: LiveAnnouncer
  ) {
    super(controlContainer, cdr, logger, config);
  }

  notifyFormValueChanged(formValue: any) {
    super.notifyFormValueChanged(formValue);
    const matOption = this.matOptions.find((option: MatOption) => option.value === formValue);
    if (matOption) {
      this.displayedViewValue = matOption.viewValue;
      this.liveAnnouncer.announce(matOption.viewValue, 'assertive');
    }
  }
}
