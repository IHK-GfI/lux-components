import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LuxFileInputComponent } from '../../../../modules/lux-form/lux-file/lux-file-input/lux-file-input.component';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFormFileBase } from '../../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { FileExampleComponent } from '../file-example.component';
import { LuxUtil } from '../../../../modules/lux-util/lux-util';
import { ILuxFileObject } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';

@Component({
  selector: 'app-file-input-example',
  templateUrl: './file-input-example.component.html'
})
export class FileInputExampleComponent extends FileExampleComponent implements AfterViewInit {
  @ViewChildren(LuxFileInputComponent) fileInputs: QueryList<LuxFileInputComponent>;
  @ViewChild('fileinputexamplewithoutform', { read: LuxFileInputComponent, static: true })
  fileBaseWithoutComponent: LuxFileInputComponent;
  @ViewChild('fileinputexamplewithform', { read: LuxFileInputComponent, static: true })
  fileBaseWithComponent: LuxFileInputComponent;

  placeholder = 'Placeholder';
  clearOnError = true;

  constructor(
    fb: FormBuilder,
    http: HttpClient,
    snackbar: LuxSnackbarService,
    filePreviewService: LuxFilePreviewService
  ) {
    super(fb, http, snackbar, filePreviewService);
  }

  getFileComponentWithoutForm(): LuxFormFileBase {
    return this.fileBaseWithoutComponent;
  }

  getFileComponentWithForm(): LuxFormFileBase {
    return this.fileBaseWithComponent;
  }

  onKeepFileWithoutForm(keepFile: boolean) {
    if (keepFile) {
      const fileCopy = {};
      Object.assign(fileCopy, this.selected);
      this.fileBaseWithoutComponent.luxSelectedFiles = fileCopy;
    } else {
      this.fileBaseWithoutComponent.luxSelectedFiles = undefined;
    }
  }

  onKeepFileWithForm(keepFile: boolean) {
    if (keepFile) {
      const fileCopy = {};
      Object.assign(fileCopy, this.fileBaseWithComponent.luxSelectedFiles);
      this.fileBaseWithComponent.luxSelectedFiles = fileCopy;
    } else {
      this.fileBaseWithComponent.luxSelectedFiles = undefined;
    }
  }

  ngAfterViewInit() {
    this.fileComponents = this.fileInputs.toArray();
  }
}
