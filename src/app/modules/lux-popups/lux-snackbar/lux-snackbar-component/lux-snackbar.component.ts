import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { LuxSnackbarConfig } from '../lux-snackbar-config';
import { Observable, Subject } from 'rxjs';
import { LuxUtil } from '../../../lux-util/lux-util';
import { LuxBackgroundColorsEnum } from '../../../lux-util/lux-colors.enum';

@Component({
  selector: 'lux-snackbar',
  templateUrl: './lux-snackbar.component.html',
  styleUrls: ['./lux-snackbar.component.scss']
})
export class LuxSnackbarComponent implements OnInit {
  private action$: Subject<void> = new Subject<void>();

  textFontColor: string;
  actionFontColor: string;
  iconFontColor: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public config: LuxSnackbarConfig,
    public snackbarRef: MatSnackBarRef<LuxSnackbarComponent>
  ) {}

  ngOnInit() {
    Object.keys(this.config).forEach((key: string) => {
      if (this.config[key]) {
        this.config[key] = this.config[key].trim();
      }
    });
    // stupid-cast, um den string weiterzugeben, da die fn daraus den enum-wert herleiten kann
    this.textFontColor = LuxUtil.getColorsByBgColorsEnum(
      this.checkColorInEnum(this.config.textColor)
    ).backgroundCSSClass;
    this.actionFontColor = LuxUtil.getColorsByBgColorsEnum(
      this.checkColorInEnum(this.config.actionColor)
    ).backgroundCSSClass;
    this.iconFontColor = LuxUtil.getColorsByBgColorsEnum(
      this.checkColorInEnum(this.config.iconColor)
    ).backgroundCSSClass;
  }

  onAction(): Observable<void> {
    return this.action$.asObservable();
  }

  actionClick() {
    this.snackbarRef.dismiss();
    this.action$.next();
  }

  /**
   * Prüft ob die übergebene Farbe Teil des Enums ist.
   * Wenn nicht, wird standardmäßig "gray" zurückgegeben.
   * @param colorToCheck
   */
  private checkColorInEnum(colorToCheck: string): LuxBackgroundColorsEnum {
    if (LuxBackgroundColorsEnum[colorToCheck]) {
      return LuxBackgroundColorsEnum[colorToCheck];
    }
    return LuxBackgroundColorsEnum.gray;
  }
}
