import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LuxAppService } from '../../lux-util/lux-app.service';
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
  @Input() luxBrandLogoSrc?: string;
  @Input() luxAppLogoSrc?: string;
  @Input() luxAriaUserMenuButtonLabel = $localize `:@@luxc.app-header.aria.usermenu.btn:Benutzermenü / Navigation`;
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref  = '';
  @Input() luxHideTopBar = false;
  @Input() luxHideNavBar = false;

  @Output() luxClicked: EventEmitter<Event> = new EventEmitter();
  @Output() luxAppLogoClicked: EventEmitter<Event> = new EventEmitter();
  @Output() luxBrandLogoClicked: EventEmitter<Event> = new EventEmitter();

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
    private elementRef: ElementRef, 
    private appService: LuxAppService
    ) {
      this.mobileView = this.queryService.activeMediaQuery === 'xs' || this.queryService.activeMediaQuery === 'sm'
      this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
        this.mobileView = query === 'xs' ||  query === 'sm';
      });
      this.appService.appHeaderEl = elementRef.nativeElement;
    }

  ngOnInit(): void {
    //für die lux-images für das Brandlogo und Applogo
    if (this.luxClicked.observed) {
      this.hasOnClickedListener = true;
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

  onClicked(event: any) {
    this.luxClicked.emit(event);
  }

  onAppLogoClicked(event: any) {
    this.luxAppLogoClicked.emit(event);
  }

  onBrandLogoClicked(event: any) {
    this.luxBrandLogoClicked.emit(event);
  }
}
