import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxAppHeaderNextNavMenuComponent } from './lux-app-header-next-subcomponent/lux-app-header-next-nav-menu/lux-app-header-next-nav-menu.component';
import { LuxAppHeaderNextUserMenuComponent } from './lux-app-header-next-subcomponent/lux-app-header-next-user-menu.component'; 

@Component({
  selector: 'lux-app-header-next',
  templateUrl: './lux-app-header-next.component.html',
  styleUrls: ['./lux-app-header-next.component.scss']
})
export class LuxAppHeaderNextComponent implements OnInit, OnChanges {
  @Input() luxUserName: string;
  //@Input() luxIconName: string; //für das APP-Icon
  //@Input() luxImageSrc: string; //alternative zum APP-Icon
  @Input() luxAppTitle: string;
  @Input() luxAppTitleShort: string;
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

  @Input() luxBrandLogoSrc: string;
  @Input() luxAriaUserMenuButtonLabel = $localize `:@@luxc.app-header.aria.usermenu.btn:Benutzermenü / Navigation`;
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref  = '';
  
  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('customTrigger', { read: ElementRef }) customTrigger: ElementRef;


  @ContentChild(LuxAppHeaderNextNavMenuComponent) navMenu: LuxAppHeaderNextNavMenuComponent;
  @ContentChild(LuxAppHeaderNextUserMenuComponent) userMenu: LuxAppHeaderNextUserMenuComponent;
  
  hasOnClickedListener: boolean;
  userNameShort: string;

  greetingLabel = 'Guten Tag, ';
  luxGreeting = [ 'Guten Morgen, ', 'Guten Tag, ', 'Guten Abend, ', 'Gute Nacht, '];

  mobileView: boolean;
  subscription: Subscription;


  constructor(private logger: LuxConsoleService, private queryService: LuxMediaQueryObserverService) { 
    this.updateGreetingLabel();
  }

  ngOnInit(): void {
    if (this.luxClicked.observers && this.luxClicked.observers.length > 0) {
      this.hasOnClickedListener = true;
    }
    this.subscription = this.queryService.getMediaQueryChangedAsObservable().subscribe(query => {
      this.mobileView = query === 'xs' ||  query === 'sm';
    });
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxUserName) {
      this.userNameShort = this.generateUserNameShort();
    }

    if (!this.luxAppTitleShort || this.luxAppTitleShort.length === 0) {
      this.logger.warn('No title is set for the mobile view.');
    }
  }

  onMenuClosed() {
    this.customTrigger.nativeElement.focus();
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
  
  private updateGreetingLabel(){
    let hour =  new Date().getHours();
    if ( hour < 6 ) this.greetingLabel = this.luxGreeting [3];
    else if ( hour < 12 ) this.greetingLabel = this.luxGreeting [0];
    else if ( hour < 18 ) this.greetingLabel = this.luxGreeting [1];
    else if ( hour < 22 ) this.greetingLabel = this.luxGreeting [2];
    else this.greetingLabel = this.luxGreeting[3];
  }
}
