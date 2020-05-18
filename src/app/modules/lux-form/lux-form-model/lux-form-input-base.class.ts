import { LuxFormComponentBase } from './lux-form-component-base.class';
import {ChangeDetectorRef, Directive, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

/**
 * Basis-Klasse für FormComponents, die einen ähnlichen Grundaufbau für das Eintippen von String-Daten haben
 * (Input und Textarea z.B.).
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxFormInputBaseClass extends LuxFormComponentBase {
  @Output() luxValueChange: EventEmitter<string> = new EventEmitter();
  @Output() luxBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxFocus: EventEmitter<any> = new EventEmitter<any>();

  @Input() luxPlaceholder: string = '';
  @Input() luxReadonly: boolean;
  @Input() luxTagId: string;
  @Input() luxName: string;
  @Input() luxAutocomplete: string = 'on';

  get luxValue(): string {
    return this.getValue();
  }

  @Input() set luxValue(value: string) {
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

  protected triggerOutputPatternCheck() {
    this.checkOutputPatternViolation(this.luxValueChange.observers);
  }

  protected triggerInputPatternCheck(simpleChanges: SimpleChanges) {
    this.checkInputPatternViolation(simpleChanges.luxValue);
  }

  // endregion
}
