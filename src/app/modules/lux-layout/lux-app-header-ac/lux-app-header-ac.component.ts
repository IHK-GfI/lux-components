import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxAppService } from '../../lux-util/lux-app.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxAppHeaderAcActionNavComponent } from './lux-app-header-ac-subcomponents/lux-app-header-ac-action-nav/lux-app-header-ac-action-nav.component';
import { LuxAppHeaderAcNavMenuComponent } from './lux-app-header-ac-subcomponents/lux-app-header-ac-nav-menu/lux-app-header-ac-nav-menu.component';
import { LuxAppHeaderAcUserMenuComponent } from './lux-app-header-ac-subcomponents/lux-app-header-ac-user-menu.component';
import { LuxTenantLogoComponent } from '../../lux-tenant-logo/lux-tenant-logo.component';
import { LuxComponentsConfigParameters } from '../../lux-components-config/lux-components-config-parameters.interface';

@Component({
  selector: 'lux-app-header-ac',
  templateUrl: './lux-app-header-ac.component.html'
})
export class LuxAppHeaderAcComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() luxUserName?: string;
  @Input() luxAppTitle?: string;
  @Input() luxAppTitleShort?: string;
  @Input() luxBrandLogoSrc?: string;
  @Input() luxHideBrandLogo = false;
  @Input() luxAppLogoSrc?: string;
  @Input() luxHideAppLogo = false;
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref = '';
  @Input() luxHideTopBar = false;
  @Input() luxHideNavBar = false;
  @Input() luxAriaRoleHeaderLabel = $localize`:@@luxc.app-header.aria.role_header.lbl:Kopfbereich / Menübereich`;
  @Input() luxAriaUserMenuButtonLabel = $localize`:@@luxc.app-header.aria.usermenu.btn:Benutzermenü / Navigation`;
  @Input() luxAriaTitleIconLabel = $localize`:@@luxc.app-header.aria.title_icon.lbl:Titelicon`;
  @Input() luxAriaTitleImageLabel = $localize`:@@luxc.app-header.aria.title.image.lbl:Titelbild`;
  @Input() luxCenteredView!: boolean;
  @Input() luxCenteredWidth!: string;

  @Output() luxClicked: EventEmitter<Event> = new EventEmitter();
  @Output() luxAppLogoClicked: EventEmitter<Event> = new EventEmitter();
  @Output() luxBrandLogoClicked: EventEmitter<Event> = new EventEmitter();

  @ViewChild('customTrigger', { read: ElementRef }) customTrigger?: ElementRef;

  @ContentChild(LuxTenantLogoComponent) tenantLogo?: LuxTenantLogoComponent;
  @ContentChild(LuxAppHeaderAcNavMenuComponent) navMenu?: LuxAppHeaderAcNavMenuComponent;
  @ContentChild(LuxAppHeaderAcUserMenuComponent) userMenu?: LuxAppHeaderAcUserMenuComponent;
  @ContentChild(LuxAppHeaderAcActionNavComponent) actionNav?: LuxAppHeaderAcActionNavComponent;

  userNameShort?: string;

  mobileView: boolean;
  subscriptions: Subscription[] = [];

  menuOpened = false;

  private iconBasePath = '';

  constructor(
    private logger: LuxConsoleService,
    private queryService: LuxMediaQueryObserverService,
    private elementRef: ElementRef,
    private appService: LuxAppService,
    private configService: LuxComponentsConfigService
  ) {
    this.mobileView = this.queryService.activeMediaQuery === 'xs' || this.queryService.activeMediaQuery === 'sm';
    this.subscriptions.push(
      this.queryService.getMediaQueryChangedAsObservable().subscribe((query) => {
        this.mobileView = query === 'xs' || query === 'sm';
      })
    );
    this.appService.appHeaderEl = elementRef.nativeElement;
    this.iconBasePath = this.configService.currentConfig.iconBasePath ?? '';
    if (this.iconBasePath.endsWith('/')) {
      this.iconBasePath = this.iconBasePath.substring(0, this.iconBasePath.length - 1);
    }
  }

  ngOnInit(): void {
    if (!this.luxAppLogoSrc && !this.luxHideAppLogo) {
      this.luxAppLogoSrc = this.iconBasePath + '/assets/logos/app_logo_platzhalter.svg';
    }

    if (this.luxHideAppLogo) {
      this.luxAppLogoSrc = undefined;
    }

    if (!this.luxBrandLogoSrc && !this.luxHideBrandLogo) {
      this.luxBrandLogoSrc = this.iconBasePath + '/assets/logos/ihk_logo_platzhalter.svg';
    }

    if (this.luxHideBrandLogo) {
      this.luxBrandLogoSrc = undefined;
    }

    if (!this.luxCenteredView) {
      this.luxCenteredView = this.configService.currentConfig.viewConfiguration?.centeredView
        ? this.configService.currentConfig.viewConfiguration.centeredView
        : LuxComponentsConfigService.DEFAULT_CONFIG.viewConfiguration.centeredView;
    }

    if (!this.luxCenteredWidth) {
      this.luxCenteredWidth = this.configService.currentConfig.viewConfiguration?.centeredWidth
        ? this.configService.currentConfig.viewConfiguration.centeredWidth
        : LuxComponentsConfigService.DEFAULT_CONFIG.viewConfiguration.centeredWidth;
    }
  }

  ngAfterContentInit(): void {
    if (this.tenantLogo) {
      this.tenantLogo.luxTenantLogoHeight = this.mobileView ? '24px' : '40px';
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (!this.luxAppTitleShort || this.luxAppTitleShort.length === 0) {
      this.logger.warn('No title is set for the mobile view.');
    }
  }

  onMenuOpened() {
    this.menuOpened = true;
  }

  onMenuClosed() {
    this.menuOpened = false;
    if (this.customTrigger) {
      this.customTrigger.nativeElement.children[0].focus();
    }
  }

  onAppLogoClicked(event: any) {
    this.luxAppLogoClicked.emit(event);
  }

  onBrandLogoClicked(event: any) {
    this.luxBrandLogoClicked.emit(event);
  }
}
