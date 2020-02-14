import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { LuxListItemComponent } from '../lux-list/lux-list-subcomponents/lux-list-item.component';
import { LuxListComponent } from '../lux-list/lux-list.component';
import { LuxTabsComponent } from '../lux-tabs/lux-tabs.component';
import { LuxMasterDetailMobileHelperService } from './lux-master-detail-mobile-helper.service';
import { LuxDetailViewComponent } from './lux-master-detail-subcomponents/lux-detail-view/lux-detail-view.component';
import { LuxMasterFooterComponent } from './lux-master-detail-subcomponents/lux-master-footer/lux-master-footer.component';
import { LuxMasterHeaderComponent } from './lux-master-detail-subcomponents/lux-master-header/lux-master-header.component';
import { LuxMasterSimpleComponent } from './lux-master-detail-subcomponents/lux-master-simple/lux-master-simple.component';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LuxDetailWrapperComponent } from './lux-master-detail-subcomponents/lux-detail-view/lux-detail-wrapper.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lux-master-detail',
  templateUrl: './lux-master-detail.component.html',
  styleUrls: ['./lux-master-detail.component.scss'],
  animations: [
    trigger('masterIsLoadingChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('1 => 0', animate('0.5s')),
      transition('0 => 1', animate('1s'))
    ])
  ]
})
export class LuxMasterDetailComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  @Output() luxSelectedDetailChange: EventEmitter<any> = new EventEmitter();
  @Output() luxScrolled: EventEmitter<any> = new EventEmitter();

  @ContentChild(LuxMasterSimpleComponent, { static: false }) masterSimple;
  @ContentChild(LuxDetailViewComponent, { static: false }) detailView;
  @ContentChild(LuxMasterFooterComponent, { static: false, read: ElementRef }) masterFooter: ElementRef;

  @ViewChildren(LuxListComponent, { read: ElementRef }) luxMasterQueryList: QueryList<ElementRef>;
  @ViewChildren(LuxListItemComponent) luxMasterListItemQueryList: QueryList<LuxListItemComponent>;
  @ViewChild(LuxMasterHeaderComponent, { read: ElementRef, static: true }) masterHeader: ElementRef;
  @ViewChild(LuxListItemComponent, { read: ElementRef, static: false }) luxMasterEntryElementRef: ElementRef;
  @ContentChild(LuxTabsComponent, { static: false }) tabsComponent: LuxTabsComponent;
  @ViewChild('masterSpinnerCard', { read: ElementRef, static: true }) masterSpinnerCard: ElementRef;
  @ViewChild('detailContainer', { read: ElementRef, static: false }) detailFrame: ElementRef;
  @ViewChild('detailEmpty', { read: ElementRef, static: true }) detailEmpty: ElementRef;
  @ViewChild('detailViewContainerRef', { read: ViewContainerRef, static: true })
  detailViewContainerRef: ViewContainerRef;
  @ViewChild('masterContainer', { read: ElementRef, static: true }) masterContainer: ElementRef;

  @HostBinding('class.lux-overflow-y-auto') overflowY: boolean = true;

  private _luxMasterList = new BehaviorSubject<Array<any>>([]);
  private _luxOpen: boolean = true;
  private _luxSelectedDetail: any;

  private masterListLength;
  private maxItemsVisible;
  private updateDetail$: ReplaySubject<any> = new ReplaySubject(1);
  private updateDetailSubscription: Subscription;

  detailContext = { $implicit: {} };
  flexMaster: string;
  flexDetail: string;

  // Enthält die Position des aktuell selektierten Elements
  selectedPosition: number;

  // Flag welches bestimmt ob die Empty-Anzeigen der Masterliste anhand der Detail-Ansicht ausgerichtet werden
  alignEmptyIndicators: boolean = true;

  @Input() luxEmptyIconMaster: string = 'fas fa-info-circle';
  @Input() luxEmptyLabelMaster: string = 'Keine Einträge vorhanden';
  @Input() luxEmptyIconDetail: string = 'fas fa-info-circle';
  @Input() luxEmptyLabelDetail: string = 'Kein Element ausgewählt';
  @Input() luxEmptyIconMasterSize = '5x';
  @Input() luxEmptyIconDetailSize = '5x';
  @Input() luxMasterSpinnerDelay: number = 1000;
  @Input() luxTagIdMaster: string;
  @Input() luxTagIdDetail: string;
  @Input() luxTitleLineBreak: boolean = false;
  @Input() luxMasterIsLoading: boolean = false;
  @Input() luxCompareWith = (o1, o2) => o1 === o2;

  get luxOpen(): boolean {
    return this._luxOpen;
  }

  @Input() set luxOpen(open: boolean) {
    if (open) {
      this.mobileHelperService.openMaster();
    } else {
      this.mobileHelperService.closeMaster();
    }
  }

  /* Selected Detail Get/Set */
  get luxSelectedDetail() {
    return this._luxSelectedDetail;
  }

  @Input()
  set luxSelectedDetail(value) {
    this.updateDetail$.next(value);
  }

  /* Master List Get/Set */
  get luxMasterList() {
    return this._luxMasterList.getValue();
  }

  @Input()
  set luxMasterList(value: any[]) {
    if (this.masterListLength && value && this.masterListLength < value.length) {
      this.announcePossibleInfiniteScrolling();
    }
    this._luxMasterList.next(value);
    this.masterListLength = value ? value.length : 0;
  }

  constructor(
    public mobileHelperService: LuxMasterDetailMobileHelperService,
    private cdr: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.mobileHelperService.register();
  }

  ngOnInit() {
    this.handleMasterListUpdate();
    this.handleViewCollapse();
    this.mobileHelperService.openMaster();
  }

  ngAfterViewInit() {
    this.handleDetailUpdate();
    this.handleMasterQueryList();
  }

  ngOnDestroy() {
    this.mobileHelperService.unregister();
    this.updateDetailSubscription.unsubscribe();
  }

  ngDoCheck() {
    // Wurde ein Element in die Masterliste gepusht oder entfernt?
    if (this.luxMasterList && this.luxMasterList.length !== this.masterListLength) {
      if (this.luxMasterList.length > this.masterListLength) {
        this.announcePossibleInfiniteScrolling();
      }

      // Wenn ja, das selektierte Detail neurendern
      this.masterListLength = this.luxMasterList.length;
      this.luxSelectedDetail = this.luxMasterList[this.selectedPosition];

      this.announcePossibleInfiniteScrolling();
    }

    // Ausrichtung der Empty-Indikatoren der Masterliste prüfen
    if (!this.mobileHelperService.isMobile() && (!this.luxMasterList || this.luxMasterList.length === 0)) {
      this.checkEmptyIndicatorAlignment();
    }
  }

  /**
   * Wenn in der LuxList ein neuer Selected-Wert gepusht wird, diesen abfangen und
   * ein neues Detail auswählen.
   * @param $event
   */
  onSelectedChange($event: number) {
    if ($event > -1) {
      this.selectedPosition = $event;

      this.updateDetail$.next(this.luxMasterList[$event]);

      if (this.mobileHelperService.isMobile()) {
        this.mobileHelperService.closeMaster();
      }
    }
  }

  /**
   * Bestimmt ob die Masterliste auf- oder eingeklappt ist.
   * @param open
   */
  toggleList(open: boolean) {
    if (open) {
      this.mobileHelperService.openMaster();
    } else {
      this.mobileHelperService.closeMaster();
    }

    if (this.tabsComponent) {
      this.tabsComponent.rerenderTabs();
    }
  }

  /**
   * Prueft ob die Detailansicht gerade fuer den User sichtbar ist.
   * @returns boolean
   */
  isDetailInvisible(): boolean {
    return this.mobileHelperService.isMobile() && this.luxOpen;
  }

  onInfiniteScrollingLoad($event) {
    this.luxScrolled.emit($event);
  }

  onSwipeLeft() {
    if (this.mobileHelperService.isMobile()) {
      this.mobileHelperService.closeMaster();
    }
  }

  onSwipeRight() {
    if (this.mobileHelperService.isMobile()) {
      this.mobileHelperService.openMaster();
    }
  }

  /**
   * Kapselung von der übergebenen luxCompareWith-Funktion.
   * Fängt undefinierte Objekte ab und returned stattdessen false.
   * @param o1
   * @param o2
   */
  compareObjects(o1, o2) {
    if (!o1 || !o2) {
      return false;
    }
    return this.luxCompareWith(o1, o2);
  }

  /**
   * Steuert das Breitenverhaeltnis von Master und Detail je nachdem
   * ob der Master auf- oder eingeklappt ist und ob eine Mobilansicht aktiv ist.
   */
  private updateOpen() {
    if (this.luxOpen) {
      if (this.mobileHelperService.isMobile()) {
        this.flexMaster = '100';
        this.flexDetail = '0';
      } else {
        this.flexMaster = '30';
        this.flexDetail = '70';
      }
    } else {
      if (this.mobileHelperService.isMobile()) {
        this.flexMaster = '0';
        this.flexDetail = '100';
      } else {
        this.flexMaster = '5';
        this.flexDetail = '95';
      }
    }
  }

  /**
   * Kümmert sich um Änderungen an der HTML-Node der Master-Liste.
   * Rückt dabei das selektierte Element in den Fokus und berechnet wie viele Elemente
   * gerade in der Liste sichtbar sein können (für das Durchschalten mit Pfeiltasten benötigt).
   */
  private handleMasterQueryList() {
    this.luxMasterQueryList.changes.subscribe((masterListElements: QueryList<ElementRef>) => {
      if (masterListElements.first) {
        const { nativeElement } = masterListElements.first;
        this.maxItemsVisible = Math.floor(nativeElement.offsetHeight / nativeElement.offsetHeight);
      }
      // Der Abschnitt hier fängt den Fall ab, dass z.B. das LuxMasterList-Array selbst angepasst wird (z.B. durch Array.reverse)
      // Das sorgt dafür, dass das visuell selektierte Element auch das passende zur Detail-View ist.
      const newSelectedPosition: number = this.luxMasterList.indexOf(this.luxSelectedDetail);
      if (newSelectedPosition !== this.selectedPosition) {
        setTimeout(() => {
          this.selectedPosition = newSelectedPosition;
        });
      }
    });
  }

  /**
   * Kümmert sich um die Kollabierung der Master-Liste, wenn zwischen Mobil- und Desktopansicht gewechselt wird.
   */
  private handleViewCollapse() {
    this.mobileHelperService.masterCollapsedObservable.subscribe((open: boolean) => {
      // Falls nichts selektiert ist, sollte die Darstellung beim Wechsel in kleine Media Queries die Masterliste zeigen
      if (this.mobileHelperService.isMobile() && !this.luxSelectedDetail && !open) {
        open = true;
      }
      this._luxOpen = open;
      this.updateOpen();
    });
  }

  /**
   * Kümmert sich um Änderungen an dem selektierten Detail.
   * Dabei werden mehrere Zuweisungen an das Detail über throttleTime gebündelt und nur das Aktuellste genommen.
   * Anschließend wird die Komponente angewiesen das neue Detail-Objekt zu rendern.
   */
  private handleDetailUpdate() {
    this.updateDetailSubscription = this.updateDetail$.asObservable().subscribe((detail: any) => {
      if (!detail) {
        this.detailViewContainerRef.clear();
        this.setNewDetail(detail);
      } else {
        if (!this.compareObjects(this.luxSelectedDetail, detail)) {
          this.detailViewContainerRef.clear();

          if (detail) {
            this.detailContext = { $implicit: detail };

            // Den Detail-Wrapper erzeugen und abfangen, wann die Nodes geladen worden sind
            const child = this.cfr.resolveComponentFactory(LuxDetailWrapperComponent);
            const childRef = this.detailViewContainerRef.createComponent(child);
            const instance = childRef.instance;
            instance.luxDetailContext = this.detailContext;
            instance.luxDetailTemplate = this.detailView.tempRef;
            instance.luxDetailRendered.subscribe(() => {
              this.setNewDetail(detail);
            });
            // Die Detailansicht nach dem Wechsel wieder nach oben scrollen lassen
            this.detailViewContainerRef.element.nativeElement.parentNode.scrollTop = 0;

            this.cdr.detectChanges();
          }
        }
      }
    });
  }

  /**
   * Wird aufgerufen nachdem ein neues Detail-Template gerendert wurde und aktualisiert
   * luxSelectedDetail dementsprechend.
   */
  private setNewDetail(detail: any) {
    if (!this.compareObjects(this.luxSelectedDetail, detail)) {
      this._luxSelectedDetail = detail;
      this.selectedPosition = this.luxMasterList.indexOf(detail);
      this.luxSelectedDetailChange.emit(this.luxSelectedDetail);
      // Die Master-Liste fokussieren (die Liste gibt es nur einmal, weil wir auf Changes hören, ist sie aber in einer QueryList)
      this.luxMasterQueryList.first.nativeElement.focus();

      if (this.mobileHelperService.isMobile()) {
        this.luxOpen = false;
      }
      this.mobileHelperService.hasValue = !!this._luxSelectedDetail;
      this.cdr.detectChanges();
    }
  }

  /**
   * Kümmert sich um den Fall, dass die Master-Liste selbst sich ändert.
   */
  private handleMasterListUpdate() {
    this._luxMasterList
      .asObservable()
      .pipe(
        // Workaround um ExpressionChanged-Fehler zu vermeiden
        delay(0),
        tap(() => {
          if (!this.luxMasterList || this.luxMasterList.length === 0) {
            this.luxSelectedDetail = undefined;
          }
        })
      )
      .subscribe();
  }

  /**
   * Prüft ob das Header- oder -Footer-Element der Masterliste ca. 50% der Master-Höhe einnehmen.
   *
   * Wenn ja, wird die Ausrichtung des Master-Empty-Labels und Master-Empty-Icons nicht mehr anhand des Detail bestimmt.
   */
  private checkEmptyIndicatorAlignment() {
    const headerHeight = this.masterHeader ? this.masterHeader.nativeElement.offsetHeight : 0;
    const footerHeight = this.masterFooter ? this.masterFooter.nativeElement.offsetHeight : 0;

    if (this.masterContainer) {
      // Max-Height ist die Hälfte der Master-Container Höhe minus eine kleine Pauschale von 100px damit
      // die Ansicht nicht zu knapp ist
      const maxHeight = this.masterContainer.nativeElement.offsetHeight / 2 - 100;
      this.alignEmptyIndicators = !(headerHeight > maxHeight || footerHeight > maxHeight);
    }
  }

  /**
   * Meldet über den LiveAnnouncer, dass evtl. weitere Daten via InfiniteScrolling nachgeladen werden könnten.
   *
   * "assertive", damit die Meldung auf jeden Fall vom ScreenReader vorgelesen wird und nicht von etwaigen anderen
   * Aussagen verdeckt wird.
   */
  private announcePossibleInfiniteScrolling() {
    this.liveAnnouncer.announce(
      'Die Masterliste hat weitere Einträge erhalten. ' +
        'Aufgrund des Infinite-Scrollings könnten vielleicht noch mehr Einträge nachgeladen werden.',
      'assertive'
    );
  }
}
