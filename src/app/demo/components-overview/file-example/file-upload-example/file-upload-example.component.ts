import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFileUploadComponent } from '../../../../modules/lux-form/lux-file/lux-file-upload/lux-file-upload.component';
import { LuxFormFileBase } from '../../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxDialogService } from '../../../../modules/lux-popups/lux-dialog/lux-dialog.service';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxUtil } from "../../../../modules/lux-util/lux-util";
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'lux-file-upload-example',
  templateUrl: './file-upload-example.component.html',
  styleUrls: ['./file-upload-example.component.scss']
})
export class FileUploadExampleComponent extends FileExampleComponent implements OnInit {
  @ViewChild('fileuploadexamplewithoutform', { read: LuxFileUploadComponent, static: true }) fileBaseWithoutComponent!: LuxFileUploadComponent;
  @ViewChild('fileuploadexamplewithform', { read: LuxFileUploadComponent, static: true }) fileBaseWithComponent!: LuxFileUploadComponent;

  label = $localize`:@@luxc.file.upload.label:Zum Hochladen Datei hier ablegen oder `;
  labelLink = $localize`:@@luxc.file.upload.label.link:Datei durchsuchen`;
  labelLinkShort = $localize`:@@luxc.file.upload.label.link.short:Datei hochladen`;
  uploadIcon = 'fas fa-cloud-upload-alt';
  deleteIcon = 'fas fa-trash';
  multiple = true;

  constructor(
    fb: UntypedFormBuilder,
    http: HttpClient,
    snackbar: LuxSnackbarService,
    filePreviewService: LuxFilePreviewService,
    private dialogService: LuxDialogService
  ) {
    super(fb, http, snackbar, filePreviewService);
  }

  ngOnInit() {
    this.alwaysUseArray = true;
    this.maxSize = 10;
    this.capture = 'environment';
    this.accept = '.pdf,.jpeg,.jpg,.png';
    this.hint = `Sie können Dateien der Typen ${LuxUtil.getAcceptTypesAsMessagePart(this.accept)} mit einer Größe bis zu ${
      this.maxSize
    } Megabytes hochladen.`;
    super.ngOnInit();
  }

  getFileComponentWithoutForm(): LuxFormFileBase {
    return this.fileBaseWithoutComponent;
  }

  getFileComponentWithForm(): LuxFormFileBase {
    return this.fileBaseWithComponent;
  }
}
