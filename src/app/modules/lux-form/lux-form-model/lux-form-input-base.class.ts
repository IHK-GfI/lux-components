import { LuxFormComponentBase } from './lux-form-component-base.class';
import {ChangeDetectorRef, Directive, EventEmitter, Input, Output} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für das Eintippen von String-Daten haben
 * (Input und Textarea z.B.).
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormInputBaseClass extends LuxFormComponentBase {
  @Output() luxValueChange: EventEmitter<any> = new EventEmitter();
  @Output() luxBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxFocus: EventEmitter<any> = new EventEmitter<any>();

  @Input() luxPlaceholder = '';
  @Input() luxTagId: string;
  @Input() luxName: string;
  @Input() luxAutocomplete = 'on';

  get luxValue(): any {
    return this.getValue();
  }

  @Input() set luxValue(value: any) {
    this.setValue(value);
  }

  protected constructor(
    controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  // region Overridden methods

  notifyFormValueChanged(formValue: any) {
    // Aktualisierungen an dem FormControl-Value sollen auch via EventEmitter bekannt gemacht werden
    this.luxValueChange.emit(formValue);
  }

  // endregion
}
