import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subject, Subscription } from 'rxjs';
import { LuxActionComponentBaseClass } from '../lux-action-model/lux-action-component-base.class';
import { throttleTime } from 'rxjs/operators';
import { LuxThemePalette } from '../../lux-util/lux-colors.enum';

@Component({
  selector: 'lux-button',
  templateUrl: './lux-button.component.html',
  styleUrls: ['./lux-button.component.scss']
})
export class LuxButtonComponent extends LuxActionComponentBaseClass implements OnInit, OnDestroy {
  private configSubscription!: Subscription;

  private clickSubject = new Subject<MouseEvent>();
  private clickSubscription!: Subscription;

  private auxClickSubject = new Subject<MouseEvent>();
  private auxClickSubscription!: Subscription;

  @Input() luxType: 'button' | 'reset' | 'submit' = 'button';
  @Input() luxThrottleTime!: number;
  @Input() luxButtonBadge?: string;
  @Input() luxButtonBadgeColor?: LuxThemePalette = 'primary';

  @Output() luxAuxClicked = new EventEmitter<Event>();

  @HostBinding('class.lux-uppercase') labelUppercase!: boolean;

  constructor(public elementRef: ElementRef, public componentsConfigService: LuxComponentsConfigService) {
    super();
  }

  ngOnInit() {
    if (!this.luxThrottleTime) {
      this.luxThrottleTime = this.componentsConfigService.currentConfig.buttonConfiguration?.throttleTimeMs
        ? this.componentsConfigService.currentConfig.buttonConfiguration.throttleTimeMs
        : LuxComponentsConfigService.DEFAULT_CONFIG.buttonConfiguration.throttleTimeMs;
    }

    if ((this.luxRaised && this.luxFlat) || (this.luxRaised && this.luxStroked) || (this.luxStroked && this.luxFlat)) {
      console.log(
        'Es kann nur eine Property gesetzt werden!',
        'luxRaised: ',
        this.luxRaised,
        'luxFlat: ',
        this.luxFlat,
        'luxStroked: ',
        this.luxStroked
      );
    }

    this.configSubscription = this.componentsConfigService.config.subscribe(() => {
      // Hintergrund: LuxLink, LuxSideNavItem und LuxMenuItem benutzen alle unter der Haube
      // den LuxButton. Wenn diese nun als Ausnahmen für Uppercase in der Config eingetragen werden,
      // darf eine Uppercase-Einstellung für den LuxButton diese nicht überschreiben.
      // Deshalb prüft der LuxButton hier, ob er Teil einer dieser Komponenten ist.
      this.detectParent();
    });

    this.clickSubscription = this.clickSubject.pipe(throttleTime(this.luxThrottleTime)).subscribe((e) => this.luxClicked.emit(e));

    this.auxClickSubscription = this.auxClickSubject.pipe(throttleTime(this.luxThrottleTime)).subscribe((e) => this.luxAuxClicked.emit(e));
  }

  ngOnDestroy() {
    this.configSubscription?.unsubscribe();
    this.clickSubscription?.unsubscribe();
    this.auxClickSubscription?.unsubscribe();
  }

  clicked(event: MouseEvent) {
    this.clickSubject.next(event);
  }

  auxClicked(event: MouseEvent) {
    this.auxClickSubject.next(event);
  }

  private detectParent() {
    const className = this.elementRef.nativeElement.className;

    let selector;
    if (className.indexOf('lux-link') > -1) {
      selector = 'lux-link';
    } else if (className.indexOf('lux-side-nav-item-button') > -1) {
      selector = 'lux-side-nav-item';
    } else if (className.indexOf('lux-menu-item') > -1) {
      selector = 'lux-menu-item';
    } else {
      selector = 'lux-button';
    }

    this.labelUppercase = this.componentsConfigService.isLabelUppercaseForSelector(selector);
  }
}
