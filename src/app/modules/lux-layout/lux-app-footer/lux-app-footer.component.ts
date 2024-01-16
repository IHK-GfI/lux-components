import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxAppService } from '../../lux-util/lux-app.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxAppFooterButtonInfo } from './lux-app-footer-button-info';
import { LuxAppFooterButtonService } from './lux-app-footer-button.service';
import { LuxAppFooterLinkInfo } from './lux-app-footer-link-info';
import { LuxAppFooterLinkService } from './lux-app-footer-link.service';
import { LuxMenuComponent } from '../../lux-action/lux-menu/lux-menu.component';

@Component({
  selector: 'lux-app-footer',
  templateUrl: './lux-app-footer.component.html'
})
export class LuxAppFooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('buttonMenu', { static: true }) buttonMenu!: LuxMenuComponent;

  @Input() luxVersion?: string;
  @Input() luxAriaRoleFooterLabel = $localize`:@@luxc.app-footer.ariarolefooter:Fußzeilenbereich / Buttonbereich`;

  desktopView?: boolean;
  buttonInfos: LuxAppFooterButtonInfo[] = [];
  linkInfos: LuxAppFooterLinkInfo[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    public buttonService: LuxAppFooterButtonService,
    private linkService: LuxAppFooterLinkService,
    private mediaObserver: LuxMediaQueryObserverService,
    private elementRef: ElementRef,
    private appService: LuxAppService,
    private cdr: ChangeDetectorRef
  ) {
    this.appService.appFooterEl = elementRef.nativeElement;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
        this.desktopView = this.mediaObserver.isSM() || this.mediaObserver.isMD() || this.mediaObserver.isLG() || this.mediaObserver.isXL();
      })
    );

    this.subscriptions.push(
      this.buttonService.getButtonInfosAsObservable().subscribe((buttonInfos) => {
        this.buttonInfos = buttonInfos;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.linkService.getLinkInfosAsObservable().subscribe((linkInfos) => {
        this.linkInfos = linkInfos;
        this.cdr.detectChanges();
      })
    );
  }

  ngAfterViewInit() {
    LuxUtil.assertNonNull('buttonMenu', this.buttonMenu);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  sendButtonCommand(cmd: string) {
    this.buttonService.sendButtonCommand(cmd);
  }
}
