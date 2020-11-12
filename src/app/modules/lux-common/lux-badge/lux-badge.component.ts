import { Component, Input, OnInit } from '@angular/core';
import { LuxBackgroundColorsEnum } from '../../lux-util/lux-colors.enum';
import { LuxUtil } from '../../lux-util/lux-util';

@Component({
  selector: 'lux-badge',
  templateUrl: './lux-badge.component.html',
  styleUrls: ['./lux-badge.component.scss']
})
export class LuxBadgeComponent implements OnInit {
  readonly ICON_SIZE: string = '1x';
  readonly DEFAULT_BADGE_COLOR = LuxBackgroundColorsEnum.gray;

  @Input() luxUppercase: boolean = true;
  @Input() luxIconName: string = '';

  showBorder = false;

  constructor() {
    this.luxColor = this.DEFAULT_BADGE_COLOR;
  }

  private _backgroundCSSClass: string = '';

  get backgroundCSSClass() {
    return this._backgroundCSSClass;
  }

  private _fontCSSClass: string = '';

  public get fontCSSClass() {
    return this._fontCSSClass;
  }

  @Input()
  set luxColor(color: LuxBackgroundColorsEnum) {
    const result = LuxUtil.getColorsByBgColorsEnum(color);
    this._backgroundCSSClass = result.backgroundCSSClass;
    this._fontCSSClass = result.fontCSSClass;
    this.showBorder = color === LuxBackgroundColorsEnum.white ? true : false;

    if (!LuxBackgroundColorsEnum[color]) {
      this.luxColor = this.DEFAULT_BADGE_COLOR;
    }
  }

  ngOnInit() {}
}
