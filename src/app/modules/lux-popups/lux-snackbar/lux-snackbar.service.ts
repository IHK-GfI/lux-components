import { ComponentType } from '@angular/cdk/portal';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { LuxAppService } from '../../lux-util/lux-app.service';
import { LuxSnackbarComponent } from './lux-snackbar-component/lux-snackbar.component';
import { LuxSnackbarConfig } from './lux-snackbar-config';

/**
 * Über den LuxSnackbarService können einfach Snackbar-Informationen angezeigt werden.
 */
@Injectable({
  providedIn: 'root'
})
export class LuxSnackbarService implements OnDestroy {
  private static readonly VERTICAL_POSITION = 'top';
  private static readonly HORIZONTAL_POSITION = 'end';

  private afterOpenedSubscription?: Subscription;
  private resizeSubscription: Subscription;

  constructor(private snackBar: MatSnackBar, private appService: LuxAppService) {
    this.resizeSubscription = appService.resize$.asObservable().subscribe(() => {
      this.updateSnackbarPosition(false);
    });
  }

  /**
   * Diese Methode öffnet eine Snackbar mit einem Text.
   * @param message Ein Text.
   * @param duration Eine Dauer in Msec (z.B. 2000 = 2 Sekunden). Wenn die Snackbar permanent angezeigt werden soll,
   * muss der Wert 0 angegeben werden.
   * @param actionName Eine Bezeichnung (z.B. Wiederherstellen) für die Action. Dieser Parameter ist optional und
   * muss nicht angegeben werden.
   */
  public openText(message: string, duration: number, actionName?: string): void {
    const snackbarRef = this.snackBar.open(message, actionName, {
      duration,
      verticalPosition: LuxSnackbarService.VERTICAL_POSITION,
      horizontalPosition: LuxSnackbarService.HORIZONTAL_POSITION,
      panelClass: 'lux-snackbar'
    });

    this.afterOpenedSubscription = snackbarRef.afterOpened().subscribe(() => {
      this.updateSnackbarPosition(true);
      this.afterOpenedSubscription?.unsubscribe();
    });
  }

  /**
   * Diese Methode öffnet eine Snackbar, in der die übergebene Komponente angezeigt wird.
   * @param component Die Komponente, die angezeigt werden soll.
   * @param duration Eine Dauer in Msec (z.B. 2000 = 2 Sekunden). Wenn die Snackbar permanent angezeigt werden soll,
   * muss der Wert 0 angegeben werden.
   * @param data Ein Datenobjekt, das an die Komponente weitergereicht wird. Mit dem Code folgenden Code können die
   * Daten verwendet werden. constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any).
   */
  public openComponent(component: ComponentType<any>, duration = 0, data?: any) {
    const snackbarRef = this.snackBar.openFromComponent(component, {
      duration,
      data,
      verticalPosition: LuxSnackbarService.VERTICAL_POSITION,
      horizontalPosition: LuxSnackbarService.HORIZONTAL_POSITION,
      panelClass: 'lux-snackbar'
    });

    this.afterOpenedSubscription = snackbarRef.afterOpened().subscribe(() => {
      this.updateSnackbarPosition(true);
      this.afterOpenedSubscription?.unsubscribe();
    });
  }

  /**
   * Öffnet eine Snackbar anhand der übergebenen Konfiguration.
   * Ermöglicht eine genaue Konfiguration der Snackbar.
   * @param duration
   * @param config
   */
  public open(duration: number, config?: LuxSnackbarConfig) {
    const snackbarRef = this.snackBar.openFromComponent(LuxSnackbarComponent, {
      duration,
      data: config,
      verticalPosition: LuxSnackbarService.VERTICAL_POSITION,
      horizontalPosition: LuxSnackbarService.HORIZONTAL_POSITION,
      panelClass: 'lux-snackbar'
    });

    this.afterOpenedSubscription = snackbarRef.afterOpened().subscribe(() => {
      this.updateSnackbarPosition(true);
      this.afterOpenedSubscription?.unsubscribe();
    });
  }

  /**
   * Diese Methode liefert ein Observable zurück, das den Aufrufer benachrichtigt, wenn die Action in der Snackbar
   * geklickt wird.
   */
  public onAction(): Observable<void> {
    if (!this.snackBar._openedSnackBarRef) {
      throw Error('Snackbar-Ref is not found!');
    }

    if (this.snackBar._openedSnackBarRef.instance instanceof LuxSnackbarComponent) {
      return this.snackBar._openedSnackBarRef.instance.onAction();
    }

    return this.snackBar._openedSnackBarRef.onAction();
  }

  /**
   * Diese Methode liefert ein Observable zurück, das den Aufrufer benachrichtigt, wenn die Action in der Snackbar
   * geklickt wird.
   */
  public afterDismissed(): Observable<MatSnackBarDismiss> {
    if (!this.snackBar._openedSnackBarRef) {
      throw Error('Snackbar-Ref is not found!');
    }

    return this.snackBar._openedSnackBarRef.afterDismissed();
  }

  /**
   * Diese Methode blendet die Snackbar aus.
   */
  public dismiss() {
    this.snackBar.dismiss();
  }

  ngOnDestroy() {
    if (this.afterOpenedSubscription) {
      this.afterOpenedSubscription.unsubscribe();
    }

    this.resizeSubscription.unsubscribe();
  }

  private updateSnackbarPosition(logError: boolean) {
    const snackbarContainerArr = document.getElementsByClassName('mat-mdc-snack-bar-container');

    if (snackbarContainerArr.length > 0) {
      const snackbarEl = snackbarContainerArr[0] as HTMLElement;
      const snackbarElParent = snackbarContainerArr[0].parentElement as HTMLElement;
      const snackbarLabelEL = snackbarEl.getElementsByClassName('mat-mdc-snack-bar-label')[0] as HTMLElement;
      // Die Overlay-Paine für die Snackbar muss verschoben werden, da diese sonst den Header blockiert
      snackbarElParent.style.top = this.appService.getAppTop() + this.appService.getHeaderHeight() + 3 /* Abstand zum Header */ + 'px';
      snackbarElParent.style.right = this.appService.getAppRight() + 3 /* Abstand zum Rand */ + 'px';
      snackbarElParent.style.position = 'absolute';
      snackbarEl.style.visibility = 'visible';
      snackbarLabelEL.style.visibility = 'visible';
    } else {
      if (logError) {
        console.error('Snackbar (mat-mdc-snack-bar-container) could not be found! The snackbar is not shown.');
      }
    }
  }
}
