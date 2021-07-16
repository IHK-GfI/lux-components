import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LuxFileInputComponent } from '../../../../modules/lux-form/lux-file/lux-file-input/lux-file-input.component';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { ILuxFileActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import { LuxFormFileBase } from '../../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { FileExampleComponent } from '../file-example.component';
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

  namePrefixAccept = '(ERR) ';
  nameSuffixAccept = ` (${new Date().toLocaleDateString()})`;

  namePrefixDecline = '(OK)  ';
  nameSuffixDecline = ` (${new Date().toLocaleDateString()})`;

  customActionConfigs: ILuxFileActionConfig[]      = this.createCustomConfigs();
  customActionsConfigsForm: ILuxFileActionConfig[] = this.createCustomConfigs();

  constructor(fb: FormBuilder, http: HttpClient, snackbar: LuxSnackbarService, filePreviewService: LuxFilePreviewService) {
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

  private createCustomConfigs(): ILuxFileActionConfig[] {
    const customConfigAccept = {
      disabled: false,
      hidden: false,
      iconName: 'fas fa-check',
      label: 'Akzeptieren',
      prio: 1,
      onClick: (fileObject: ILuxFileObject) => {
        customConfigAccept.disabled = true;
        customConfigDecline.disabled = false;
        fileObject.namePrefix = this.namePrefixAccept;
        fileObject.nameSuffix = this.nameSuffixAccept;
      }
    };

    const customConfigDecline = {
      disabled: false,
      hidden: false,
      iconName: 'fas fa-times',
      label: 'Ablehnen',
      prio: 2,
      onClick: (fileObject: ILuxFileObject) => {
        customConfigAccept.disabled = false;
        customConfigDecline.disabled = true;
        fileObject.namePrefix = this.namePrefixDecline;
        fileObject.nameSuffix = this.nameSuffixDecline;
      }
    };

    return [customConfigAccept, customConfigDecline];
  }
}
