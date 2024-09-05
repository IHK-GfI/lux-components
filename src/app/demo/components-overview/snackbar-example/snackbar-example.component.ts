import { Component, OnDestroy } from '@angular/core';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxSnackbarConfig } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar-config';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { LuxSnackbarColors } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-snackbar-example',
  templateUrl: './snackbar-example.component.html'
})
export class SnackbarExampleComponent implements OnDestroy {
  dismissSubscription: Subscription | null = null;
  actionSubscription: Subscription | null = null;
  colors: string[] = LuxSnackbarColors;

  showOutputEvents = false;

  duration = 10000;
  snackbarConfig: LuxSnackbarConfig = {
    text: 'Text',
    textColor: 'gray',
    iconName: 'lux-interface-alert-information-circle',
    iconColor: 'gray',
    iconSize: '2x',
    action: 'Action',
    actionColor: 'gray'
  };

  constructor(private snackbar: LuxSnackbarService) { }

  ngOnDestroy(): void {
    if (this.dismissSubscription) {
      this.dismissSubscription.unsubscribe();
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  openSnackbar() {
    this.snackbar.open(this.duration, this.snackbarConfig);
    this.dismissSubscription = this.snackbar.afterDismissed().subscribe(this.observeDismiss.bind(this));
    this.actionSubscription = this.snackbar.onAction().subscribe(this.observeAction.bind(this));
  }

  dismissSnackbar() {
    this.snackbar.dismiss();
  }

  private observeDismiss(payload: MatSnackBarDismiss) {
    logResult(this.showOutputEvents, 'afterDismissed', payload);

    // Subscriptions auflösen, da eine neue Snackbar neue Observables bedeuten sollte
    // (siehe lux-snackbar.service.ts -> _openedSnackBarRef)
    if (this.dismissSubscription) {
      this.dismissSubscription.unsubscribe();
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  private observeAction() {
    logResult(this.showOutputEvents, 'onAction');
  }
}
