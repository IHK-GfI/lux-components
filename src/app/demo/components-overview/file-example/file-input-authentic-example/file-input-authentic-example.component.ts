import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { LuxFileInputAcComponent } from '../../../../modules/lux-form/lux-file/lux-file-input-ac/lux-file-input-ac.component';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { ILuxFileActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { FileExampleComponent } from '../file-example.component';
import { ILuxFileObject } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';

@Component({
  selector: 'lux-file-input-authentic-example',
  templateUrl: './file-input-authentic-example.component.html'
})
export class FileInputAuthenticExampleComponent extends FileExampleComponent implements AfterViewInit {
  @ViewChildren(LuxFileInputAcComponent) fileInputs!: QueryList<LuxFileInputAcComponent>;
  @ViewChild('fileinputexamplewithoutform', { read: LuxFileInputAcComponent, static: true }) fileBaseWithoutComponent!: LuxFileInputAcComponent;
  @ViewChild('fileinputexamplewithform', { read: LuxFileInputAcComponent, static: true }) fileBaseWithComponent!: LuxFileInputAcComponent;

  placeholder = 'Placeholder';
  clearOnError = true;

  namePrefixAccept = '(OK) ';
  nameSuffixAccept = ` (${new Date().toLocaleDateString()})`;

  namePrefixDecline = '(ERR) ';
  nameSuffixDecline = ` (${new Date().toLocaleDateString()})`;

  customActionConfigs: ILuxFileActionConfig[] = this.createCustomConfigs();
  customActionsConfigsForm: ILuxFileActionConfig[] = this.createCustomConfigs();

  labelLongFormat = false;

  constructor(http: HttpClient, snackbar: LuxSnackbarService, filePreviewService: LuxFilePreviewService) {
    super(http, snackbar, filePreviewService);
  }

  protected initUploadActionConfig() {
    return {
      disabled: false,
      hidden: false,
      iconName: 'fas fa-cloud-upload-alt',
      label: 'Hochladen',
      onClick: (file?: ILuxFileObject) => {
        this.log(this.showOutputEvents, 'uploadActionConfig onClick', file);
        this.onUpload(file);
      }
    }
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
          this.selected         = fileObject;
          this.form.get(this.controlBinding)!.setValue(fileObject);
        })
      )
      .subscribe(() => {});
  }

  onKeepFileWithoutForm(keepFile: boolean) {
    if (keepFile) {
      const fileCopy = { name: '', type: '' };
      Object.assign(fileCopy, this.selected);
      this.fileBaseWithoutComponent.luxSelected = fileCopy;
    } else {
      this.fileBaseWithoutComponent.luxSelected = null as any;
    }
  }

  onKeepFileWithForm(keepFile: boolean) {
    if (keepFile) {
      const fileCopy = { name: '', type: '' };
      Object.assign(fileCopy, this.fileBaseWithComponent.luxSelected);
      this.fileBaseWithComponent.luxSelected = fileCopy;
    } else {
      this.fileBaseWithComponent.luxSelected = null as any;
    }
  }

  ngAfterViewInit() {
    this.fileComponents = this.fileInputs.toArray();
  }

  onDelete(event: any){
    this.customActionConfigs.forEach(config => config.disabled = true);
  }

  onUpload(event: any) {
    this.customActionConfigs.forEach(config => config.disabled = false);
  }

  private createCustomConfigs(): ILuxFileActionConfig[] {
    const customConfigAccept = {
      disabled: false,
      hidden: false,
      iconName: 'lux-interface-validation-check',
      label: 'Akzeptieren',
      prio: 1,
      onClick: (fileObject: ILuxFileObject) => {
        if (fileObject) {
          customConfigAccept.disabled = true;
          customConfigDecline.disabled = false;
          fileObject.namePrefix = this.namePrefixAccept;
          fileObject.nameSuffix = this.nameSuffixAccept;
        }
      }
    };

    const customConfigDecline = {
      disabled: false,
      hidden: false,
      iconName: 'lux-interface-delete-1',
      label: 'Ablehnen',
      prio: 2,
      onClick: (fileObject: ILuxFileObject) => {
        if (fileObject) {
          customConfigAccept.disabled = false;
          customConfigDecline.disabled = true;
          fileObject.namePrefix = this.namePrefixDecline;
          fileObject.nameSuffix = this.nameSuffixDecline;
        }
      }
    };

    return [customConfigAccept, customConfigDecline];
  }
}
