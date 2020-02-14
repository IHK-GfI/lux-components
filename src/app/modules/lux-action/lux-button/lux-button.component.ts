import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subscription } from 'rxjs';
import { LuxActionComponentBaseClass } from '../lux-action-model/lux-action-component-base.class';

@Component({
  selector: 'lux-button',
  templateUrl: './lux-button.component.html',
  styleUrls: ['./lux-button.component.scss']
})
export class LuxButtonComponent extends LuxActionComponentBaseClass implements OnInit, OnDestroy {
  public readonly iconSize: string = '2x';

  private configSubscription: Subscription;

  @Input() luxType: 'button' | 'reset' | 'submit' = 'button';

  @HostBinding('class.lux-uppercase') labelUppercase: boolean;

  constructor(public elementRef: ElementRef, public componentsConfigService: LuxComponentsConfigService) {
    super();
  }

  ngOnInit() {
    this.configSubscription = this.componentsConfigService.config.subscribe(() => {
      // Hintergrund: LuxLink, LuxSideNavItem und LuxMenuItem benutzen alle unter der Haube
      // den LuxButton. Wenn diese nun als Ausnahmen für Uppercase in der Config eingetragen werden,
      // darf eine Uppercase-Einstellung für den LuxButton diese nicht überschreiben.
      // Deshalb prüft der LuxButton hier, ob er Teil einer dieser Komponenten ist.
      this.detectParent();
    });
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

  clicked(event: any) {
    this.luxClicked.emit(event);
  }

  private detectParent() {
    const className = this.elementRef.nativeElement.className;
    let selector = 'lux-button';
    if (className.indexOf('lux-link') > -1) {
      selector = 'lux-link';
    } else if (className.indexOf('lux-side-nav-item') > -1) {
      selector = 'lux-side-nav-item';
    } else if (className.indexOf('lux-menu-item') > -1) {
      selector = 'lux-menu-item';
    }
    this.labelUppercase = this.componentsConfigService.isLabelUppercaseForSelector(selector);
  }
}
