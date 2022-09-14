import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { ILuxFilesListActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-list-action-config.interface';
import { ILuxFileObject } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';
import { LuxFileUploadComponent } from '../../../../modules/lux-form/lux-file/lux-file-upload/lux-file-upload.component';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxUtil } from '../../../../modules/lux-util/lux-util';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'lux-file-upload-example',
  templateUrl: './file-upload-example.component.html'
})
export class FileUploadExampleComponent extends FileExampleComponent<ILuxFileObject[] | null, ILuxFilesListActionConfig> implements OnInit {
  @ViewChild('fileBaseWithoutComponent', { read: LuxFileUploadComponent, static: true }) fileBaseWithoutComponent!: LuxFileUploadComponent;
  @ViewChild('fileBaseWithComponent', { read: LuxFileUploadComponent, static: true }) fileBaseWithComponent!: LuxFileUploadComponent;

  label = $localize`:@@luxc.file.upload.label:Zum Hochladen Datei hier ablegen oder `;
  labelLink = $localize`:@@luxc.file.upload.label.link:Datei durchsuchen`;
  labelLinkShort = $localize`:@@luxc.file.upload.label.link.short:Datei hochladen`;
  uploadIcon = 'fas fa-cloud-upload-alt';
  deleteIcon = 'fas fa-trash';
  multiple = true;

  constructor(
    http: HttpClient,
    snackbar: LuxSnackbarService,
    filePreviewService: LuxFilePreviewService
  ) {
    super(http, snackbar, filePreviewService);
  }

  ngOnInit() {
    this.maxSize = 10;
    this.capture = 'environment';
    this.accept = '.pdf,.jpeg,.jpg,.png';
    this.hint = `Sie können Dateien der Typen ${LuxUtil.getAcceptTypesAsMessagePart(this.accept)} mit einer Größe bis zu ${
      this.maxSize
    } Megabytes hochladen.`;
    super.ngOnInit();
  }

  initSelected() {
    this.http
      .get('assets/png/example.png', { responseType: 'blob' })
      .pipe(
        take(1),
        map((response: Blob) => {
          const file            = response as any;
          file.name             = 'example.png';
          file.lastModifiedDate = new Date();
          const fileObject      = { name: 'example.png', content: file, type: file.type, size: file.size };
          this.selected         = [fileObject];
          this.form.get(this.controlBinding)!.setValue([fileObject]);
        })
      )
      .subscribe(() => {});
  }

  protected initUploadActionConfig() {
    return {
      disabled: false,
      disabledHeader: false,
      hidden: false,
      hiddenHeader: false,
      iconName: 'fas fa-cloud-upload-alt',
      iconNameHeader: 'fas fa-cloud-upload-alt',
      label: 'Hochladen',
      labelHeader: 'Neue Dateien hochladen',
      onClick: (files: ILuxFileObject[]) => {
        this.log(this.showOutputEvents, 'uploadActionConfig onClick', files);
        this.onUpload(files);
      }
    }
  }

}
