import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import { LuxSideNavItemComponent } from './lux-side-nav-subcomponents/lux-side-nav-item.component';
import { Subscription } from 'rxjs';
import { sideNavAnimation, sideNavOverlayAnimation } from './lux-side-nav-model/lux-side-nav-animations';
import { LuxUtil } from '../../../../lux-util/lux-util';

@Component({
  selector: 'lux-side-nav',
  templateUrl: './lux-side-nav.component.html',
  styleUrls: ['./lux-side-nav.component.scss'],
  animations: [sideNavAnimation, sideNavOverlayAnimation]
})
export class LuxSideNavComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() luxDashboardLink: string;
  @Input() luxDashboardLinkTitle: string = 'LUX Dashboard';
  @Input() luxOpenLinkBlank: boolean;

  @ContentChildren(LuxSideNavItemComponent, { descendants: true }) sideNavItems: QueryList<LuxSideNavItemComponent>;
  @ContentChildren(LuxSideNavItemComponent, { descendants: false }) directSideNavItems: QueryList<
    LuxSideNavItemComponent
  >;

  @ViewChild('sideNav', { read: ElementRef, static: true }) sideNavEl: ElementRef;
  @ViewChild('sideNavHeader', { read: ElementRef, static: true }) sideNavHeaderEl: ElementRef;
  @ViewChild('sideNavFooter', { read: ElementRef, static: true }) sideNavFooterEl: ElementRef;

  focusElement: any;
  sideNavExpanded: boolean = false;
  height: number;
  width: number;
  visibility = 'hidden';

  private itemClickSubscriptions: Subscription[] = [];

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (LuxUtil.isKeyEscape(event) && this.sideNavExpanded) {
      // Escape soll nur das Menü schließen, wenn es auch geöffnet ist.
      this.toggle();
    }
  }

  @HostListener('window:resize') windowResize() {
    this.calculateWidthHeight();
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.sideNavItems.changes.subscribe(() => this.updateItemClickListeners());
    this.updateItemClickListeners();
    this.calculateWidthHeight();
  }

  ngOnDestroy() {
    this.itemClickSubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  toggle() {
    this.sideNavExpanded = !this.sideNavExpanded;

    if (this.sideNavExpanded) {
      this.visibility = 'visible';
      this.calculateWidthHeight();

      // Hier wird sich der Menübutton zwischengespeichert
      this.focusElement = document.activeElement;
    } else {
      setTimeout(() => {
        // Wenn das SideNavMenü geschlossen wird, wird wieder der SideNavMenübutton fokusiert.
        if (this.focusElement) {
          this.focusElement.focus();
        }
      });
    }
  }

  /**
   * Wenn die Animation beendet ist, wird das Menü ausgeblendet, damit der Fokus weiter zum Inhalt springt und nicht
   * durch das versteckte Menü wandert. Das ist auch für Screenreader nötig.
   */
  updateSideNavAfterAnimationIsFinished() {
    this.visibility = this.sideNavExpanded ? 'visible' : 'hidden';

    // Den Fokus auf den ersten Button setzen
    if (this.sideNavExpanded && this.sideNavEl && this.sideNavEl.nativeElement) {
      setTimeout(() => {
        const firstButton = (<HTMLElement>this.sideNavEl.nativeElement).querySelector('button');
        if (firstButton) {
          firstButton.focus();
        }
      });
    }
  }

  open() {
    this.sideNavExpanded = true;
    this.calculateWidthHeight();
  }

  close() {
    this.sideNavExpanded = false;
  }

  /**
   * Berechnet die Höhe für den Container der SideNavMenuItems.
   * Dafür wird die Gesamthöhe minus der Höhe des Headers und des Footers sowie eine feste Höhe
   * für den App-Header gerechnet.
   */
  private calculateWidthHeight() {
    setTimeout(() => {
      const totalHeight = this.sideNavEl.nativeElement.offsetHeight;
      const headerHeight = this.sideNavHeaderEl.nativeElement.offsetHeight;
      const footerHeight = this.sideNavFooterEl.nativeElement.offsetHeight;
      this.height = totalHeight - headerHeight - footerHeight;
      this.width = this.sideNavEl.nativeElement.offsetWidth + 20 /* Sicherheitsaufschlag (Schatten, Scrollbar,...) */;
    });
  }

  /**
   * Hängt sich an die Klick-Events der einzelnen SideNavItems, um so, je nach Einstellung der Items,
   * die SideNav zu schließen.
   */
  private updateItemClickListeners() {
    this.itemClickSubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.sideNavItems.forEach((item: LuxSideNavItemComponent) => {
      this.itemClickSubscriptions.push(
        item.luxClicked.subscribe(() => {
          if (item.luxCloseOnClick) {
            this.close();
          }
        })
      );
    });
  }
}
