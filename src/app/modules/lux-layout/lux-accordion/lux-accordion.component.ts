import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion, MatAccordionDisplayMode } from "@angular/material/expansion";
import { Subject } from 'rxjs';
import { LuxUtil } from '../../lux-util/lux-util';

export declare type LuxModeType = MatAccordionDisplayMode;

@Component({
  selector: 'lux-accordion',
  templateUrl: './lux-accordion.component.html'
})
export class LuxAccordionComponent implements AfterViewInit, OnDestroy {
  changed$ = new Subject();

  @Input() luxMode: LuxModeType = 'default';
  @Input() luxMulti = false;

  _luxDisabled = false;
  _luxHideToggle = false;
  _luxExpandedHeaderHeight?: string;
  _luxCollapsedHeaderHeight?: string;

  @Input()
  get luxDisabled() {
    return this._luxDisabled;
  }

  set luxDisabled(disabled: boolean) {
    this._luxDisabled = disabled;

    this.changed$.next('luxDisabled');
  }

  @Input()
  get luxHideToggle() {
    return this._luxHideToggle;
  }

  set luxHideToggle(hideToggle: boolean) {
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

  @ViewChild(MatAccordion, { static: true }) matAccordion!: MatAccordion;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('matAccordion', this.matAccordion)
  }

  ngOnDestroy() {
    this.changed$.complete();
  }
}
