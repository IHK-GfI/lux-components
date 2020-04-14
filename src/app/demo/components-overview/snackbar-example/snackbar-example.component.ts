import { Component, OnInit } from '@angular/core';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxSnackbarConfig } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar-config';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { LuxBackgroundColorsEnum } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-snackbar-example',
  templateUrl: './snackbar-example.component.html',
  styleUrls: ['./snackbar-example.component.scss']
})
export class SnackbarExampleComponent implements OnInit {
  private dismissSubcr: Subscription;
  private actionSubscr: Subscription;
  colors: string[] = Object.keys(LuxBackgroundColorsEnum);

  showOutputEvents: boolean = false;

  duration: number = 5000;
  snackbarConfig: LuxSnackbarConfig = {
    text: 'Text',
    textColor: 'gray',
    iconName: 'fas fa-info',
    iconColor: 'gray',
    iconSize: '2x',
    action: 'Action',
    actionColor: 'gray'
  };

  constructor(private snackbar: LuxSnackbarService) {}

  ngOnInit() {}

  openSnackbar() {
    this.snackbar.open(this.duration, this.snackbarConfig);
    this.dismissSubcr = this.snackbar.afterDismissed().subscribe(this.observeDismiss.bind(this));
    this.actionSubscr = this.snackbar.onAction().subscribe(this.observeAction.bind(this));
  }

  dismissSnackbar() {
    this.snackbar.dismiss();
  }

  private observeDismiss(payload: MatSnackBarDismiss) {
    logResult(this.showOutputEvents, 'afterDismissed', payload);

    // Subscriptions auflösen, da eine neue Snackbar neue Observables bedeuten sollte
    // (siehe lux-snackbar.service.ts -> _openedSnackBarRef)
    this.dismissSubcr.unsubscribe();
    this.actionSubscr.unsubscribe();
  }

  private observeAction() {
    logResult(this.showOutputEvents, 'onAction');
  }
}
