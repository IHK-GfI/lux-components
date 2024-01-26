import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA,
  MatLegacySnackBarRef as MatSnackBarRef
} from '@angular/material/legacy-snack-bar';
import { LuxSnackbarColor, LuxSnackbarColors } from '../../../lux-util/lux-colors.enum';
import { LuxSnackbarConfig } from '../lux-snackbar-config';
import { Observable, Subject } from 'rxjs';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-snackbar',
  templateUrl: './lux-snackbar.component.html'
})
export class LuxSnackbarComponent implements OnInit {
  private action$: Subject<void> = new Subject<void>();

  textFontColor = '';
  actionFontColor = '';
  iconFontColor = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public config: LuxSnackbarConfig, public snackbarRef: MatSnackBarRef<LuxSnackbarComponent>) {}

  ngOnInit() {
    Object.keys(this.config).forEach((key: string) => {
      if ((this.config as any)[key]) {
        (this.config as any)[key] = (this.config as any)[key].trim();
      }
    });
    // stupid-cast, um den string weiterzugeben, da die fn daraus den enum-wert herleiten kann
    this.textFontColor = LuxUtil.getColorsByBgColorsEnum(this.checkColorInEnum(this.config.textColor)).backgroundCSSClass;
    this.actionFontColor = LuxUtil.getColorsByBgColorsEnum(this.checkColorInEnum(this.config.actionColor)).backgroundCSSClass;
    this.iconFontColor = LuxUtil.getColorsByBgColorsEnum(this.checkColorInEnum(this.config.iconColor)).backgroundCSSClass;
  }

  onAction(): Observable<void> {
    return this.action$.asObservable();
  }

  actionClick() {
    this.snackbarRef.dismiss();
    this.action$.next();
  }

  /**
   * Prüft, ob die übergebene Farbe Teil des Enums ist.
   * Wenn nicht, wird standardmäßig "gray" zurückgegeben.
   *
   * @param colorToCheck
   */
  private checkColorInEnum(colorToCheck: string | undefined): LuxSnackbarColor {
    const found = LuxSnackbarColors.find((entry) => entry === colorToCheck);
    return found ?? 'gray';
  }
}
