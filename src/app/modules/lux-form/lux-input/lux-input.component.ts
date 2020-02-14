import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Optional, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxInputPrefixComponent } from './lux-input-subcomponents/lux-input-prefix.component';
import { LuxInputSuffixComponent } from './lux-input-subcomponents/lux-input-suffix.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormInputBaseClass } from '../lux-form-model/lux-form-input-base.class';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-input',
  templateUrl: './lux-input.component.html',
  styleUrls: ['./lux-input.component.scss']
})
export class LuxInputComponent extends LuxFormInputBaseClass {
  private readonly symbolRegExp = /[,.]/;

  @Input() luxType: string = 'text';
  @Input() luxNumberAlignLeft: boolean = false;
  @Input() luxMaxLength: number;
  @ContentChild(LuxInputPrefixComponent, { static: false }) inputPrefix: LuxInputPrefixComponent;
  @ContentChild(LuxInputSuffixComponent, { static: false }) inputSuffix: LuxInputSuffixComponent;
  @ViewChild('input', { read: ElementRef, static: false }) inputElement: ElementRef;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  /**
   * Wird bei jedem Tastendruck auf dem Inputfeld aufgerufen.
   * @param $event
   */
  onKeyDown($event: KeyboardEvent) {
    // Soll nur für number-Inputs greifen
    if (this.inputElement) {
      const value = this.inputElement.nativeElement.value;
      // Doppelte Punkt-/Komma-Setzung und E's vermeiden
      if (
        value &&
        this.symbolRegExp.test($event.key) &&
        (this.inputElement.nativeElement.value.match(this.symbolRegExp) || []).length > 0
      ) {
        $event.preventDefault();
      }
    }
  }
}
