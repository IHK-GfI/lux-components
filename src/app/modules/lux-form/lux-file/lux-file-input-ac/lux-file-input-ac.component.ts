import {
  AfterViewInit,
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
import { LuxUtil } from '../../../lux-util/lux-util';
import { LuxValidationErrors } from '../../lux-form-model/lux-form-component-base.class';
import { LuxFormFileBase } from '../../lux-form-model/lux-form-file-base.class';
import { ILuxFileActionConfig } from '../lux-file-model/lux-file-action-config.interface';
import { ILuxFileError } from '../lux-file-model/lux-file-error.interface';
import { ILuxFileObject } from '../lux-file-model/lux-file-object.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { LuxComponentsConfigService } from '../../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-file-input-ac',
  templateUrl: './lux-file-input-ac.component.html',
  styleUrls: ['./lux-file-input-ac.component.scss']
})
export class LuxFileInputAcComponent extends LuxFormFileBase<ILuxFileObject | null> implements AfterViewInit {
  @ViewChild('visibleInput', { read: ElementRef }) visibleInput!: ElementRef;

  @Output() luxBlur = new EventEmitter<FocusEvent>();
  @Output() luxFocus = new EventEmitter<FocusEvent>();

  @Input() luxPlaceholder = '';
  @Input() luxClearOnError = true;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  _luxUploadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-cloud-upload-alt',
    label: $localize`:@@luxc.form-file-base.upload.action.lbl:Hochladen`
  }
  _luxDeleteActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-trash',
    label: $localize`:@@luxc.form-file-base.delete.action.lbl:Löschen`
  };
  _luxViewActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: true,
    iconName: 'fas fa-eye',
    label: $localize`:@@luxc.form-file-base.view.action.lbl:Ansehen`
  };
  _luxDownloadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: true,
    iconName: 'fas fa-download',
    label: $localize`:@@luxc.form-file-base.download.action.lbl:Download`
  };

  get luxUploadActionConfig(): ILuxFileActionConfig {
    return this._luxUploadActionConfig;
  }

  @Input() set luxUploadActionConfig(config: ILuxFileActionConfig) {
    if (config) {
      this._luxUploadActionConfig = config;
    }
  }

  get luxDeleteActionConfig(): ILuxFileActionConfig {
    return this._luxDeleteActionConfig;
  }

  @Input() set luxDeleteActionConfig(config: ILuxFileActionConfig) {
    if (config) {
      this._luxDeleteActionConfig = config;
    }
  }

  get luxViewActionConfig(): ILuxFileActionConfig {
    return this._luxViewActionConfig;
  }

  @Input() set luxViewActionConfig(config: ILuxFileActionConfig) {
    if (config) {
      this._luxViewActionConfig = config;
    }
  }

  get luxDownloadActionConfig(): ILuxFileActionConfig {
    return this._luxDownloadActionConfig;
  }

  @Input() set luxDownloadActionConfig(config: ILuxFileActionConfig) {
    if (config) {
      this._luxDownloadActionConfig = config;
    }
  }

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

  ngAfterViewInit() {
    LuxUtil.assertNonNull('visibleInput', this.visibleInput);
  }

  onSelectFiles(target: EventTarget | null) {
    const fileList = target ? (target as HTMLInputElement).files : null;
    this.selectFiles(fileList ? Array.from(fileList) : []);
  }

  clearFile() {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();

    const deletedFile = this.luxSelected;

    this.resetSelected();
    this.notifyFormValueChanged();
    this.clearFormControlErrors();
    if (deletedFile && this.luxDeleteActionConfig.onClick) {
      this.luxDeleteActionConfig.onClick(deletedFile);
      this.announceFileRemove(deletedFile.name);
    }
  }

  resetSelected() {
    this.luxSelected = null;
  }

  handleViewFileClick(file: ILuxFileObject) {
    if (file.content && this.luxViewActionConfig.onClick) {
      this.luxViewActionConfig.onClick(file);
    }
  }

  handleDownloadClick(file: ILuxFileObject) {
    if (this.luxDownloadActionConfig.onClick) {
      this.luxDownloadActionConfig.onClick(file);
    }
  }

  handleUploadClick(files: ILuxFileObject[]) {
    if (this.luxUploadActionConfig.onClick) {
      this.luxUploadActionConfig.onClick(files[ 0 ]);
    }
  }

  /**
   * Wird bei der Auswahl von Dateien (Dialog oder DnD) aufgerufen.
   * Aktualisiert die aktuell selektierten Dateien, stößt einen Upload an, handelt Fehlermeldungen und
   * emittet die entsprechenden Events.
   *
   * @param files
   */
  selectFiles(files: FileList | File[]) {
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
          this.luxSelected = newFiles[0];
          this.notifyFormValueChanged();
        },
        error => this.setFormControlErrors(error)
      );
    }, this.defaultReadFileDelay);
  }

  protected errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    if (errors.required) {
      return $localize `:@@luxc.file-input.error_message.required:Es muss eine Datei ausgewählt werden`;
    }
    return super.errorMessageModifier(value, errors);
  }

  protected setFormControlErrors(error: ILuxFileError) {
    if (this.luxClearOnError) {
      this.luxSelected = null;
    }

    super.setFormControlErrors(error);
  }

}
