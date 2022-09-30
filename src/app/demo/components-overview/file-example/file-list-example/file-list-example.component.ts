import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, skip, take } from 'rxjs/operators';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { LuxFileListComponent } from '../../../../modules/lux-form/lux-file/lux-file-list/lux-file-list.component';
import { ILuxFileActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import { ILuxFilesListActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-list-action-config.interface';
import { ILuxFileObject } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';
import { LuxDialogService } from '../../../../modules/lux-popups/lux-dialog/lux-dialog.service';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { FileExampleComponent } from '../file-example.component';

@Component({
  selector: 'app-file-list-example',
  templateUrl: './file-list-example.component.html'
})
export class FileListExampleComponent extends FileExampleComponent<ILuxFileObject[] | null, ILuxFilesListActionConfig> implements AfterViewInit, OnDestroy {
  @ViewChildren(LuxFileListComponent) fileLists!: QueryList<LuxFileListComponent>;
  @ViewChild('filelistexamplewithoutform', { read: LuxFileListComponent, static: true }) fileBaseWithoutComponent!: LuxFileListComponent;
  @ViewChild('filelistexamplewithform', { read: LuxFileListComponent, static: true }) fileBaseWithComponent!: LuxFileListComponent;

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
        color: undefined
      }
    });

    this.subscriptions.push(
      dialogRef.dialogDeclined.subscribe(() => {
        fileObject.namePrefix = this.namePrefixDecline;
        fileObject.namePrefixColor = this.namePrefixColorDecline;
        fileObject.nameSuffix = this.nameSuffixDecline;
        fileObject.nameSuffixColor = this.nameSuffixColorDecline;
      })
    );

    this.subscriptions.push(
      dialogRef.dialogConfirmed.subscribe(() => {
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
      iconName: 'lux-interface-edit-write-2',
      label: 'Dialog öffnen',
      prio: 15,
      onClick: (fileObject: ILuxFileObject) => {
        this.openDialog(fileObject);
      }
    }
  ];

  showPreview = true;
  multiple = true;
  heading = 4;
  headingValidator = Validators.pattern('[1-6]');

  constructor(
    http: HttpClient,
    snackbar: LuxSnackbarService,
    filePreviewService: LuxFilePreviewService,
    private dialogService: LuxDialogService
  ) {
    super(http, snackbar, filePreviewService);
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

  ngAfterViewInit() {
    this.fileComponents = this.fileLists.toArray();

    this.subscriptions.push(
      this.form
        .get(this.controlBinding)!
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
