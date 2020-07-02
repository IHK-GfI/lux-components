// tslint:disable:max-line-length
import {
  Component,
  ContentChild,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMasterDetailMobileHelperService } from '../lux-master-detail/lux-master-detail-mobile-helper.service';
import { LuxSideNavComponent } from './lux-app-header-subcomponents/lux-side-nav/lux-side-nav.component';
import { LuxAppHeaderRightNavComponent } from './lux-app-header-subcomponents/lux-app-header-right-nav/lux-app-header-right-nav.component';
import { LuxAppHeaderActionNavComponent } from './lux-app-header-subcomponents/lux-app-header-action-nav/lux-app-header-action-nav.component';
import { LuxUtil } from '../../lux-util/lux-util';

@Component({
  selector: 'lux-app-header',
  templateUrl: './lux-app-header.component.html',
  styleUrls: ['./lux-app-header.component.scss']
})
export class LuxAppHeaderComponent implements OnInit, OnChanges {
  @Input() luxUserName: string;
  @Input() luxAppTitle: string;
  @Input() luxAppTitleShort: string;
  @Input() luxIconName: string;
  @Input() luxImageSrc: string;
  @Input() luxImageHeight = '55px';

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  isMasterOpen: boolean;
  isMasterDetailAvailable: boolean;
  masterHasValue: boolean;

  userNameShort: string;
  isIE = LuxUtil.isIE();
  hasOnClickedListener: boolean;

  @ViewChild('customTrigger', { read: ElementRef }) customTrigger: ElementRef;

  @ContentChild(LuxAppHeaderActionNavComponent) actionNav: LuxAppHeaderActionNavComponent;
  @ContentChild(LuxAppHeaderRightNavComponent) rightNav: LuxAppHeaderRightNavComponent;
  @ContentChild(LuxSideNavComponent) sideNav: LuxSideNavComponent;

  constructor(public mobileHelperService: LuxMasterDetailMobileHelperService, private logger: LuxConsoleService) {
    // Wenn die Master-Ansicht der MD-Komponente aendert, muss ein anderer Navigations-Button angezeigt werden
    this.mobileHelperService.masterCollapsedObservable.subscribe((isOpen: boolean) => {
      setTimeout(() => {
        this.isMasterOpen = isOpen;
      });
    });

    // Pruefen ob ein Master-Detail aktuell vorhanden ist
    this.mobileHelperService.isRegisteredObservable.subscribe((isRegistered: boolean) => {
      setTimeout(() => {
        this.isMasterDetailAvailable = isRegistered;
      });
    });

    // Pruefen ob das Master-Detail einen Wert hat
    this.mobileHelperService.hasValueObservable.subscribe((hasValue: boolean) => {
      setTimeout(() => {
        this.masterHasValue = hasValue;
      });
    });
  }

  ngOnInit() {
    if (this.luxClicked.observers && this.luxClicked.observers.length > 0) {
      this.hasOnClickedListener = true;
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxUserName) {
      this.userNameShort = this.generateUserNameShort();
    }

    if (!this.luxAppTitleShort || this.luxAppTitleShort.length === 0) {
      this.logger.warn('Achtung, der Applikations-Header hat keinen Titel für die mobile Ansicht!');
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
