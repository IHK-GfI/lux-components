import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Optional,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlContainer, ValidatorFn, Validators } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxFormComponentBase } from './lux-form-component-base.class';
import { ILuxFileError, LuxFileErrorCause } from '../lux-file/lux-file-model/lux-file-error.interface';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ILuxFileActionConfig } from '../lux-file/lux-file-model/lux-file-action-config.interface';
import { isObservable, Observable, throwError } from 'rxjs';
import { ILuxFileObject } from '../lux-file/lux-file-model/lux-file-object.interface';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export abstract class LuxFormFileBase extends LuxFormComponentBase {
  defaultReadFileDelay: number = 1000;

  private _luxAccept: string = '';
  private _luxSelectedFiles: ILuxFileObject[];

  protected _luxUploadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-cloud-upload-alt',
    label: 'Hochladen'
  };
  protected _luxDeleteActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-trash',
    label: 'Löschen'
  };
  protected _luxViewActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: true,
    iconName: 'fas fa-eye',
    label: 'Ansehen'
  };
  protected _luxDownloadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: true,
    iconName: 'fas fa-download',
    label: 'Download'
  };

  progress: number = -1;
  forceProgressIndeterminate: boolean = false;

  @ViewChild('downloadLink', { read: ElementRef, static: true }) downloadLink: ElementRef;
  @ViewChild('fileupload', { read: ElementRef, static: true }) fileuploadInput: ElementRef;

  @Output() luxSelectedFilesChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() luxUploadReportProgress: boolean = false;
  @Input() luxContentsAsBlob: boolean = false;
  @Input() luxTagId: string;
  @Input() luxMaxSizeMB: number = 10;
  @Input() luxCapture: string = '';
  @Input() luxUploadUrl: string = '';
  @Input() luxDnDActive: boolean = true;

  @HostBinding('class.lux-file-highlight') isDragActive: boolean = false;

  @HostListener('dragover', ['$event']) onDragOver($event) {
    if (this.isDnDAllowed()) {
      this.handleDragOver($event);
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event) {
    if (this.isDnDAllowed()) {
      this.handleDragLeave($event);
    }
  }

  @HostListener('drop', ['$event']) onDrop($event) {
    if (this.isDnDAllowed()) {
      this.handleDrop($event);
    }
  }

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

  get luxSelectedFiles(): any {
    return this.getValue();
  }

  @Input() set luxSelectedFiles(selectedFiles: any) {
    this.setValue(selectedFiles);
  }

  get luxAccept(): any {
    return this._luxAccept;
  }

  @Input() set luxAccept(accepts: any) {
    if (!accepts) {
      accepts = '';
    }
    this._luxAccept = Array.isArray(accepts) ? accepts.join(',') : accepts;
  }

  get progressMode(): string {
    return (this.progress === 0 && !this.luxUploadReportProgress) || this.forceProgressIndeterminate
      ? 'indeterminate'
      : 'determinate';
  }

  get isProgressVisible(): boolean {
    return this.progress >= 0 || this.forceProgressIndeterminate;
  }

  protected constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService,
    protected http: HttpClient,
    private liveAnnouncer: LiveAnnouncer
  ) {
    super(controlContainer, cdr, logger, config);
  }

  /**
   * Wird beim Fokussieren des Elements aufgerufen und markiert das FormControl als "touched".
   * @param $event
   */
  onFocusIn($event) {
    this.formControl.markAsTouched();
    this.luxFocusIn.emit($event);
  }

  /**
   * Entfernt die aktuell selektierten Dateien und entfernt etwaige (spezifische) Fehler aus dem FormControl.
   * @param $event
   */
  clearFiles($event?) {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();

    this.luxSelectedFiles = undefined;
    this.notifyFormValueChanged();
    this.clearFormControlErrors();
    if (this.luxDeleteActionConfig.onClick) {
      this.luxDeleteActionConfig.onClick();
    }

    this.announceAllFilesRemove();
  }

  /**
   * Löst den Download der übergebenen Datei aus.
   * @param file
   */
  downloadFile(file: ILuxFileObject | ILuxFileObject[]) {
    this.formControl.markAsTouched();
    file = Array.isArray(file) ? file[0] : file;
    const downloadLink = <HTMLAnchorElement>this.downloadLink.nativeElement;
    downloadLink.download = file.name;

    if (file.content instanceof Blob) {
      if (window.navigator.msSaveBlob) {
        // IE
        window.navigator.msSaveOrOpenBlob(file.content, file.name);
      } else {
        const url = window.URL.createObjectURL(file.content);
        downloadLink.href = url;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
      }
    } else {
      if (window.navigator.msSaveBlob) {
        // IE
        try {
          const arrBuffer = LuxUtil.base64ToArrayBuffer(file.content.split(',')[1]);
          window.navigator.msSaveOrOpenBlob(new Blob([arrBuffer], { type: file.type }), file.name);
        } catch (e) {
          console.log(e);
        }
      } else {
        downloadLink.href = file.content;
        downloadLink.click();
      }
    }

    if (this.luxDownloadActionConfig.onClick) {
      this.luxDownloadActionConfig.onClick(file);
    }
  }

  /**
   * Löst den base64Callback der übergebenen Datei aus.
   * Schreibt dann anschließend den Base64-String in die Datei.
   * @param file
   */
  viewFile(file: ILuxFileObject) {
    this.formControl.markAsTouched();
    // Wenn die Datei bereits einen Base64-Wert besitzt, den onClick-Callback ausführen
    if (file.content) {
      this.triggerViewFileClick(file);
      return;
    }
    const callbackResult = file.contentCallback();
    // Wenn der Callback ein Observable ist, dieses auflösen und dem File-Base64 zuweisen
    if (isObservable(callbackResult)) {
      (<Observable<string>>callbackResult).subscribe((content: any) => {
        file.content = content;
        this.triggerViewFileClick(file);
      });
    } else {
      // Wenn der Callback ein normaler String oder Promise ist, diesen auflösen und den File-Base64 aktualisieren
      Promise.resolve(<any>callbackResult).then((content: any) => {
        file.content = content;
        this.triggerViewFileClick(file);
      });
    }
  }

  /**
   * Wandelt File-Objekt zu LuxFileObjects um und versucht diese Hochzuladen.
   * Gibt ein Promise mit den neuen FileObjects zurück bzw. einen Fehler aus den internen Promises.
   * @param files
   */
  async updateSelectedFiles(files: FileList | File[]) {
    try {
      let newFiles = [];
      await this.mapFilesToFileObjects(files).then((fileObjects: ILuxFileObject[]) => (newFiles = fileObjects));
      await this.uploadFiles(newFiles);
      if (this.luxUploadActionConfig.onClick) {
        this.luxUploadActionConfig.onClick(newFiles && newFiles.length === 1 ? newFiles[0] : newFiles);
      }
      this.formControl.markAsTouched();
      this.formControl.markAsDirty();
      return Promise.resolve(newFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Stößt das Hochladen der Dateien zu einer bestimmten URL an.
   */
  async uploadFiles(files: ILuxFileObject[] | ILuxFileObject) {
    if (!this.luxUploadUrl) {
      this.forceProgressIndeterminate = false;
      return Promise.resolve();
    }

    if (this.luxUploadReportProgress) {
      this.forceProgressIndeterminate = false;
    }

    this.progress = 0;
    // Ansonsten die Dateien in einem FormData-Objekt sammeln und über den httpClient hochladen
    const formData = new FormData();
    let selectedFiles = [];
    if (!files) {
      selectedFiles = [];
    } else if (!Array.isArray(files)) {
      selectedFiles.push(files);
    } else {
      selectedFiles.push(...files);
    }
    selectedFiles.forEach((fileObject: ILuxFileObject) => {
      formData.append(fileObject.name, fileObject.content);
    });

    await new Promise((resolve, reject) => {
      const options = {};
      if (this.luxUploadReportProgress) {
        options['reportProgress'] = true;
        options['observe'] = 'events';
      }
      options['responseType'] = 'blob';

      this.http.post(this.luxUploadUrl, formData, options).subscribe(
        (event: any) => {
          // wenn wir eine determinierte Fortschrittsanzeige haben, dann muss der Fortschritt auch korrekt abgefangen werden
          if (this.luxUploadReportProgress) {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
              resolve();
            }
          } else {
            resolve();
          }
        },
        error => {
          // Hier geben wir den speziellen Fehler noch mal in die console
          console.error(error);
          // Für den Fall das der Upload fehlschlägt, melden wir einen Fehler am Component
          reject(error);
          return throwError(error);
        }
      );
    }).then(
      () => {
        this.progress = -1;
        this.forceProgressIndeterminate = false;
        return Promise.resolve();
      },
      error => {
        this.progress = -1;
        this.forceProgressIndeterminate = false;
        return Promise.reject({
          cause: LuxFileErrorCause.UploadFileError,
          exception: error,
          file: files
        });
      }
    );
  }

  /**
   * Liest die übergebenen Dateien aus und erzeugt daraus ein Promise, welches abgefragt werden kann.
   * Fängt potentielle Fehler ab und gibt diese als abgelehnte Promises zurück.
   * @param files
   */
  async mapFilesToFileObjects(files: FileList | File[]) {
    this._luxSelectedFiles = [];
    const filesArray: File[] = Array.from(files);
    const newFiles: ILuxFileObject[] = [];
    for (const file of filesArray) {
      if (!file) {
        continue;
      }

      // Prüfen ob Dateigröße überschritten worden ist
      if (this.getFileSizeInMB(file) > this.luxMaxSizeMB) {
        return Promise.reject({
          cause: LuxFileErrorCause.MaxSizeError,
          exception: this.getMaxSizeErrorMessage(file),
          file: file
        });
      }

      // Prüfen ob der Dateityp "accepted" ist
      const splitAccepted = this.luxAccept ? this.luxAccept.split(',') : [];
      const splitFileEnding = file.name.split('.');
      const fileEnding = `.${splitFileEnding[splitFileEnding.length - 1]}`;
      let isAccepted: boolean = splitAccepted.length === 0 ? true : false;
      splitAccepted.forEach((accepted: string) => {
        if (accepted) {
          accepted = accepted.toLocaleLowerCase();

          if (accepted === '.txt') {
            accepted = 'text/plain';
          }
        }

        if (!isAccepted) {
          // Für spezielle Wildcards nutzen wir diese Umwandlung
          switch (accepted) {
            case 'image/*':
              accepted = 'image';
              break;
            case 'video/*':
              accepted = 'video';
              break;
            case 'audio/*':
              accepted = 'audio';
              break;
          }

          if (accepted === fileEnding.toLocaleLowerCase() || file.type.toLocaleLowerCase().indexOf(accepted) > -1) {
            isAccepted = true;
          }
        }
      });

      if (!isAccepted) {
        return Promise.reject({
          cause: LuxFileErrorCause.FileNotAccepted,
          exception: this.getFileNotAcceptedMessage(file),
          file: file
        });
      }

      if (this.luxContentsAsBlob) {
        // Wenn direkt die Blobs genutzt werden sollen, einfach die Datei als content merken
        newFiles.push({ name: file.name, content: <Blob>file, type: file.type });
      } else {
        // Das Auslesen der Datei anstoßen, wenn erfolgreich, wird die Datei zu selectedFiles hinzugefügt.
        // Bei einem Fehler wird das Promise rejected und gibt einen Fehler zurück.
        await this.readFile(file)
          .then((content: any) => {
            newFiles.push({ name: file.name, content: content, type: file.type });
          })
          .catch(error => {
            return Promise.reject({
              cause: LuxFileErrorCause.ReadingFileError,
              exception: error,
              file: file
            });
          });
      }
    }

    // Das Array mit den neuen Dateien zurückgeben
    return Promise.resolve(newFiles);
  }

  /**
   * Liest (asynchron) den Base64-String aus der übergebenen Datei heraus bzw. gibt den Fehler zurück, wenn einer
   * aufgetreten ist.
   * @param file
   */
  readFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new window['FileReader']();

      reader.onload = fileData => resolve(fileData.target.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Wird beim Drag-Over über dem LuxFormControl aufgerufen.
   * @param $event
   */
  handleDragOver($event) {
    this.isDragActive = true;
    $event.stopPropagation();
    $event.preventDefault();

    // Der Drop Effect wird nur gesetzt, wenn die Property auch
    // vorhanden ist. In den Tests gibt es keinen Drop Effect.
    if ($event.dataTransfer && $event.dataTransfer.dropEffect) {
      $event.dataTransfer.dropEffect = 'copy';
    }
  }

  /**
   * Wird beim Drag-Leave über dem LuxFormControl aufgerufen.
   * @param $event
   */
  handleDragLeave($event) {
    if ($event.target.nodeName.toLocaleLowerCase() === 'lux-file-input') {
      this.isDragActive = false;
    }

    $event.stopPropagation();
    $event.preventDefault();
  }

  /**
   * Wird beim Drop eines/mehrerer gezogener Elemente über dem LuxFormControl aufgerufen und löst
   * die Auswähl-Methoden für die entsprechenden Dateien aus.
   */
  handleDrop($event) {
    this.forceProgressIndeterminate = true;
    this.isDragActive = false;
    $event.stopPropagation();
    $event.preventDefault();

    if ($event.dataTransfer) {
      this.selectFiles($event.dataTransfer.files);
    }
  }

  /**
   * Funktion, die das Auswählen von Dateien handeln soll.
   * Die erbenden Klassen implementieren diese Funktion aus.
   */
  abstract selectFiles(files: FileList | File[]);

  /**
   * Prüft ob der Base64-String für die Datei gesetzt ist und ob ein onClick-Aufruf für die View-Action vorhanden ist.
   * Wenn ja, wird dieser ausgeführt.
   * @param file
   */
  protected triggerViewFileClick(file: ILuxFileObject) {
    if (file.content && this.luxViewActionConfig.onClick) {
      this.luxViewActionConfig.onClick(file);
    }
  }

  /**
   * Entfernt die in dieser Component gesetzten Fehlermeldungen.
   */
  protected clearFormControlErrors() {
    // Das aktuelle Fehlerobjekt auslesen
    let errors = this.formControl.errors;
    if (errors) {
      // Die componentspezifischen Fehler aus dem Objekt entfernen
      for (const cause of Object.keys(LuxFileErrorCause)) {
        delete errors[LuxFileErrorCause[cause]];
      }
      // Falls errors ein leeres Objekt ist, nehmen wir stattdessen null
      errors = Object.keys(errors).length === 0 ? null : errors;
      // Das neue Fehlerobjekt in das FormControl schreiben
      this.formControl.setErrors(errors);
    }
  }

  /**
   * Aktualisiert das Fehlerobjekt am FormControl, damit eine entsprechende Fehlermeldung angezeigt werden kann.
   * Leert die Anzeige und gibt Events mit leerem Array aus.
   * @param error
   */
  protected setFormControlErrors(error: ILuxFileError) {
    this.forceProgressIndeterminate = false;
    // Vorherige definierte Fehler entfernen
    this.clearFormControlErrors();
    // Hier aktualisieren wir das Fehlerobjekt an dem zugrunde liegenden FormControl dieser Component
    const errors = this.formControl.errors ? this.formControl.errors : {};
    errors[error.cause] = { file: error.file };
    this.formControl.setErrors(errors);
  }

  /**
   * Berechnet die Größe der übergebenen Datei in MB.
   * @param file
   */
  protected getFileSizeInMB(file: File) {
    return file.size / 1000000;
  }

  /**
   * Gibt die Message für Überschreitung der maximalen Dateigröße zurück.
   * @param file
   */
  protected getMaxSizeErrorMessage(file: File): string {
    return (
      `Die Datei "${file.name}" überschreitet mit ${+this.getFileSizeInMB(file).toFixed(2)}MB ` +
      `die erlaubte Dateigröße von ${+this.luxMaxSizeMB.toFixed(2)}MB`
    );
  }

  /**
   * Gibt die Message für Fehler beim Auslesen einer Datei zurück.
   * @param file
   */
  protected getReadingFileErrorMessage(file: File): string {
    return `Beim Lesen der Datei "${file.name}" ist ein Fehler aufgetreten`;
  }

  /**
   * Gibt die Message für Fehler beim Upload einer Datei zurück.
   * @param files
   */
  protected getUploadFileErrorMessage(files: File[]): string {
    if (!files) {
      return 'Das Hochladen ist fehlgeschlagen';
    }
    return `Das Hochladen der ${files.length > 1 ? 'ausgewählten Dateien' : 'ausgewählten Datei'} ist fehlgeschlagen`;
  }

  /**
   * Gibt die Message für falsche Dateitypen zurück.
   * @param file
   */
  protected getFileNotAcceptedMessage(file: File): string {
    return `Die Datei "${file.name}" hat einen nicht akzeptierten Dateityp`;
  }

  /**
   * Gibt die Message für falsche Dateitypen zurück.
   * @param file
   */
  protected getMultipleForbiddenMessage(): string {
    return `Es darf nur eine Datei ausgewählt werden`;
  }

  /**
   * Meldet dem ScreenReader, dass gerade eine/mehrere Dateien bearbeitet werden (Ladeanzeige).
   * @param multiple
   */
  protected announceFileProcess(multiple: boolean) {
    this.liveAnnouncer.announce(
      `Bitte warten. Die ${multiple ? 'Dateien werden' : 'Datei wird'} verarbeitet.`,
      'assertive'
    );
  }

  /**
   * Meldet dem ScreenReader, dass alle Dateien entfernt werden sollen.
   */
  protected announceAllFilesRemove() {
    this.liveAnnouncer.announce(`Alle Dateien werden entfernt.`, 'assertive');
  }

  /**
   * Meldet dem ScreenReader, dass eine bestimmte Datei entfernt werden soll.
   * @param fileName
   */
  protected announceFileRemove(fileName: string) {
    this.liveAnnouncer.announce(`Die Datei ${fileName} wird entfernt.`, 'assertive');
  }

  /**
   * Gibt wieder, ob Drag-and-Drop gerade aktiv und möglich ist.
   */
  private isDnDAllowed(): boolean {
    return this.luxDnDActive && !this.luxDisabled && !this.luxReadonly;
  }

  // region Overridden methods

  protected errorMessageModifier(value: any, errors: any) {
    if (errors[LuxFileErrorCause.MaxSizeError]) {
      return this.getMaxSizeErrorMessage(errors[LuxFileErrorCause.MaxSizeError].file);
    } else if (errors[LuxFileErrorCause.ReadingFileError]) {
      return this.getReadingFileErrorMessage(errors[LuxFileErrorCause.ReadingFileError].file);
    } else if (errors[LuxFileErrorCause.UploadFileError]) {
      return this.getUploadFileErrorMessage(errors[LuxFileErrorCause.UploadFileError].file);
    } else if (errors[LuxFileErrorCause.FileNotAccepted]) {
      return this.getFileNotAcceptedMessage(errors[LuxFileErrorCause.FileNotAccepted].file);
    } else if (errors[LuxFileErrorCause.MultipleForbidden]) {
      return this.getMultipleForbiddenMessage();
    }

    return undefined;
  }

  protected notifyFormValueChanged() {
    this.luxSelectedFilesChange.emit(this.luxSelectedFiles);

    // Wir leeren nach jedem Value-Change das Input, da wir das FormControl bereits als SSoT besitzen
    // und das Input durch den Browser gelegentlich sonst geblockt werden (wenn eine Datei ausgewählt worden ist)
    this.fileuploadInput.nativeElement.value = null;
  }

  protected updateValidators(validators: ValidatorFn | ValidatorFn[]) {
    if (!validators && this.luxRequired) {
      validators = Validators.required;
    }

    super.updateValidators(validators);
  }

  protected initFormValueSubscription() {
    this._formValueChangeSubscr = this.formControl.valueChanges.subscribe(() => {
      // Wenn die Dateien erfolgreich gelesen werden konnten, die (spezifischen) Fehler entfernen
      this.clearFormControlErrors();
    });

    if (this._initialValue !== null && this._initialValue !== undefined) {
      this.setValue(this._initialValue);
    }
  }

  protected triggerOutputPatternCheck() {
    this.checkOutputPatternViolation(this.luxSelectedFilesChange.observers);
  }

  protected triggerInputPatternCheck(simpleChanges: SimpleChanges) {
    this.checkInputPatternViolation(simpleChanges.luxSelectedFiles);
  }

  // endregion
}
