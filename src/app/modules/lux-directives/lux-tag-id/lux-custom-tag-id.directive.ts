import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { LuxTagIdDirective } from './lux-tag-id.directive';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../../lux-components-config/lux-components-config-parameters.interface';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[luxCustomTagId]'
})
export class LuxCustomTagIdDirective implements AfterViewInit, OnDestroy {
  
  generateLuxTagIds = false;
  configSubscription: Subscription;

  @Input() luxCustomTagId?: string;
  @Input() luxCustomTagIdSelector?: string;

  public constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    public componentsConfigService: LuxComponentsConfigService
  ) {
    this.configSubscription = this.componentsConfigService.config.subscribe((newConfig: LuxComponentsConfigParameters) => {
      this.generateLuxTagIds = newConfig.generateLuxTagIds ?? false;
    });
  }

  ngAfterViewInit(): void {
    if (this.generateLuxTagIds) {

      let el;
      if (this.luxCustomTagIdSelector) {
        el = this.elementRef.nativeElement.querySelector(this.luxCustomTagIdSelector);
      } else {
        el = this.elementRef.nativeElement;
      }

      if (el) {
        this.renderer.setAttribute(el, LuxTagIdDirective.luxTagIdAttrName, this.luxCustomTagId ?? '');
      }
    }
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

}
