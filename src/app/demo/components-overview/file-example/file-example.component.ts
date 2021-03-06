import { HttpClient } from '@angular/common/http';
import { OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { LuxFileListComponent } from '../../../modules/lux-form/lux-file/lux-file-list/lux-file-list.component';
import { ILuxFileActionConfig } from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import { ILuxFileListActionConfig } from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-list-action-config.interface';
import { ILuxFileObject } from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';
import { LuxFilePreviewService } from '../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFormFileBase } from '../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import {
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Directive()
export abstract class FileExampleComponent implements OnInit {
  showOutputEvents: boolean = true;
  realBackends: any[] = [];
  mockBackend: boolean = false;
  log = logResult;
  form: FormGroup;

  fileComponents: LuxFormFileBase[] = [];

  dndActive: boolean = true;
  selected: ILuxFileObject = null;
  contentAsBlob = false;
  reportProgress = false;
  hint: string = 'Datei hierher ziehen oder über den Button auswählen';
  hintShowOnlyOnFocus: boolean = false;
  label: string = 'Anhänge';
  uploadUrl: string = '';
  controlBinding: string = 'uploadExample';
  disabled = false;
  readonly: boolean;
  required: boolean;
  maxSize: number = 5;
  capture: string = '';
  accept: string;

  uploadActionConfig: ILuxFileListActionConfig = {
    disabled: false,
    disabledHeader: false,
    hidden: false,
    hiddenHeader: false,
    iconName: 'fas fa-cloud-upload-alt',
    iconNameHeader: 'fas fa-cloud-upload-alt',
    label: 'Hochladen',
    labelHeader: 'Neue Dateien hochladen',
    onClick: $event => this.log(this.showOutputEvents, 'uploadActionConfig onClick', $event)
  };
  deleteActionConfig: ILuxFileListActionConfig = {
    disabled: false,
    disabledHeader: false,
    hidden: false,
    hiddenHeader: false,
    iconName: 'fas fa-trash',
    iconNameHeader: 'fas fa-trash',
    label: 'Löschen',
    labelHeader: 'Alle Dateien entfernen',
    onClick: $event => this.log(this.showOutputEvents, 'deleteActionConfig onClick', $event)
  };
  viewActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-eye',
    label: 'Ansehen',
    onClick: (fileObject: ILuxFileObject) => {
      this.filePreviewService.open({
        previewData: {
          fileComponent: this.fileComponents[0],
          fileObject: fileObject
        }
      });
    }
  };

  viewActionConfigForm: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-eye',
    label: 'Ansehen',
    onClick: (fileObject: ILuxFileObject) => {
      this.filePreviewService.open({
        previewData: {
          fileComponent: this.fileComponents[1],
          fileObject: fileObject
        }
      });
    }
  };

  downloadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-download',
    label: 'Download',
    onClick: $event => this.log(this.showOutputEvents, 'downloadActionConfig onClick', $event)
  };

  protected constructor(
    protected fb: FormBuilder,
    protected http: HttpClient,
    protected snackbar: LuxSnackbarService,
    protected filePreviewService: LuxFilePreviewService
  ) {
    this.form = this.fb.group({
      uploadExample: []
    });
  }

  ngOnInit() {
    this.http
      .get('assets/png/example.png', { responseType: 'blob' })
      .pipe(take(1),
        map((response: Blob) => {
          const file = <any>response;
          file.name = 'example.png';
          file.lastModifiedDate = new Date();
          this.selected = { name: 'example.png', content: file, type: file.type };
          this.form.get(this.controlBinding).setValue({ name: 'example.png', content: file, type: file.type });
        })
      )
      .subscribe(() => {});
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  abstract getFileComponentWithoutForm(): LuxFormFileBase;

  abstract getFileComponentWithForm(): LuxFormFileBase;

  emptyCallback() {}

  onSelectedChange($event: ILuxFileObject) {
    this.selected = $event;
    this.log(true, 'luxSelectedChange', $event);
  }

  changeMockBackend($event: boolean) {
    this.mockBackend = $event;
    if (this.mockBackend) {
      this.realBackends = [];
      this.fileComponents.forEach((input: LuxFileListComponent) => {
        this.realBackends.push(input['http']);
        input['http'] = <any>{
          post: (...args) => {
            return of('ok').pipe(delay(2000));
          }
        };
      });
    } else {
      this.fileComponents.forEach((input: LuxFileListComponent, index: number) => {
        input['http'] = this.realBackends[index];
      });
    }
  }
}
