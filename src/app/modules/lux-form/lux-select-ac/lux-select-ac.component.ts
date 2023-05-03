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
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormSelectableBase } from '../lux-form-model/lux-form-selectable-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatLegacyOption as MatOption } from '@angular/material/legacy-core';

/**
 * @param O Optionstyp (z.B Land)
 * @param V Werttyp (z.B. Land, Land[], string, string[],...)
 * @param P PickValueFn-Typ (z.B. string, number,...)
 */
@Component({
  selector: 'lux-select-ac',
  templateUrl: './lux-select-ac.component.html',
  styleUrls: ['./lux-select-ac.component.scss']
})
export class LuxSelectAcComponent<O = any, V = any, P = any> extends LuxFormSelectableBase<O,V,P> {
  // Potenziell eingebettetes Template für Darstellung der Labels
  @ContentChild(TemplateRef) tempRef?: TemplateRef<any>;
  @ViewChildren(MatOption) matOptions!: QueryList<MatOption>;
  @ViewChild('select', { read: MatSelect }) matSelect?: MatSelect;

  @Input() luxPlaceholder = '';
  @Input() luxMultiple = false;
  @Input() luxTagId?: string;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  displayedViewValue?: string;

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
