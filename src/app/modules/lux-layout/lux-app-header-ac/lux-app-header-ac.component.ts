import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
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

  @Output() luxClicked: EventEmitter<Event> = new EventEmitter();

  @ViewChild('customTrigger', { read: ElementRef }) customTrigger?: ElementRef;


  @ContentChild(LuxAppHeaderAcNavMenuComponent) navMenu?: LuxAppHeaderAcNavMenuComponent;
  @ContentChild(LuxAppHeaderAcUserMenuComponent) userMenu?: LuxAppHeaderAcUserMenuComponent;

  hasOnClickedListener?: boolean;
  userNameShort?: string;

  greetingLabel = 'Guten Tag, ';
  luxGreeting = [ 'Guten Morgen, ', 'Guten Tag, ', 'Guten Abend, ', 'Gute Nacht, '];

  mobileView: boolean;
  subscription?: Subscription;

  menuOpened = false;

  constructor(
    private logger: LuxConsoleService,
    private queryService: LuxMediaQueryObserverService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.updateGreetingLabel();
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

  onMenuOpened() {
    this.menuOpened = true;
  }

  onMenuClosed() {
    this.menuOpened = false;
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

  private updateGreetingLabel(){
    let hour =  new Date().getHours();
    if ( hour < 6 ) this.greetingLabel = this.luxGreeting [3];
    else if ( hour < 12 ) this.greetingLabel = this.luxGreeting [0];
    else if ( hour < 18 ) this.greetingLabel = this.luxGreeting [1];
    else if ( hour < 22 ) this.greetingLabel = this.luxGreeting [2];
    else this.greetingLabel = this.luxGreeting[3];
  }
}
