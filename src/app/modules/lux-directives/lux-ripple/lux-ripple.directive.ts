import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, Optional } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, MatRipple, RippleGlobalOptions } from '@angular/material/core';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subscription } from 'rxjs';

// @dynamic Erklärung steht in der Datei "lux-decorators.ts".
@Directive({
  selector: '[luxRipple], [lux-ripple]',
  host: {
    class: 'mat-ripple lux-ripple',
    '[class.mat-ripple-unbounded]': 'unbounded'
  }
})
export class LuxRippleDirective extends MatRipple implements OnInit, OnDestroy {
  private configSubscription: Subscription;

  _luxRippleColor: string;
  _luxRippleUnbounded = false;
  _luxRippleCentered = false;
  _luxRippleDisabled = false;
  _luxRippleRadius = 0;
  _luxRippleEnterDuration = 0;
  _luxRippleExitDuration = 0;

  get luxRippleColor() {
    return this._luxRippleColor;
  }

  @Input() set luxRippleColor(value: string) {
    this._luxRippleColor = value;
    this.color = value;
  }

  get luxRippleUnbounded() {
    return this._luxRippleUnbounded;
  }

  @Input() set luxRippleUnbounded(value: boolean) {
    this._luxRippleUnbounded = value;
    this.unbounded = value;
  }

  get luxRippleCentered() {
    return this._luxRippleCentered;
  }

  @Input() set luxRippleCentered(value: boolean) {
    this._luxRippleCentered = value;
    this.centered = value;
  }

  get luxRippleRadius() {
    return this._luxRippleRadius;
  }

  @Input() set luxRippleRadius(value: number) {
    this._luxRippleRadius = value;
    this.radius = value;
  }

  get luxRippleDisabled() {
    return this._luxRippleDisabled;
  }

  @Input() set luxRippleDisabled(value: boolean) {
    this._luxRippleDisabled = value;
    this.disabled = value;
  }

  get luxRippleEnterDuration() {
    return this._luxRippleEnterDuration;
  }

  @Input() set luxRippleEnterDuration(value: number) {
    this._luxRippleEnterDuration = value;

    if (!this.animation) {
      this.animation = {};
    }
    this.animation.exitDuration = value;
  }

  get luxRippleExitDuration() {
    return this._luxRippleExitDuration;
  }

  @Input() set luxRippleExitDuration(value: number) {
    this._luxRippleExitDuration = value;

    if (!this.animation) {
      this.animation = {};
    }
    this.animation.exitDuration = value;
  }

  constructor(
    private configService: LuxComponentsConfigService,
    private luxElementRef: ElementRef<HTMLElement>,
    private luxNgZone: NgZone,
    private luxPlatform: Platform,
    @Optional() @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) private luxGlobalOptions?: RippleGlobalOptions,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private luxAnimationMode?: string
  ) {
    super(luxElementRef, luxNgZone, luxPlatform, luxGlobalOptions, luxAnimationMode);
  }

  ngOnInit() {
    super.ngOnInit();

    // Globale Konfiguration für die LUX-Ripples auslesen und die Component entsprechend aktualisieren
    this.configSubscription = this.configService.config.subscribe(({ rippleConfiguration }) => {
      if (rippleConfiguration) {
        this.luxRippleEnterDuration = rippleConfiguration.enterDuration;
        this.luxRippleExitDuration = rippleConfiguration.exitDuration;
        this.luxRippleColor = rippleConfiguration.color;
        this.luxRippleCentered = rippleConfiguration.centered;
        this.luxRippleDisabled = rippleConfiguration.disabled;
        this.luxRippleRadius = rippleConfiguration.radius;
        this.luxRippleUnbounded = rippleConfiguration.unbounded;
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
