/* eslint-disable max-len */
import {
  Component,
  ContentChild,
  ElementRef, EventEmitter, HostBinding,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { LuxAppService } from "../../lux-util/lux-app.service";
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMasterDetailMobileHelperService } from '../lux-master-detail/lux-master-detail-mobile-helper.service';
import { LuxSideNavComponent } from './lux-app-header-subcomponents/lux-side-nav/lux-side-nav.component';
import { LuxAppHeaderRightNavComponent } from './lux-app-header-subcomponents/lux-app-header-right-nav/lux-app-header-right-nav.component';
import { LuxAppHeaderActionNavComponent } from './lux-app-header-subcomponents/lux-app-header-action-nav/lux-app-header-action-nav.component';
import { LuxUtil } from '../../lux-util/lux-util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-app-header',
  templateUrl: './lux-app-header.component.html',
  styleUrls: ['./lux-app-header.component.scss']
})
export class LuxAppHeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref  = '';
  @Input() luxUserName: string;
  @Input() luxAppTitle: string;
  @Input() luxAppTitleShort: string;
  @Input() luxIconName: string;
  @Input() luxImageSrc: string;
  @Input() luxImageHeight = '55px';
  @Input() luxAriaAppMenuButtonLabel = $localize `:@@luxc.app-header.aria.appmenu.btn:Anwendungsmenü / Navigation`;
  @Input() luxAriaUserMenuButtonLabel = $localize `:@@luxc.app-header.aria.usermenu.btn:Benutzermenü / Navigation`;
  @Input() luxAriaTitleIconLabel = $localize `:@@luxc.app-header.aria.title_icon.lbl:Titelicon`;
  @Input() luxAriaTitleImageLabel = $localize `:@@luxc.app-header.aria.title.image.lbl:Titelbild`;
  @Input() luxAriaTitleLinkLabel = $localize `:@@luxc.app-header.aria.title.link.lbl:`;
  @Input() luxAriaRoleHeaderLabel = $localize `:@@luxc.app-header.aria.role_header.lbl:Kopfbereich / Menübereich`;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  isMasterOpen: boolean;
  isMasterDetailAvailable: boolean;
  masterHasValue: boolean;

  userNameShort: string;
  isIE = LuxUtil.isIE();
  hasOnClickedListener: boolean;
  subscriptions: Subscription[] = [];

  @ViewChild('customTrigger', { read: ElementRef }) customTrigger: ElementRef;

  @ContentChild(LuxAppHeaderActionNavComponent) actionNav: LuxAppHeaderActionNavComponent;
  @ContentChild(LuxAppHeaderRightNavComponent) rightNav: LuxAppHeaderRightNavComponent;
  @ContentChild(LuxSideNavComponent) sideNav: LuxSideNavComponent;

  constructor(public mobileHelperService: LuxMasterDetailMobileHelperService, private logger: LuxConsoleService, private elementRef: ElementRef, private appService: LuxAppService) {
    this.appService.appHeaderEl = elementRef.nativeElement;

    // Wenn die Master-Ansicht der MD-Komponente aendert, muss ein anderer Navigations-Button angezeigt werden
    this.subscriptions.push(this.mobileHelperService.masterCollapsedObservable.subscribe((isOpen: boolean) => {
      setTimeout(() => {
        this.isMasterOpen = isOpen;
      });
    }));

    // Pruefen ob ein Master-Detail aktuell vorhanden ist
    this.subscriptions.push(this.mobileHelperService.isRegisteredObservable.subscribe((isRegistered: boolean) => {
      setTimeout(() => {
        this.isMasterDetailAvailable = isRegistered;
      });
    }));

    // Pruefen ob das Master-Detail einen Wert hat
    this.subscriptions.push(this.mobileHelperService.hasValueObservable.subscribe((hasValue: boolean) => {
      setTimeout(() => {
        this.masterHasValue = hasValue;
      });
    }));
  }

  ngOnInit() {
    if (this.luxClicked.observers && this.luxClicked.observers.length > 0) {
      this.hasOnClickedListener = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxUserName) {
      this.userNameShort = this.generateUserNameShort();
    }

    if (!this.luxAppTitleShort || this.luxAppTitleShort.length === 0) {
      this.logger.warn('No title is set for the mobile view.');
    }
  }

  showMasterClick() {
    this.mobileHelperService.openMaster();
  }

  isMasterToggleVisible() {
    return (
      this.isMasterDetailAvailable && this.mobileHelperService.isMobile() && !this.isMasterOpen && this.masterHasValue
    );
  }

  onMenuClosed() {
    this.customTrigger.nativeElement.focus();
  }

  onClicked(event: any) {
    this.luxClicked.emit(event);
  }

  private generateUserNameShort(): string {
    let short = this.luxUserName ? this.luxUserName.trim() : '';

    if (short.length > 0) {
      short = short.charAt(0);
    }
    return short.toUpperCase();
  }
}
