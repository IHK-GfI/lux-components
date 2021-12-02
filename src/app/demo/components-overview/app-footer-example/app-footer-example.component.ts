import { Component, OnDestroy } from '@angular/core';
import { LuxAppFooterButtonService } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterLinkService } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-link.service';
import { LuxAppFooterButtonInfo } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxAppFooterLinkInfo } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-link-info';

@Component({
  selector: 'app-footer-example',
  templateUrl: './app-footer-example.component.html'
})
export class AppFooterExampleComponent implements OnDestroy {

  mementoLinkInfos;
  mementoButtonInfos;

  constructor(
    public buttonService: LuxAppFooterButtonService,
    public linkService: LuxAppFooterLinkService,
    private snackbar: LuxSnackbarService
  ) {
    this.mementoButtonInfos = [...this.buttonService.buttonInfos];
    this.mementoLinkInfos = [...this.linkService.linkInfos];
  }

  /**
   * Beim Verlassen der Component sicherheitshalber die Footer-Links und Footer-Buttons leeren.
   */
  ngOnDestroy() {
    this.buttonService.buttonInfos = this.mementoButtonInfos;
    this.linkService.linkInfos = this.mementoLinkInfos;
  }

  addFooterButton() {
    this.buttonService.pushButtonInfos(
      LuxAppFooterButtonInfo.generateInfo({
        cmd: 'btn' + this.buttonService.buttonInfos.length,
        label: 'Neu (' + this.buttonService.buttonInfos.length + ')',
        alwaysVisible: false,
        tooltip: '',
        onClick: this.buttonInfoClicked.bind(this)
      })
    );
  }

  removeFooterButton() {
    this.buttonService.removeButtonInfoAtIndex(this.buttonService.buttonInfos.length - 1);
  }

  buttonInfoClicked(that: LuxAppFooterButtonInfo) {
    this.snackbar.open(2000, {
      text: that.label + ' clicked! [cmd: ' + that.cmd + ']'
    });
  }

  addFooterLink() {
    this.linkService.pushLinkInfos(
      LuxAppFooterLinkInfo.generateInfo({
        label: 'Neu (' + this.linkService.linkInfos.length + ')',
        path: '/components-overview'
      })
    );
  }

  removeFooterLink() {
    this.linkService.removeLinkInfoAtIndex(this.linkService.linkInfos.length - 1);
  }
}
