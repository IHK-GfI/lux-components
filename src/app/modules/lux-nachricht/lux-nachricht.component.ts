import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Ihk, Nachricht } from './lux-nachricht-model/lux-nachricht-model';
import { LuxNachrichtController } from './lux-nachricht-controller';
import { LuxNachrichtAnzeigenComponent } from './lux-nachricht-subcomponents/lux-nachricht-anzeigen/lux-nachricht-anzeigen.component';
import { ILuxNachrichtConfig } from './lux-nachricht-model/lux-nachricht-config.interface';
import { LuxAppFooterButtonService } from '../lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxDialogService } from '../lux-popups/lux-dialog/lux-dialog.service';
import {
  LuxAppFooterButtonInfo,
  ILuxAppFooterButtonInfo
} from '../lux-layout/lux-app-footer/lux-app-footer-button-info';
import { ILuxDialogConfig } from '../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-config.interface';
import { ICustomCSSConfig } from '../lux-common/lux-table/lux-table-custom-css-config.interface';

@Component({
  selector: 'lux-nachricht',
  templateUrl: 'lux-nachricht.component.html',
  styleUrls: ['lux-nachricht.component.scss'],
  providers: [LuxNachrichtController]
})
export class LuxNachrichtComponent implements OnInit {
  @Input() luxCreateButtonInFooter = false;
  @Input() luxCreateButtonColor = 'default';
  @Input() luxHeightMinus = 350;
  @Input() luxNachrichtConfig: ILuxNachrichtConfig;

  height: string;
  selectedNachricht: Nachricht;
  authorizedIhkListe: Ihk[];
  viewType: 'overview' | 'create' | 'edit' = 'overview';
  createBtn = LuxAppFooterButtonInfo.generateInfo({
    label: 'Hinzufügen',
    disabled: false,
    cmd: 'create',
    alwaysVisible: true,
    onClick: this.buttonCreateClicked.bind(this)
  });

  tableCSS: ICustomCSSConfig[] = [
    {
      class: 'is-Nachricht-Expired',
      check(entry): boolean {
        const now = new Date().getTime();
        return entry.validTo.getTime() < now;
      }
    }
  ];

  constructor(
    public nachrichtController: LuxNachrichtController,
    public dialogService: LuxDialogService,
    public buttonService: LuxAppFooterButtonService
  ) {}

  ngOnInit() {
    this.nachrichtController.read(
      this.luxNachrichtConfig.userRole,
      this.luxNachrichtConfig.ihkNr,
      this.luxNachrichtConfig.anwendungKuerzel
    );

    if (this.luxCreateButtonInFooter) {
      this.buttonService.pushButtonInfos(this.createBtn);
    }

    this.createBtn.color = this.luxCreateButtonColor;

    this.updateHeight();
  }

  buttonCreateClicked(that: ILuxAppFooterButtonInfo) {
    this.viewType = 'create';
    this.selectedNachricht = new Nachricht();
    this.buttonService.removeButtonInfoByCmd('create');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateHeight();
  }

  updateHeight() {
    this.height = window.innerHeight - this.luxHeightMinus + 'px';
  }

  onViewType(view) {
    this.viewType = view;
    if (this.luxCreateButtonInFooter) {
      this.buttonService.pushButtonInfos(this.createBtn);
    }
  }

  onNachrichtChange(nachricht: Nachricht) {
    if (nachricht != null) {
      if (nachricht.id != null) {
        this.nachrichtController.update(nachricht);
      }
      if (nachricht.id == null) {
        this.nachrichtController.create(nachricht);
      }
    }
  }

  create(): void {
    this.viewType = 'create';
    this.selectedNachricht = new Nachricht();
    this.authorizedIhkListe = this.nachrichtController.getAuthorizedIhksForUser();
  }

  update(entry: Nachricht): void {
    this.viewType = 'edit';
    this.selectedNachricht = entry;
    this.authorizedIhkListe = this.nachrichtController.getAuthorizedIhksForUser();
    this.buttonService.removeButtonInfoByCmd('create');
  }

  preview(entry: Nachricht): void {
    const dialogConfig: ILuxDialogConfig = {
      disableClose: false,
      width: 'auto',
      height: 'auto'
    };

    const dialogRef = this.dialogService.openComponent(LuxNachrichtAnzeigenComponent, dialogConfig, {
      nachricht: entry
    });
    dialogRef.dialogClosed.subscribe((result: any) => {});
  }

  delete(entry: Nachricht): void {
    this.nachrichtController.delete(entry);
  }
}
