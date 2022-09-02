import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigService } from '../../../lux-components-config/lux-components-config.service';
import { ILuxDialogConfig } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-config.interface';
import { LuxDialogService } from '../../../lux-popups/lux-dialog/lux-dialog.service';
import { LuxConsoleService } from '../../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../../lux-util/lux-util';
import { LuxFormFileBase } from '../../lux-form-model/lux-form-file-base.class';
import { ILuxFileActionConfig, ILuxFilesActionConfig } from '../lux-file-model/lux-file-action-config.interface';
import { LuxFileErrorCause } from '../lux-file-model/lux-file-error.interface';
import { ILuxFilesListActionConfig } from '../lux-file-model/lux-file-list-action-config.interface';
import { ILuxFileObject } from '../lux-file-model/lux-file-object.interface';
import { LuxFileDeleteDialogComponent } from '../lux-file-subcomponents/lux-file-delete-dialog/lux-file-delete-dialog.component';
import { LuxFileReplaceDialogComponent } from '../lux-file-subcomponents/lux-file-replace-dialog/lux-file-replace-dialog.component';

@Component({
  selector: 'lux-file-upload',
  templateUrl: './lux-file-upload.component.html',
  styleUrls: ['./lux-file-upload.component.scss']
})
export class LuxFileUploadComponent extends LuxFormFileBase<ILuxFileObject[] | null> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fileUpload', { read: ElementRef, static: true }) fileUploadInput!: ElementRef;
  @ViewChildren('fileEntry', { read: ElementRef }) fileEntries!: QueryList<ElementRef>;

  @Input() luxLabel = $localize`:@@luxc.file.upload.label:Zum Hochladen Datei hier ablegen oder `;
  @Input() luxLabelLink = $localize`:@@luxc.file.upload.label.link:Datei durchsuchen`;
  @Input() luxLabelLinkShort = $localize`:@@luxc.file.upload.label.link.short:Datei hochladen`;
  @Input() luxMultiple = true;
  @Input() luxUploadIcon = 'fas fa-cloud-upload-alt';
  @Input() luxDeleteIcon = 'fas fa-trash';

  get luxUploadActionConfig(): ILuxFilesActionConfig {
    return this._luxUploadActionConfig;
  }

  @Input() set luxUploadActionConfig(config: ILuxFilesActionConfig) {
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

  _luxUploadActionConfig: ILuxFilesActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-cloud-upload-alt',
    label: $localize`:@@luxc.file-list.upload.lbl:Hochladen`,
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

  subscriptions: Subscription[] = [];
  fileIcons: string[] = [];
  Math = Math;
  isMobile = false;

  dialogDeleteConfig: ILuxDialogConfig = {
    disableClose: false,
    width: 'auto',
    height: 'auto',
    panelClass: ['file-dialog', 'file-delete-dialog']
  };

  dialogReplaceConfig: ILuxDialogConfig = {
    disableClose: false,
    width: 'auto',
    height: 'auto',
    panelClass: ['file-dialog', 'file-replace-dialog']
  };

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    http: HttpClient,
    liveAnnouncer: LiveAnnouncer,
    config: LuxComponentsConfigService,
    private dialogService: LuxDialogService,
    private queryService: LuxMediaQueryObserverService
  ) {
    super(controlContainer, cdr, logger, config, http, liveAnnouncer);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.queryService.getMediaQueryChangedAsObservable().subscribe((query) => {
        this.isMobile = query === 'xs' || query === 'sm';
      })
    );

    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.fileEntries.changes.subscribe(() => {
        this.setFileIcons(this.formControl.value);
      })
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  useArray(): boolean {
    return true;
  }

  protected notifyFormValueChanged() {
    super.notifyFormValueChanged();
    this.formControl.updateValueAndValidity();
  }

  resetSelected() {
    this.luxSelected = [];
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
      this.luxUploadActionConfig.onClick(files);
    }
  }

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

      if (this.luxMultiple) {
        if (replaceableFilesMap.size > 0) {
          this.dialogService.storeDialogRef();
          const dialogRef = this.dialogService.openComponent(LuxFileReplaceDialogComponent, this.dialogReplaceConfig, {
            multiple: this.luxMultiple
          });
          this.forceProgressIndeterminate = false;

          dialogRef.dialogConfirmed.subscribe(() => {
            this.updateFilesIntern(files, selectedFilesArray, replaceableFilesMap);
          });

          dialogRef.dialogDeclined.subscribe(() => {
            this.fileUploadInput.nativeElement.value = '';
          });

          dialogRef.dialogClosed.subscribe(() => {
            this.fileUploadInput.nativeElement.value = '';

            this.subscriptions.push(dialogRef.dialogClosed.subscribe(() => {
              this.dialogService.restoreDialogRef();
            }));
          });
        } else {
          this.updateFilesIntern(files, selectedFilesArray, replaceableFilesMap);
        }
      } else {
        if (files.length > 1) {
          this.setFormControlErrors({
            cause: LuxFileErrorCause.MultipleForbidden,
            exception: this.getMultipleForbiddenMessage(),
            file: undefined
          });

          return;
        } else if (files.length === 1 && (!this.luxSelected || this.luxSelected.length === 0)) {
          this.updateSelectedFiles(files).then(
            (newFiles: ILuxFileObject[]) => {
              this.luxSelected = newFiles;
              this.notifyFormValueChanged();
              this.fileUploadInput.nativeElement.value = '';
            },
            (error) => this.setFormControlErrors(error)
          );
        } else if (files.length === 1 && this.luxSelected && this.luxSelected.length > 0) {
          this.dialogService.storeDialogRef();
          const dialogRef = this.dialogService.openComponent(LuxFileReplaceDialogComponent, this.dialogReplaceConfig, {
            multiple: this.luxMultiple
          });
          this.forceProgressIndeterminate = false;

          dialogRef.dialogConfirmed.subscribe(() => {
            this.updateSelectedFiles(files).then(
              (newFiles: ILuxFileObject[]) => {
                this.luxSelected = newFiles;
                this.notifyFormValueChanged();
                this.fileUploadInput.nativeElement.value = '';
              },
              (error) => this.setFormControlErrors(error)
            );
          });

          dialogRef.dialogDeclined.subscribe(() => {
            this.fileUploadInput.nativeElement.value = '';
          });

          dialogRef.dialogClosed.subscribe(() => {
            this.fileUploadInput.nativeElement.value = '';

            this.subscriptions.push(dialogRef.dialogClosed.subscribe(() => {
              this.dialogService.restoreDialogRef();
            }));
          });
        }
      }
    }, this.defaultReadFileDelay);
  }

  private updateFilesIntern(files: FileList | File[], selectedFilesArray: any[], replaceableFilesMap: Map<number, File>) {
    this.updateSelectedFiles(files).then(
      (newFiles: ILuxFileObject[]) => {
        const tempSelectedFiles = selectedFilesArray;

        // die zu ersetzenden Dateien durchgehen und aktualisieren
        replaceableFilesMap.forEach((file: File, index: number) => {
          const replaceableFileObject = newFiles.find((newFile: ILuxFileObject) => newFile.name === file.name);
          // das gefundene Objekt aus den newFiles entfernen
          newFiles = newFiles.filter((newFile) => newFile !== replaceableFileObject);
          // die selectedFiles aktualisieren
          tempSelectedFiles[index] = replaceableFileObject;
        });
        // die übrigen neuen Dateien anfügen
        tempSelectedFiles.push(...newFiles);

        this.luxSelected =
          tempSelectedFiles && tempSelectedFiles.length === 1 && !this.useArray()
            ? tempSelectedFiles[0]
            : tempSelectedFiles;
        this.notifyFormValueChanged();
        this.fileUploadInput.nativeElement.value = '';
      },
      (error) => this.setFormControlErrors(error)
    );
  }

  onSelectFiles(target: EventTarget | null) {
    const fileList = target ? (target as HTMLInputElement).files : null;
    this.selectFiles(fileList ? Array.from(fileList) : []);
  }

  onUpload() {
    if (!this.luxDisabled && !this.luxReadonly) {
      this.fileUploadInput.nativeElement.click();
    }
  }

  onCloseErrorMessage() {
    this.errorMessage = undefined;
    this.formControl.updateValueAndValidity();
  }

  onRemoveFile(index: number) {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();

    // Wenn mehrere Dateien selektiert sind, diese nach der entfernten Datei filtern ansonsten "undefined" nutzen
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

  openDeleteDialog(index: number) {
    this.dialogService.storeDialogRef();
    const dialogRef = this.dialogService.openComponent(LuxFileDeleteDialogComponent, this.dialogDeleteConfig);

    this.subscriptions.push(dialogRef.dialogClosed.subscribe(() => {
      this.dialogService.restoreDialogRef();
    }));

    this.subscriptions.push(dialogRef.dialogConfirmed.subscribe(() => {
      this.onRemoveFile(index);
    }));
  }

  /**
   * Setzt die Icons für die Elemente in der Auflistung
   *
   * @param files
   */
  private setFileIcons(files: ILuxFileObject | ILuxFileObject[] | null) {
    this.fileIcons = [];

    if (!files) {
      return;
    }

    const selectedFiles = [];
    if (!Array.isArray(files)) {
      selectedFiles.push(files);
    } else {
      selectedFiles.push(...files);
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

  protected getMaxSizeErrorMessage(file: File): string {
    return $localize`:@@luxc.file.upload.error_message.max_file_size:Die Datei "${file.name}" überschreitet die maximal zulässige Dateigröße von ${this.luxMaxSizeMB} Megabytes.`;
  }

  protected getFileNotAcceptedMessage(file: File): string {
    return $localize`:@@luxc.file.upload.error_message.not_accepted:Die Datei "${
      file.name
    }" entspricht keinem akzeptierten Dateityp. Es sind nur Dateien vom Typ ${LuxUtil.getAcceptTypesAsMessagePart(
      this.luxAccept
    )} erlaubt.`;
  }

  protected getMultipleForbiddenMessage(): string {
    return $localize`:@@luxc.file.upload.error_message.only_one_file:Es darf nur eine Datei hochgeladen werden.`;
  }

  protected getReadingFileErrorMessage(file: File): string {
    return $localize`:@@luxc.file.upload.error_message.read_error:Beim Hochladen der ausgewählten Datei ist ein Fehler aufgetreten. Bitte versuchen Sie es noch einmal.`;
  }

  protected getUploadFileErrorMessage(files: File[]): string {
    return $localize`:@@luxc.file.upload.error_message.upload_error:Beim Hochladen der ausgewählten Datei ist ein Fehler aufgetreten. Bitte versuchen Sie es noch einmal.`;
  }
}
