import { Component, Input, OnInit } from '@angular/core';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxBackgroundColorsEnum } from '../../lux-util/lux-colors.enum';

export declare type PROGRESS_MODES = 'determinate' | 'indeterminate';
export declare type PROGRESS_TYPES = 'Progressbar' | 'Spinner';

@Component({
  selector: 'lux-progress',
  templateUrl: './lux-progress.component.html',
  styleUrls: ['./lux-progress.component.scss']
})
export class LuxProgressComponent implements OnInit {
  readonly DEFAULT_PROGRESS_COLOR = LuxBackgroundColorsEnum.blue;

  private _luxMode: PROGRESS_MODES;
  private _luxType: PROGRESS_TYPES;
  private _luxColor: LuxBackgroundColorsEnum;

  isIE: boolean = false;
  animDurationCSS: string = '';
  typeCSS: string = '';

  @Input() luxValue: number = 0;
  // Nur für ProgressBar
  @Input() luxSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() luxTagId: string;

  @Input()
  set luxColor(value: LuxBackgroundColorsEnum) {
    this._luxColor = LuxBackgroundColorsEnum[value] ? LuxBackgroundColorsEnum[value] : this.DEFAULT_PROGRESS_COLOR;
  }

  get luxColor() {
    return this._luxColor;
  }

  @Input() set luxMode(mode: PROGRESS_MODES) {
    this._luxMode = mode;
  }

  get luxMode() {
    if (this._luxMode !== 'determinate' && this._luxMode !== 'indeterminate') {
      return 'indeterminate';
    }
    return this._luxMode;
  }

  @Input() set luxType(type: PROGRESS_TYPES) {
    this._luxType = type;
    if (this._luxType === 'Progressbar') {
      this.typeCSS = 'lux-progress-bar';
    } else if (this._luxType === 'Spinner') {
      this.typeCSS = 'lux-progress-spinner';
    } else {
      this.luxType = 'Progressbar';
    }
  }

  get luxType() {
    return this._luxType;
  }

  constructor() {
    this.luxMode = 'indeterminate';
    this.luxType = 'Progressbar';
  }

  ngOnInit() {
    this.isIE = LuxUtil.isIE();
  }
}
