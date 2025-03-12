import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion, MatAccordionDisplayMode, MatAccordionTogglePosition } from "@angular/material/expansion";
import { Subject } from 'rxjs';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxAccordionColor, LuxAccordionColors } from '../../lux-util/lux-colors.enum';

export declare type LuxModeType = MatAccordionDisplayMode;
export declare type LuxTogglePosition = MatAccordionTogglePosition | undefined;

@Component({
  selector: 'lux-accordion',
  templateUrl: './lux-accordion.component.html'
})
export class LuxAccordionComponent implements AfterViewInit, OnDestroy {
  changed$ = new Subject();
  private _luxColor?: LuxAccordionColor = 'primary';

  @Input() luxMode: LuxModeType = 'default';
  @Input() luxMulti = false;
  @Input()
    set luxColor(value: LuxAccordionColor | undefined) {
      this._luxColor = LuxAccordionColors.find((entry) => entry === value) ?? undefined;
    }

  _luxDisabled?: boolean;
  _luxHideToggle?: boolean;
  _luxExpandedHeaderHeight?: string;
  _luxCollapsedHeaderHeight?: string;
  _luxTogglePosition?: LuxTogglePosition;

  @Input()
  get luxDisabled() {
    return this._luxDisabled;
  }

  set luxDisabled(disabled: boolean | undefined) {
    this._luxDisabled = disabled;

    this.changed$.next('luxDisabled');
  }

  @Input()
  get luxHideToggle() {
    return this._luxHideToggle;
  }

  set luxHideToggle(hideToggle: boolean | undefined) {
    this._luxHideToggle = hideToggle;

    this.changed$.next('luxHideToggle');
  }

  @Input()
  get luxExpandedHeaderHeight() {
    return this._luxExpandedHeaderHeight;
  }

  set luxExpandedHeaderHeight(height: string | undefined) {
    this._luxExpandedHeaderHeight = height;

    this.changed$.next('luxExpandedHeaderHeight');
  }

  @Input()
  get luxCollapsedHeaderHeight() {
    return this._luxCollapsedHeaderHeight;
  }

  set luxCollapsedHeaderHeight(height: string | undefined) {
    this._luxCollapsedHeaderHeight = height;

    this.changed$.next('luxCollapsedHeaderHeight');
  }

  @Input()
  get luxTogglePosition() {
    return this._luxTogglePosition;
  }

  set luxTogglePosition(position: LuxTogglePosition) {
    this._luxTogglePosition = position;

    this.changed$.next('luxTogglePosition');
  }

  @ViewChild(MatAccordion, { static: true }) matAccordion!: MatAccordion;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('matAccordion', this.matAccordion);
  }

  ngOnDestroy() {
    this.changed$.complete();
  }

  get luxColor(): LuxAccordionColor | undefined {
      return this._luxColor;
    }
}
