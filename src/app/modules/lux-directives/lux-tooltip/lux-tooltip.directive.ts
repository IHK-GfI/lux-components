import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  Optional,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  MatTooltipDefaultOptions,
  TooltipPosition
} from '@angular/material/tooltip';

@Directive({
  selector: '[luxTooltip]',
  exportAs: 'luxTooltip'
})
export class LuxTooltipDirective extends MatTooltip implements OnChanges {
  @Input() luxTooltip = '???';
  @Input() luxTooltipHideDelay = 0;
  @Input() luxTooltipShowDelay = 0;
  @Input() luxTooltipPosition: TooltipPosition = 'above';
  @Input() luxTooltipDisabled = false;

  constructor(
    private luxOverlay: Overlay,
    private luxElementRef: ElementRef,
    private luxScrollDispatcher: ScrollDispatcher,
    private luxViewContainerRef: ViewContainerRef,
    private luxNgZone: NgZone,
    private luxPlatform: Platform,
    private luxAriaDescriber: AriaDescriber,
    private luxFocusMonitor: FocusMonitor,
    @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) private luxScrollStrategy: ScrollStrategy,
    @Optional() private luxDir: Directionality,
    @Optional() @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS) private luxDefaultOptions: MatTooltipDefaultOptions,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {
    super(
      luxOverlay,
      luxElementRef,
      luxScrollDispatcher,
      luxViewContainerRef,
      luxNgZone,
      luxPlatform,
      luxAriaDescriber,
      luxFocusMonitor,
      luxScrollStrategy,
      luxDir,
      luxDefaultOptions,
      document
    );
  }

  @HostListener('longpress') _handleLongPress() {
    super.show(this.luxTooltipShowDelay);
  }

  @HostListener('document:keydown.escape', ['$event']) _handleEscape() {
    super.hide(0);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.message = this.luxTooltip;
    this.hideDelay = this.luxTooltipHideDelay;
    this.showDelay = this.luxTooltipShowDelay;
    this.position = this.luxTooltipPosition;
    this.disabled = this.luxTooltipDisabled;
  }
}
