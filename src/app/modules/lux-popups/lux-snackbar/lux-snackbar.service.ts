import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { LuxSnackbarComponent } from './lux-snackbar-component/lux-snackbar.component';
import { LuxSnackbarConfig } from './lux-snackbar-config';

/**
 * Über den LuxSnackbarService können einfach Snackbarinfos angezeigt werden.
 */
@Injectable()
export class LuxSnackbarService {
  private static readonly VERTICAL_POSITION = 'top';
  private static readonly HORIZONTAL_POSITION = 'end';

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Diese Methode öffnet eine Snackbar mit einem Text.
   *
   * @param message Ein Text.
   * @param duration Eine Dauer in Msec (z.B. 2000 = 2 Sekunden). Wenn die Snackbar permanent angezeigt werden soll,
   * muss der Wert 0 angegeben werden.
   * @param actionName Eine Bezeichnung (z.B. Wiederherstellen) für die Action. Dieser Parameter ist optional und
   * muss nicht angegeben werden.
   */
  public openText(message: string, duration: number, actionName?: string): void {
    this.snackBar.open(message, actionName, {
      duration,
      verticalPosition: LuxSnackbarService.VERTICAL_POSITION,
      horizontalPosition: LuxSnackbarService.HORIZONTAL_POSITION,
      panelClass: 'lux-snackbar'
    });
  }

  /**
   * Diese Methode öffnet eine Snackbar, in der die übergebene Komponente angezeigt wird.
   *
   * @param component Die Komponente, die angezeigt werden soll.
   * @param duration Eine Dauer in Msec (z.B. 2000 = 2 Sekunden). Wenn die Snackbar permanent angezeigt werden soll,
   * muss der Wert 0 angegeben werden.
   * @param data Ein Datenobjekt, das an die Komponente weitergereicht wird. Mit dem Code folgenden Code, können die
   * Daten verwendet werden. constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any).
   */
  public openComponent(component: ComponentType<any>, duration: number = 0, data?: any) {
    this.snackBar.openFromComponent(component, {
      duration,
      data,
      verticalPosition: LuxSnackbarService.VERTICAL_POSITION,
      horizontalPosition: LuxSnackbarService.HORIZONTAL_POSITION,
      panelClass: 'lux-snackbar'
    });
  }

  /**
   * Oeffnet eine Snackbar anhand der uebergebenen Konfiguration.
   * Ermoeglicht eine genaue Konfiguration der Snackbar.
   *
   * @param duration
   * @param config
   */
  public open(duration: number, config?: LuxSnackbarConfig) {
    this.snackBar.openFromComponent(LuxSnackbarComponent, {
      duration,
      data: config,
      verticalPosition: LuxSnackbarService.VERTICAL_POSITION,
      horizontalPosition: LuxSnackbarService.HORIZONTAL_POSITION,
      panelClass: 'lux-snackbar'
    });
  }

  /**
   * Diese Methode liefert ein Observable zurück, das den Aufrufer benachrichtigt, wenn die Action in der Snackbar
   * geklickt wird.
   */
  public onAction(): Observable<void> {
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
    return this.snackBar._openedSnackBarRef.afterDismissed();
  }

  /**
   * Diese Methode blendet die Snackbar aus.
   */
  public dismiss() {
    this.snackBar.dismiss();
  }
}
