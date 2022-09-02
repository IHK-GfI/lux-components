import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigService } from '../../../lux-components-config/lux-components-config.service';
import { LuxCardComponent } from '../../../lux-layout/lux-card/lux-card.component';
import { LuxConsoleService } from '../../../lux-util/lux-console.service';
import { LuxValidationErrors } from '../../lux-form-model/lux-form-component-base.class';
import { LuxFormFileBase } from '../../lux-form-model/lux-form-file-base.class';
import { ILuxFileActionConfig } from '../lux-file-model/lux-file-action-config.interface';
import { LuxFileErrorCause } from '../lux-file-model/lux-file-error.interface';
import { ILuxFileListActionConfig, ILuxFilesListActionConfig } from '../lux-file-model/lux-file-list-action-config.interface';
import { ILuxFileObject } from '../lux-file-model/lux-file-object.interface';

@Component({
  selector: 'lux-file-list',
  templateUrl: './lux-file-list.component.html',
  styleUrls: ['./lux-file-list.component.scss']
})
export class LuxFileListComponent extends LuxFormFileBase<ILuxFileObject[] | null> implements AfterViewInit, AfterViewChecked, OnDestroy {
  private _fileEntryNodesChangeSub?: Subscription;

  fileIcons: string[] = [];

  rowWidth = 0;
  iconActionBarWidth = 50;

  @ViewChildren('fileEntry', { read: ElementRef }) fileEntries!: QueryList<ElementRef>;
  @ViewChild('fileUploadSingle', { read: ElementRef, static: true }) fileUploadSingleInput!: ElementRef;
  @ViewChild(LuxCardComponent, { read: ElementRef, static: true }) fileCard!: ElementRef;

  @Input() luxShowPreview = true;
  @Input() luxMultiple = true;
  @Input() luxHeading = 2;

