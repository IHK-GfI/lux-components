import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { LuxIconColor, LuxIconColors } from '../../lux-util/lux-colors.enum';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxIconRegistryService } from './lux-icon-registry.service';

@Component({
  selector: 'lux-icon',
  templateUrl: './lux-icon.component.html',
  styleUrls: ['./lux-icon.component.scss']
})
export class LuxIconComponent {
  private _luxIconSize: string | undefined = '';
  private _luxIconName = '';
  private _luxPadding = '4px';
  private _backgroundCSSClass = '';
  private _fontCSSClass = 'blue';

  notFoundIconName = 'lux-interface-alert-warning-diamond';
  currentIconSize = 1;

  @HostBinding('style.margin') styleMargin = '0';
  @HostBinding('class.lux-no-size') noSize = true;

  @Input() luxRounded = false;

  get luxMargin(): string {
    return this.styleMargin;
  }

  // 'standard margin Werte z.B. '5px 4px 3px 2px'
  @Input() set luxMargin(margin: string) {
    this.styleMargin = margin;
  }

  get luxPadding(): string {
    return this._luxPadding;
  }

  // standard padding Werte z.B. '5px 4px 3px 2px'
  @Input() set luxPadding(padding: string) {
    this._luxPadding = padding;
  }

  get luxIconSize(): string | undefined {
    return this._luxIconSize;
  }

  @Input() set luxIconSize(iconSizeValue: string | undefined) {
    this._luxIconSize = iconSizeValue;
    if (this.luxIconSize && this.luxIconSize.length === 2) {
      this.currentIconSize = +this.luxIconSize.slice(0, 1);
      this.noSize = false;
    } else {
      this.currentIconSize = 1;
      this.noSize = true;
    }
  }

  get luxIconName(): string | undefined {
    return this._luxIconName;
  }

  @Input()
  set luxIconName(iconNameValue: string | undefined) {
    if (iconNameValue) {
      this._luxIconName = iconNameValue;
      this.registerIcon(iconNameValue);
    } else {
      this._luxIconName = '';
    }
  }

  get backgroundCSSClass() {
    return this._backgroundCSSClass;
  }

  public get fontCSSClass() {
    return this._fontCSSClass;
  }

  @Input()
  set luxColor(color: LuxIconColor) {
    if (LuxIconColors.find((entry) => entry === color)) {
      const result = LuxUtil.getColorsByBgColorsEnum(color);
      this._backgroundCSSClass = result.backgroundCSSClass;
      this._fontCSSClass = result.fontCSSClass;
    } else {
      this._backgroundCSSClass = '';
      this._fontCSSClass = '';
    }
  }

  @Output() luxLoad = new EventEmitter<Event>();

  constructor(private iconReg: LuxIconRegistryService) {}

  private registerIcon(iconName: string) {
    try {
      this.iconReg.registerIcon(iconName);
    } catch (error) {
      console.warn(
        `Das Icon "${iconName}" konnte nicht gefunden werden. Stattdessen wird das Icon "${this.notFoundIconName}" verwendet. Bitte anpassen!`
      );
      this.luxIconName = this.notFoundIconName;
    }
  }
}
