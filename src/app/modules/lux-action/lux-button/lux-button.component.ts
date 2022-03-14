import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subject, Subscription } from 'rxjs';
import { LuxActionComponentBaseClass } from '../lux-action-model/lux-action-component-base.class';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'lux-button',
  templateUrl: './lux-button.component.html',
  styleUrls: ['./lux-button.component.scss']
})
export class LuxButtonComponent extends LuxActionComponentBaseClass implements OnInit, OnDestroy {
  public readonly iconSize: string = '1x';

  private configSubscription: Subscription;

  private clickSubject = new Subject();
  private clickSubscription: Subscription;

  private auxClickSubject = new Subject();
  private auxClickSubscription: Subscription;

  @Input() luxType: 'button' | 'reset' | 'submit' = 'button';
  @Input() luxThrottleTime;
  @Output() luxAuxClicked: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.lux-uppercase') labelUppercase: boolean;

  constructor(public elementRef: ElementRef, public componentsConfigService: LuxComponentsConfigService) {
    super();
  }

  ngOnInit() {
    this.configSubscription = this.componentsConfigService.config.subscribe((config) => {
      // Hintergrund: LuxLink, LuxSideNavItem und LuxMenuItem benutzen alle unter der Haube
      // den LuxButton. Wenn diese nun als Ausnahmen für Uppercase in der Config eingetragen werden,
      // darf eine Uppercase-Einstellung für den LuxButton diese nicht überschreiben.
      // Deshalb prüft der LuxButton hier, ob er Teil einer dieser Komponenten ist.
      this.detectParent();

      if (!this.luxThrottleTime) {
        this.luxThrottleTime = config.buttonConfiguration.throttleTimeMs;
      }
    });

    this.clickSubscription = this.clickSubject
      .pipe(throttleTime(this.luxThrottleTime))
      .subscribe((e) => this.luxClicked.emit(e));

    this.auxClickSubscription = this.auxClickSubject
      .pipe(throttleTime(this.luxThrottleTime))
      .subscribe((e) => this.luxAuxClicked.emit(e));
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();

    this.clickSubscription.unsubscribe();
    this.clickSubject.complete();

    this.auxClickSubscription.unsubscribe();
    this.auxClickSubject.complete();
  }

  clicked(event: any) {
    this.clickSubject.next(event);
  }

  auxClicked(event: any) {
    this.auxClickSubject.next(event);
  }

  private detectParent() {
    const className = this.elementRef.nativeElement.className;
    let selector = 'lux-button';
    if (className.indexOf('lux-link') > -1) {
      selector = 'lux-link';
    } else if (className.indexOf('lux-side-nav-item-button') > -1) {
      selector = 'lux-side-nav-item';
    } else if (className.indexOf('lux-menu-item') > -1) {
      selector = 'lux-menu-item';
    }
    this.labelUppercase = this.componentsConfigService.isLabelUppercaseForSelector(selector);
  }
}
