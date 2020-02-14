import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFormFileBase } from '../../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxFileListComponent } from '../../../../modules/lux-form/lux-file/lux-file-list/lux-file-list.component';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-list-example',
  templateUrl: './file-list-example.component.html'
})
export class FileListExampleComponent extends FileExampleComponent implements AfterViewInit {
  @ViewChildren(LuxFileListComponent) fileLists: QueryList<LuxFileListComponent>;
  @ViewChild('filelistexamplewithoutform', { read: LuxFileListComponent, static: true })
  fileBaseWithoutComponent: LuxFileListComponent;
  @ViewChild('filelistexamplewithform', { read: LuxFileListComponent, static: true })
  fileBaseWithComponent: LuxFileListComponent;

  backgroundIconName: string = 'fas fa-cloud-upload-alt';
  showPreview: boolean = true;
  multiple: boolean = true;

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

  ngAfterViewInit() {
    this.fileComponents = this.fileLists.toArray();
  }
}
