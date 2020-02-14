import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'lux-accordion',
  templateUrl: './lux-accordion.component.html'
})
export class LuxAccordionComponent implements OnInit, OnDestroy {
  changed$ = new Subject();

  @Input() luxMode: 'default' | 'flat' = 'default';
  @Input() luxMulti: boolean = false;

  _luxDisabled: boolean = false;
  _luxHideToggle: boolean = false;
  _luxExpandedHeaderHeight: string;
  _luxCollapsedHeaderHeight: string;

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

  set luxExpandedHeaderHeight(height: string) {
    this._luxExpandedHeaderHeight = height;

    this.changed$.next('luxExpandedHeaderHeight');
  }

  @Input()
  get luxCollapsedHeaderHeight() {
    return this._luxCollapsedHeaderHeight;
  }

  set luxCollapsedHeaderHeight(height: string) {
    this._luxCollapsedHeaderHeight = height;

    this.changed$.next('luxCollapsedHeaderHeight');
  }

  @ViewChild(MatAccordion, { static: true }) matAccordion: MatAccordion;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.changed$.complete();
  }
}
