import { HttpClient } from '@angular/common/http';
import { OnInit, Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  ILuxFileActionBaseConfig,
  ILuxFileActionConfig
} from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import {
  ILuxFileListActionConfig,
} from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-list-action-config.interface';
import { ILuxFileObject } from '../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';
import { LuxFilePreviewService } from '../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFormFileBase } from '../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { logResult, setRequiredValidatorForFormControl } from '../../example-base/example-base-util/example-base-helper';

interface FileDummyForm {
  uploadExample: FormControl<ILuxFileObject[] | null>;
}

@Directive()
export abstract class FileExampleComponent<T = any, U extends ILuxFileActionBaseConfig = any> implements OnInit {
  showOutputEvents    = true;
  realBackends: any[] = [];
  mockBackend         = false;
  log                 = logResult;
  form: FormGroup<FileDummyForm>;

  fileComponents: LuxFormFileBase[] = [];

  dndActive           = true;
  selected: T | null  = null;
  contentAsBlob       = false;
  reportProgress      = false;
  hint                = 'Datei hierher ziehen oder über den Button auswählen';
  hintShowOnlyOnFocus = false;
  label               = 'Anhänge';
  uploadUrl           = '';
  controlBinding      = 'uploadExample';
  disabled            = false;
  readonly            = false;
  required            = false;
  maxSize             = 5;
  capture             = '';
  accept              = '';
  maximumExtended     = 6;

  uploadActionConfig: U = this.initUploadActionConfig();

  deleteActionConfig: ILuxFileListActionConfig = {
    disabled      : false,
    disabledHeader: false,
    hidden        : false,
    hiddenHeader  : false,
    iconName      : 'fas fa-trash',
    iconNameHeader: 'fas fa-trash',
    label         : 'Löschen',
    labelHeader   : 'Alle Dateien entfernen',
    onClick       : (file) => {
      this.log(this.showOutputEvents, 'deleteActionConfig onClick', file);
      this.onDelete(file);
    }
  };
  viewActionConfig: ILuxFileActionConfig       = {
    disabled: false,
    hidden  : false,
    iconName: 'fas fa-eye',
    label   : 'Ansehen',
    onClick : (fileObject: ILuxFileObject) => {
      this.filePreviewService.open({
        previewData: {
          fileComponent: this.fileComponents[ 0 ],
          fileObject
        }
      });
    }
  };

  viewActionConfigForm: ILuxFileActionConfig = {
    disabled: false,
    hidden  : false,
    iconName: 'fas fa-eye',
    label   : 'Ansehen',
    onClick : (fileObject: ILuxFileObject) => {
      this.filePreviewService.open({
        previewData: {
          fileComponent: this.fileComponents[ 1 ],
          fileObject
        }
      });
    }
  };

  downloadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden  : false,
    iconName: 'fas fa-download',
    label   : 'Download',
    onClick : (file) => this.log(this.showOutputEvents, 'downloadActionConfig onClick', file)
  };

  protected constructor(
    protected http: HttpClient,
    protected snackbar: LuxSnackbarService,
    protected filePreviewService: LuxFilePreviewService
  ) {
    this.form = new FormGroup({
      uploadExample: new FormControl<ILuxFileObject[] | null>(null)
    });
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

  ngOnInit() {
    this.initSelected();
  }

  protected abstract initSelected(): void;

  protected abstract initUploadActionConfig(): U;

  onDelete(file: ILuxFileObject) {
  }

  onUpload(files: ILuxFileObject[]) {
  }

  onSelectedChange(files: T | null) {
    this.selected = files;
    this.log(true, 'luxSelectedChange', files);
  }

  changeMockBackend(useMockBackend: boolean) {
    this.mockBackend = useMockBackend;
    if (this.mockBackend) {
      this.realBackends = [];
      this.fileComponents.forEach((input: LuxFormFileBase<any>) => {
        this.realBackends.push(input[ 'http' ]);
        input[ 'http' ] = {
          post: () => of('ok').pipe(delay(2000))
        } as any;
      });
    } else {
      this.fileComponents.forEach((input: LuxFormFileBase<any>, index: number) => {
        input[ 'http' ] = this.realBackends[ index ];
      });
    }
  }
}