  _luxUploadActionConfig: ILuxFilesListActionConfig = {
      disabled: false,
      disabledHeader: false,
      hidden: false,
      hiddenHeader: false,
      iconName: 'fas fa-cloud-upload-alt',
      iconNameHeader: 'fas fa-cloud-upload-alt',
      label: $localize`:@@luxc.file-list.upload.lbl:Hochladen`,
      labelHeader: $localize`:@@luxc.file-list.upload_title.lbl:Neue Dateien hochladen`
  }
  _luxDeleteActionConfig: ILuxFileListActionConfig = {
    disabled: false,
    disabledHeader: false,
    hidden: false,
    hiddenHeader: false,
    iconName: 'fas fa-trash',
    iconNameHeader: 'fas fa-trash',
    label: $localize`:@@luxc.file-list.delete.lbl:Löschen`,
    labelHeader: $localize`:@@luxc.file-list.delete_title.lbl:Alle Dateien entfernen`
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

  get luxUploadActionConfig(): ILuxFilesListActionConfig {
    return this._luxUploadActionConfig;
  }

  @Input() set luxUploadActionConfig(config: ILuxFilesListActionConfig) {
    if (config) {
      this._luxUploadActionConfig = config;
    }
  }

  get luxDeleteActionConfig(): ILuxFileListActionConfig {
    return this._luxDeleteActionConfig;
  }

  @Input() set luxDeleteActionConfig(config: ILuxFileListActionConfig) {
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
    this._fileEntryNodesChangeSub = this.fileEntries.changes.subscribe(() => {
      this.updateIconAndImage();
    });

    this.updateIconAndImage();
  }

  private updateIconAndImage() {
    this.setFileIcons();

    if (this.luxShowPreview) {
      this.setImgSrc();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this._fileEntryNodesChangeSub) {
      this._fileEntryNodesChangeSub.unsubscribe();
    }
  }

  shouldDisplayPreviewImg(index: number): boolean {
    return this.luxShowPreview && this.fileIcons && !!this.fileIcons[index] && this.fileIcons[index] === 'fas fa-file-image';
  }

  /**
   * Entfernt eine Datei aus den selektierten Dateien.
   *
   * @param index
   */
  removeFile(index: number) {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();

    // Wenn mehrere Dateien selektiert sind, diese nach der entfernten Datei filtern ansonsten "null" nutzen
    const newFiles = Array.isArray(this.luxSelected)
      ? this.luxSelected.filter((file, searchIndex) => searchIndex !== index)
      : null;

    // Via LiveAnnouncer mitteilen welche Datei entfernt wird
    const deletedFile = this.luxSelected![index];
    this.announceFileRemove(deletedFile.name);

    // Wir entfernen hier nur eine Datei, deshalb ist das neue Auslesen der Base64-Strings nicht nötig
    this.uploadFiles(newFiles).then(
      () => {
        this.luxSelected = newFiles;
        this.notifyFormValueChanged();
      },
      (error) => this.setFormControlErrors(error)
    );
    if (this.luxDeleteActionConfig.onClick) {
      this.luxDeleteActionConfig.onClick(deletedFile);
    }
  }

  onSelectFiles(target: EventTarget | null) {
    const fileList = target ? (target as HTMLInputElement).files : null;
    this.selectFiles(fileList ? Array.from(fileList) : []);
  }

  resetSelected() {
    this.luxSelected = [];
  }

  handleViewFileClick(file: ILuxFileObject) {
    if (file.content && this.luxViewActionConfig.onClick) {
      this.luxViewActionConfig.onClick(file);
      this.updateIconAndImage();
    }
  }

  handleDownloadClick(file: ILuxFileObject) {
    if (this.luxDownloadActionConfig.onClick) {
      this.luxDownloadActionConfig.onClick(file);
    }
  }

  handleUploadClick(files: ILuxFileObject[]) {
    if (this.luxUploadActionConfig.onClick) {
      this.luxUploadActionConfig.onClick(files);
    }
  }

  /**
   * Entfernt die aktuell selektierten Dateien und entfernt etwaige (spezifische) Fehler aus dem FormControl.
   *
   * @param event
   */
  clearFiles(event?: Event) {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();

    const deletedFiles = this.luxSelected;

    this.resetSelected();
    this.notifyFormValueChanged();
    this.clearFormControlErrors();
      if (deletedFiles) {
        deletedFiles.forEach((file) => {
          if (this.luxDeleteActionConfig.onClick) {
            this.luxDeleteActionConfig.onClick(file);
          }
        });
    }

    this.announceAllFilesRemove();
  }

  /**
   * Fügt weitere Dateien zu den bereits vorhandenen hinzu bzw. ersetzt diese.
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
      // Prüfen, ob die Dateien bereits vorhanden sind
      let selectedFilesArray: ILuxFileObject[] = [];
      const replaceableFilesMap = new Map<number, File>();
      if (this.luxSelected) {
        files = Array.from(files);
        selectedFilesArray = Array.isArray(this.luxSelected) ? this.luxSelected : [this.luxSelected];
        // zu ersetzende Indizes herausfinden
        files.forEach((file: File) => {
          const index = selectedFilesArray.findIndex((compareFile: ILuxFileObject) => compareFile.name === file.name);
          if (index > -1) {
            replaceableFilesMap.set(index, file);
          }
        });
      }

      // Wenn mehrere Dateien selektiert sind und luxMultiple dies unterbindet, Fehler werfen und Fn beenden
      // Ausnahme ist, wenn die Dateien nur ersetzt werden sollen
      const fileCount = (this.luxSelected ? this.luxSelected.length : 0) + (files ? files.length : 0) - replaceableFilesMap.size;
      if (!this.luxMultiple && fileCount > 1) {
        this.setFormControlErrors({
          cause: LuxFileErrorCause.MultipleForbidden,
          exception: this.getMultipleForbiddenMessage(),
          file: undefined
        });
        return;
      }

      this.updateSelectedFiles(files).then(
        (newFiles: ILuxFileObject[]) => {
          const tempSelectedFiles: ILuxFileObject[] = selectedFilesArray;

          // die zu ersetzenden Dateien durchgehen und aktualisieren
          replaceableFilesMap.forEach((file: File, index: number) => {
            const replaceableFileObject = newFiles.find((newFile: ILuxFileObject) => newFile.name === file.name);
            // das gefundene Objekt aus den newFiles entfernen
            newFiles = newFiles.filter((newFile) => newFile !== replaceableFileObject);
            // die selectedFiles aktualisieren
            tempSelectedFiles[index] = replaceableFileObject!;
          });
          // die übrigen neuen Dateien anfügen
          tempSelectedFiles.push(...newFiles);

          this.luxSelected = tempSelectedFiles;
          this.notifyFormValueChanged();
        },
        (error) => this.setFormControlErrors(error)
      );
    }, this.defaultReadFileDelay);
  }

  /**
   * Aktualisiert die Preview-Bilder für die (Image-)Dateien.
   *
   * Aktualisierung absichtlich via Funktion und nicht Property-Binding, da potenziell Stack-Size Fehler auftreten,
   * wenn (große) Base64-Strings gegen die src gebunden werden.
   */
  private setImgSrc() {
    this.fileEntries.forEach((item: ElementRef, index: number) => {
      const imgElement: HTMLImageElement | null = (item.nativeElement as HTMLElement).querySelector('img');
      if (imgElement && this.luxSelected) {
        const targetFileContent = this.luxSelected[index].content;
        if (targetFileContent instanceof Blob) {
          this.readFile(targetFileContent as File).then((content: any) => {
            imgElement.src = content;
          });
        } else {
          imgElement.src = targetFileContent as string;
        }
      }
    });
  }

  /**
   * Setzt die Icons für die Elemente in der Auflistung
   */
  private setFileIcons() {
    if (!this.luxSelected) {
      return;
    }

    this.fileIcons = [];
    const selectedFiles = [];

    if (!Array.isArray(this.luxSelected)) {
      selectedFiles.push(this.luxSelected);
    } else {
      selectedFiles.push(...this.luxSelected);
    }
    selectedFiles.forEach((selectedFile: ILuxFileObject) => {
      let newFileIcon = 'fas fa-file';
      if (selectedFile.type) {
        if (selectedFile.type.indexOf('image') > -1) {
          newFileIcon = 'fas fa-file-image';
        } else if (selectedFile.type.indexOf('pdf') > -1) {
          newFileIcon = 'fas fa-file-pdf';
        } else if (selectedFile.type.indexOf('spreadsheet') > -1) {
          newFileIcon = 'fas fa-file-excel';
        } else if (selectedFile.type.indexOf('officedocument') > -1) {
          newFileIcon = 'fas fa-file-signature';
        } else if (selectedFile.type.indexOf('json') > -1) {
          newFileIcon = 'fas fa-file-code';
        }
      }
      this.fileIcons.push(newFileIcon);
    });
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.resizeIconActionBar();
  }

  isArray(object: any): boolean {
    return object && Array.isArray(object);
  }

  private resizeIconActionBar() {
    if (this.fileEntries && this.fileEntries.first && this.cdr) {
      const newRowWidth = this.fileEntries.first.nativeElement.offsetWidth;
      if (this.rowWidth !== newRowWidth) {
        let buttonCount = 0;
        if (this._luxViewActionConfig && !this._luxViewActionConfig.hidden) {
          buttonCount++;
        }
        if (this._luxDownloadActionConfig && !this._luxDownloadActionConfig.hidden) {
          buttonCount++;
        }
        if (this._luxUploadActionConfig && !this._luxUploadActionConfig.hidden) {
          buttonCount++;
        }
        if (this._luxDeleteActionConfig && !this._luxDeleteActionConfig.hidden) {
          buttonCount++;
        }
        if (this._luxCustomActionConfigs) {
          buttonCount += this._luxCustomActionConfigs.length;
        }

        this.rowWidth = newRowWidth;
        if (this.rowWidth >= 900) {
          this.iconActionBarWidth = Math.min(400, buttonCount * 50);
        } else if (this.rowWidth >= 800) {
          this.iconActionBarWidth = Math.min(350, buttonCount * 50);
        } else if (this.rowWidth >= 700) {
          this.iconActionBarWidth = Math.min(300, buttonCount * 50);
        } else if (this.rowWidth >= 600) {
          this.iconActionBarWidth = Math.min(250, buttonCount * 50);
        } else if (this.rowWidth >= 500) {
          this.iconActionBarWidth = Math.min(200, buttonCount * 50);
        } else if (this.rowWidth >= 400) {
          this.iconActionBarWidth = Math.min(150, buttonCount * 50);
        } else {
          this.iconActionBarWidth = 50;
        }

        this.cdr.detectChanges();
      }
    }
  }

  protected errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    if (errors.required) {
      return $localize`:@@luxc.file-list.error_message.required:Es muss eine Datei ausgewählt werden`;
    }
    return super.errorMessageModifier(value, errors);
  }

  protected notifyFormValueChanged() {
    super.notifyFormValueChanged();
    this.formControl.updateValueAndValidity();

    this.fileUploadSingleInput.nativeElement.value = null;
  }
}
