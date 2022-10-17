import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxAppHeaderAcActionNavComponent } from './lux-app-header-ac-subcomponents/lux-app-header-ac-action-nav/lux-app-header-ac-action-nav.component';
import { LuxAppHeaderAcNavMenuComponent } from './lux-app-header-ac-subcomponents/lux-app-header-ac-nav-menu/lux-app-header-ac-nav-menu.component';
import { LuxAppHeaderAcUserMenuComponent } from './lux-app-header-ac-subcomponents/lux-app-header-ac-user-menu.component';

@Component({
  selector: 'lux-app-header-ac',
  templateUrl: './lux-app-header-ac.component.html',
  styleUrls: ['./lux-app-header-ac.component.scss']
})
export class LuxAppHeaderAcComponent implements OnInit, OnChanges {
  @Input() luxUserName?: string;
  @Input() luxAppTitle?: string;
  @Input() luxAppTitleShort?: string;
  @Input()
  set luxAppIconName(iconName: string) {
    if (iconName) {
      this._luxAppIconName = iconName;
    }
  }
  get luxAppIconName() {
    return this._luxAppIconName;
  }
  _luxAppIconName = 'home';

  @Input() luxBrandLogoSrc?: string;
  @Input() luxAppLogoSrc?: string;
  @Input() luxAriaUserMenuButtonLabel = $localize `:@@luxc.app-header.aria.usermenu.btn:Benutzermenü / Navigation`;
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref  = '';
  @Input() luxHideTopBar = false;
  @Input() luxHideNavBar = false;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('customTrigger', { read: ElementRef }) customTrigger?: ElementRef;


  @ContentChild(LuxAppHeaderAcNavMenuComponent) navMenu?: LuxAppHeaderAcNavMenuComponent;
  @ContentChild(LuxAppHeaderAcUserMenuComponent) userMenu?: LuxAppHeaderAcUserMenuComponent;
  @ContentChild(LuxAppHeaderAcActionNavComponent) actionNav?: LuxAppHeaderAcActionNavComponent;

  hasOnClickedListener?: boolean;
  userNameShort?: string;

  mobileView: boolean;
  subscription?: Subscription;

  menuOpened = false;

  constructor(
    private logger: LuxConsoleService,
    private queryService: LuxMediaQueryObserverService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        "luxAppIcon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/svg/demoAppLogo.svg")
      );

    this.mobileView = this.queryService.activeMediaQuery === 'xs' || this.queryService.activeMediaQuery === 'sm'
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
    }

  ngOnInit(): void {
    if (this.luxClicked.observed) {
      this.hasOnClickedListener = true;
    }
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxUserName) {
      this.userNameShort = this.generateUserNameShort();
    }

    if (!this.luxAppTitleShort || this.luxAppTitleShort.length === 0) {
      this.logger.warn('No title is set for the mobile view.');
    }
  }
  ngAfterContentInit(){
    console.log('ActionNav', this.actionNav);
  }

  onMenuOpened() {
    this.menuOpened = true;
    console.log("Menu Openend")
  }

  onMenuClosed() {
    this.menuOpened = false;
  }

  onClicked(event: any) {
    // allgemeines ClickEvent, dass an den Parent weitergeben wird
    this.luxClicked.emit(event);
    console.log("clicked", event);
  }

  private generateUserNameShort(): string {
    let short = this.luxUserName ? this.luxUserName.trim() : '';

    if (short.length > 0) {
      short = short.charAt(0);
    }
    return short.toUpperCase();
  }
}
