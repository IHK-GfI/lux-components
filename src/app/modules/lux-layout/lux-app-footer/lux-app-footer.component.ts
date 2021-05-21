import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from 'rxjs';
import { LuxAppService } from "../../lux-util/lux-app.service";
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxAppFooterButtonInfo } from './lux-app-footer-button-info';
import { LuxAppFooterButtonService } from './lux-app-footer-button.service';
import { LuxAppFooterLinkInfo } from './lux-app-footer-link-info';
import { LuxAppFooterLinkService } from './lux-app-footer-link.service';
import { LuxMenuComponent } from '../../lux-action/lux-menu/lux-menu.component';

@Component({
  selector: 'lux-app-footer',
  templateUrl: './lux-app-footer.component.html',
  styleUrls: ['./lux-app-footer.component.scss']
})
export class LuxAppFooterComponent implements OnInit, OnDestroy {
  @ViewChild('buttonMenu', { static: true }) buttonMenu: LuxMenuComponent;

  @Input() luxVersion: string;
  @Input() luxAriaRoleFooterLabel = $localize `:@@luxc.app-footer.ariarolefooter:Fußzeilenbereich / Buttonbereich`;

  desktopView: boolean;
  subscription: Subscription;

  constructor(
    public buttonService: LuxAppFooterButtonService,
    private linkService: LuxAppFooterLinkService,
    private mediaObserver: LuxMediaQueryObserverService,
    private elementRef: ElementRef,
    private appService: LuxAppService
  ) {
    this.appService.appFooterEl = elementRef.nativeElement;
  }

  ngOnInit() {
    this.subscription = this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(query => {
      this.desktopView = this.mediaObserver.isSM() || this.mediaObserver.isMD() || this.mediaObserver.isLG() || this.mediaObserver.isXL();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getButtons(): LuxAppFooterButtonInfo[] {
    return this.buttonService.buttonInfos;
  }

  sendButtonCommand(cmd: string) {
    this.buttonService.sendButtonCommand(cmd);
  }

  getLinks(): LuxAppFooterLinkInfo[] {
    return this.linkService.linkInfos;
  }
}
