import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, skip } from 'rxjs/operators';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFileListComponent } from '../../../../modules/lux-form/lux-file/lux-file-list/lux-file-list.component';
import { ILuxFileActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import { ILuxFileObject } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';
import { LuxFormFileBase } from '../../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxDialogService } from '../../../../modules/lux-popups/lux-dialog/lux-dialog.service';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-list-example',
  templateUrl: './file-list-example.component.html'
})
export class FileListExampleComponent extends FileExampleComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(LuxFileListComponent) fileLists: QueryList<LuxFileListComponent>;
  @ViewChild('filelistexamplewithoutform', { read: LuxFileListComponent, static: true })
  fileBaseWithoutComponent: LuxFileListComponent;
  @ViewChild('filelistexamplewithform', { read: LuxFileListComponent, static: true })
  fileBaseWithComponent: LuxFileListComponent;

  namePrefixAccept = '(akzeptiert) ';
  namePrefixColorAccept = '#3e8320';
  nameSuffixAccept = ` (${new Date().toLocaleDateString()})`;
  nameSuffixColorAccept = undefined;

  namePrefixDecline = '(abgelehnt) ';
  namePrefixColorDecline = 'red';
  nameSuffixDecline = ` (${new Date().toLocaleDateString()})`;
  nameSuffixColorDecline = undefined;

  subscriptions: Subscription[] = [];

  openDialog(fileObject: ILuxFileObject) {
    const dialogRef = this.dialogService.open({
      title: `${fileObject.name}`,
      content: 'Bitte prüfen Sie die Datei sorgfältig. \n Die Taste ESC schließt den Dialog, ohne eine Entscheidung zu treffen.',
      disableClose: false,
      width: 'auto',
      height: 'auto',
      panelClass: [],
      confirmAction: {
        label: 'Akzeptieren',
        raised: true,
        color: 'primary'
      },
      declineAction: {
        label: 'Ablehnen',
        raised: true,
        color: 'default'
      }
    });

    this.subscriptions.push(
      dialogRef.dialogDeclined.subscribe((result: any) => {
        fileObject.namePrefix = this.namePrefixDecline;
        fileObject.namePrefixColor = this.namePrefixColorDecline;
        fileObject.nameSuffix = this.nameSuffixDecline;
        fileObject.nameSuffixColor = this.nameSuffixColorDecline;
      })
    );

    this.subscriptions.push(
      dialogRef.dialogConfirmed.subscribe((result: any) => {
        fileObject.namePrefix = this.namePrefixAccept;
        fileObject.namePrefixColor = this.namePrefixColorAccept;
        fileObject.nameSuffix = this.nameSuffixAccept;
        fileObject.nameSuffixColor = this.nameSuffixColorAccept;
      })
    );
  }

  customActionConfigs: ILuxFileActionConfig[] = [
    {
      disabled: false,
      hidden: false,
      iconName: 'fas fa-edit',
      label: 'Dialog öffnen',
      prio: 15,
      onClick: (fileObject: ILuxFileObject) => {
        this.openDialog(fileObject);
      }
    }
  ];

  backgroundIconName = 'fas fa-cloud-upload-alt';
  showPreview = true;
  multiple = true;
  heading = 4;
  headingValidator = Validators.pattern('[1-6]');

  constructor(
    fb: FormBuilder,
    http: HttpClient,
    snackbar: LuxSnackbarService,
    filePreviewService: LuxFilePreviewService,
    private dialogService: LuxDialogService
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

    this.subscriptions.push(
      this.form
        .get(this.controlBinding)
        .valueChanges.pipe(skip(1), distinctUntilChanged())
        .subscribe((value) => {
          console.log('formValueChanged', value);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
