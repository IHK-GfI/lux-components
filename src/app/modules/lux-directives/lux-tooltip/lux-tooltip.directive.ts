import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
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
} from '@angular/material';

@Directive({
  selector: '[luxTooltip]',
  exportAs: 'luxTooltip'
})
export class LuxTooltipDirective extends MatTooltip implements OnChanges {
  @Input() luxTooltip: string = '???';
  @Input() luxTooltipHideDelay: number = 0;
  @Input() luxTooltipShowDelay: number = 0;
  @Input() luxTooltipPosition: TooltipPosition = 'above';
  @Input() luxTooltipDisabled: boolean = false;

  constructor(
    private luxOverlay: Overlay,
    private luxElementRef: ElementRef,
    private luxScrollDispatcher: ScrollDispatcher,
    private luxViewContainerRef: ViewContainerRef,
    private luxNgZone: NgZone,
    private luxPlatform: Platform,
    private luxAriaDescriber: AriaDescriber,
    private luxFocusMonitor: FocusMonitor,
    @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) private luxScrollStrategy,
    @Optional() private luxDir: Directionality,
    @Optional()
    @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS)
    private luxDefaultOptions: MatTooltipDefaultOptions
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
      luxDefaultOptions
    );
  }

  @HostListener('longpress') _handleLongPress() {
    super.show(this.luxTooltipShowDelay);
  }

  @HostListener('keydown', ['$event']) _handleKeydown(event) {
    super._handleKeydown(event);
  }

  @HostListener('touchend') _handleTouchend() {
    super._handleTouchend();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.message = this.luxTooltip;
    this.hideDelay = this.luxTooltipHideDelay;
    this.showDelay = this.luxTooltipShowDelay;
    this.position = this.luxTooltipPosition;
    this.disabled = this.luxTooltipDisabled;
  }
}
