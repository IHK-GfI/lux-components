import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxConsoleService } from '../../../lux-util/lux-console.service';
import { LuxFormFileBase } from '../../lux-form-model/lux-form-file-base.class';
import { ILuxFileError } from '../lux-file-model/lux-file-error.interface';
import { ILuxFileObject } from '../lux-file-model/lux-file-object.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { LuxComponentsConfigService } from '../../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-file-input',
  templateUrl: './lux-file-input.component.html',
  styleUrls: ['./lux-file-input.component.scss']
})
export class LuxFileInputComponent extends LuxFormFileBase {
  @ViewChild('visibleInput', { read: ElementRef }) visibleInput: ElementRef;

  @Output() luxBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() luxFocus: EventEmitter<any> = new EventEmitter<any>();

  @Input() luxPlaceholder = '';
  @Input() luxClearOnError = true;
  @Input() luxLabelLongFormat = false;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    http: HttpClient,
    liveAnnouncer: LiveAnnouncer,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config, http, liveAnnouncer);
  }

  /**
   * Wird bei der Auswahl von Dateien (Dialog oder DnD) aufgerufen.
   * Aktualisiert die aktuell selektierten Dateien, stößt einen Upload an, handelt Fehlermeldungen und
   * emittet die entspechenden Events.
   *
   * @param files
   */
  selectFiles(files: File[]) {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
    this.forceProgressIndeterminate = true;
    this.announceFileProcess(files && files.length > 1);

    if (!files || files.length === 0) {
      this.forceProgressIndeterminate = false;
      return;
    }

    // Timeout, um Flackern durch Progress zu vermeiden
    setTimeout(() => {
      this.updateSelectedFiles(files).then(
        (newFiles: ILuxFileObject[]) => {
          this.luxSelectedFiles = newFiles[0];
          this.notifyFormValueChanged();
        },
        error => this.setFormControlErrors(error)
      );
    }, this.defaultReadFileDelay);
  }

  // region Overridden methods

  protected errorMessageModifier(value: any, errors: any): string | undefined {
    if (errors.required) {
      return $localize `:@@luxc.file-input.error_message.required:Es muss eine Datei ausgewählt werden`;
    }
    return super.errorMessageModifier(value, errors);
  }

  protected setFormControlErrors(error: ILuxFileError) {
    if (this.luxClearOnError) {
      this.luxSelectedFiles = undefined;
    }

    super.setFormControlErrors(error);
  }

  // endregion
}
