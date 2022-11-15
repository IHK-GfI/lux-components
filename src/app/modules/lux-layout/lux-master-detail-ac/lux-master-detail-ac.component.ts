import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterContentInit,
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
import { BehaviorSubject, ReplaySubject, Subscription, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LuxListItemComponent } from '../lux-list/lux-list-subcomponents/lux-list-item.component';
import { LuxListComponent } from '../lux-list/lux-list.component';
import { LuxTabsComponent } from '../lux-tabs/lux-tabs.component';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxDetailHeaderAcComponent } from './lux-detail-header-ac/lux-detail-header-ac.component';
import { LuxDetailViewAcComponent } from './lux-detail-view-ac/lux-detail-view-ac.component';
import { LuxDetailWrapperAcComponent } from './lux-detail-view-ac/lux-detail-wrapper-ac.component';
import { LuxMasterFooterAcComponent } from './lux-master-footer-ac/lux-master-footer-ac.component';
import { LuxMasterHeaderAcComponent } from './lux-master-header-ac/lux-master-header-ac.component';
import { LuxMasterListAcComponent } from './lux-master-list-ac/lux-master-list-ac.component';

@Component({
  selector: 'lux-master-detail-ac',
  templateUrl: './lux-master-detail-ac.component.html',
  styleUrls: ['./lux-master-detail-ac.component.scss'],
  animations: [
    trigger('masterIsLoadingChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('1 => 0', animate('0.5s')),
      transition('0 => 1', animate('1s'))
    ])
  ]
})
export class LuxMasterDetailAcComponent<T = any> implements OnInit, AfterContentInit, AfterViewInit, DoCheck, OnDestroy {
  @Output() luxSelectedDetailChange = new EventEmitter<T | null>();
  @Output() luxScrolled = new EventEmitter<void>();

  @ContentChild(LuxMasterListAcComponent) masterSimple?: LuxMasterListAcComponent;
  @ContentChild(LuxDetailViewAcComponent) detailView!: LuxDetailViewAcComponent;
  @ContentChild(LuxMasterFooterAcComponent, { read: ElementRef }) masterFooter?: ElementRef;
  @ContentChild(LuxDetailHeaderAcComponent, { read: ElementRef }) detailHeader?: ElementRef;

  @ViewChildren(LuxListComponent, { read: ElementRef, emitDistinctChangesOnly: false }) luxMasterQueryList!: QueryList<ElementRef>;
  @ViewChildren(LuxListItemComponent) luxMasterListItemQueryList!: QueryList<LuxListItemComponent>;
  @ViewChild(LuxMasterHeaderAcComponent, { read: ElementRef, static: true }) masterHeader?: ElementRef;
  @ViewChild(LuxMasterHeaderAcComponent, { static: true }) masterHeaderComponent?: LuxMasterHeaderAcComponent;
  @ViewChild(LuxListItemComponent, { read: ElementRef }) luxMasterEntryElementRef?: ElementRef;
  @ContentChild(LuxTabsComponent) tabsComponent?: LuxTabsComponent;
  @ViewChild('masterSpinnerCard', { read: ElementRef, static: true }) masterSpinnerCard?: ElementRef;
  @ViewChild('detailContainer', { read: ElementRef }) detailFrame?: ElementRef;
  @ViewChild('detailEmpty', { read: ElementRef, static: true }) detailEmpty?: ElementRef;
  @ViewChild('detailViewContainerRef', { read: ViewContainerRef, static: true }) detailViewContainerRef!: ViewContainerRef;
  @ViewChild('masterContainer', { read: ElementRef, static: true }) masterContainer?: ElementRef;

  @HostBinding('class.lux-overflow-y-auto') overflowY = true;

  private _luxOpen = false;
  private _luxMasterList = new BehaviorSubject<Array<any>>([]);
  private _luxSelectedDetail: T | null = null;

  private masterListLength = 0;
  private maxItemsVisible?: number;
  private updateDetail$: ReplaySubject<any> = new ReplaySubject(1);
  private subscriptions: Subscription[] = [];

  isMobile: boolean;
  isMedium: boolean;
  detailContext = { $implicit: {} };
  flexMaster?: string;
  flexDetail?: string;
  showMasterHeader?: boolean;
  // Enthält die Position des aktuell selektierten Elements
  selectedPosition = -1;

  // Flag, das bestimmt, ob die Empty-Anzeigen der Masterliste anhand der Detail-Ansicht ausgerichtet werden
  alignEmptyIndicators = true;

  @Input() luxEmptyIconMaster = 'lux-interface-alert-information-circle';
  @Input() luxEmptyLabelMaster = $localize`:@@luxc.master-detail.master.empty_label:Keine Einträge vorhanden`;
  @Input() luxEmptyIconDetail = 'lux-interface-alert-information-circle';
  @Input() luxEmptyLabelDetail = $localize`:@@luxc.master-detail.detail.empty_label:Kein Element ausgewählt`;
  @Input() luxEmptyIconMasterSize = '5x';
  @Input() luxEmptyIconDetailSize = '5x';
  @Input() luxMasterSpinnerDelay = 1000;
  @Input() luxTagIdMaster?: string;
  @Input() luxTagIdDetail?: string;
  @Input() luxTitleLineBreak = false;
  @Input() luxMasterIsLoading = false;
  @Input() luxCompareWith = (o1: T, o2: T) => o1 === o2;
  @Input() luxDefaultDetailHeader = true;

  get luxOpen() {
    return this._luxOpen;
  }

  @Input()
  set luxOpen(open){
    this._luxOpen = open;
    this.updateOpen();
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
    this._luxMasterList.next(value ? value : []);
    this.masterListLength = value ? value.length : 0;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private liveAnnouncer: LiveAnnouncer,
    private mediaObserver: LuxMediaQueryObserverService
  ) {
    this.isMobile = this.mediaObserver.isXS() || this.mediaObserver.isSM();
    this.isMedium = this.mediaObserver.isMD();
    this.subscriptions.push(
      this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
          this.isMobile = this.mediaObserver.isXS() || this.mediaObserver.isSM();
          this.isMedium = this.mediaObserver.isMD();
          if (this.isMobile || this.isMedium) {
            this.updateOpen();
          }
      })
    );
  }

  ngOnInit() {
    this.handleMasterListUpdate();
    this.updateOpen();
    // this.mobileHelperService.openMaster();
  }

  ngAfterContentInit() {
    LuxUtil.assertNonNull('detailView', this.detailView);
  }

  ngAfterViewInit() {
    LuxUtil.assertNonNull('detailViewContainerRef', this.detailViewContainerRef);
    this.showMasterHeader = this.masterHeaderComponent?.headerContentContainer.nativeElement.children.length > 0;
    this.handleDetailUpdate();
    this.handleMasterQueryList();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngDoCheck() {
    // Wurde ein Element in die Masterliste gepusht oder entfernt?
    if (this.luxMasterList && this.luxMasterList.length !== this.masterListLength) {
      if (this.luxMasterList.length > this.masterListLength) {
        this.announcePossibleInfiniteScrolling();
      }

      // Wenn ja, dass selektierte Detail neu rendern
      this.masterListLength = this.luxMasterList.length;
      this.luxSelectedDetail = this.luxMasterList[this.selectedPosition];

      this.announcePossibleInfiniteScrolling();
    }

    // Ausrichtung der Empty-Indikatoren der Masterliste prüfen
    if (!this.isMobile && (!this.luxMasterList || this.luxMasterList.length === 0)) {
      this.checkEmptyIndicatorAlignment();
    }
  }

  /**
   * Wenn in der LuxList ein neuer Selected-Wert gepusht wird, diesen abfangen und
   * ein neues Detail auswählen.
   *
   * @param index
   */
  onSelectedChange(index: number) {
    if (index > -1) {
      this.selectedPosition = index;

      this.updateDetail$.next(this.luxMasterList[index]);

      if (this.isMobile) {
        this.onCloseMaster();
      }
    }
  }

  onOpenMaster() {
    this.luxOpen = true;
  }

  onCloseMaster() {
    this.luxOpen = false;
  }

  /**
   * Bestimmt, ob die Masterliste auf- oder eingeklappt ist.
   *
   * @param open
   */
  toggleList(open: boolean) {
    if (open) {
      this.onOpenMaster();
    } else {
      this.onCloseMaster();
    }

    if (this.tabsComponent) {
      this.tabsComponent.rerenderTabs();
    }
  }

  onBackToMaster(){
    console.log('Back to Master clicked')
    
  }

  /**
   * Prüft, ob die Detailansicht gerade für den User sichtbar ist.
   *
   * @returns boolean
   */
  isDetailInvisible(): boolean {
    return this.isMobile && this.luxOpen;
  }

  onInfiniteScrollingLoad() {
    this.luxScrolled.emit();
  }

  onSwipeLeft() {
    if (this.isMobile) {
      this.onCloseMaster();
    }
  }

  onSwipeRight() {
    if (this.isMobile) {
      this.onOpenMaster();
    }
  }

  /**
   * Kapselung von der übergebenen luxCompareWith-Funktion.
   * Fängt undefinierte Objekte ab und returned stattdessen false.
   *
   * @param o1
   * @param o2
   */
  compareObjects(o1: T | null, o2: T | null) {
    if (!o1 || !o2) {
      return false;
    }
    return this.luxCompareWith(o1, o2);
  }

  /**
   * Steuert das Breitenverhältnis von Master und Detail je nachdem
   * ob der Master auf- oder eingeklappt ist und ob eine Mobilansicht aktiv ist.
   */
  private updateOpen() {
    if (this.luxOpen) {
      if (this.isMobile) {
        this.flexMaster = '100';
        this.flexDetail = '0';
      } else if (this.isMedium){
        this.flexMaster = 'calc(50% - 30px)'; /** 30px = Gap zwischen Master und Detail */
        this.flexDetail = '50';
      } else {
        this.flexMaster = '30';
        this.flexDetail = '70';
      }
    } else {
      if (this.isMobile) {
        this.flexMaster = '0';
        this.flexDetail = '100';
      } else {
        this.flexMaster = '20px';
        this.flexDetail = 'grow';
      }
    }
  }

  /**
   * Kümmert sich um Änderungen an der HTML-Node der Master-Liste.
   * Rückt dabei das selektierte Element in den Fokus und berechnet wie viele Elemente
   * gerade in der Liste sichtbar sein können (für das Durchschalten mit Pfeiltasten benötigt).
   */
  private handleMasterQueryList() {
    this.subscriptions.push(
      this.luxMasterQueryList.changes.subscribe((masterListElements: QueryList<ElementRef>) => {
        if (masterListElements.first) {
          const { nativeElement } = masterListElements.first;
          this.maxItemsVisible = Math.floor(nativeElement.offsetHeight / nativeElement.offsetHeight);
        }
        // Der Abschnitt hier fängt den Fall ab, dass z.B. das LuxMasterList-Array selbst angepasst wird (z.B. durch Array.reverse).
        // Das sorgt dafür, dass das visuell selektierte Element auch das passende zur Detail-View ist.
        const newSelectedPosition: number = this.luxMasterList.indexOf(this.luxSelectedDetail);
        if (newSelectedPosition !== this.selectedPosition) {
          setTimeout(() => {
            this.selectedPosition = newSelectedPosition;
          });
        }
      })
    );
  }

  /**
   * Kümmert sich um das Zuklappen der Master-Liste, wenn zwischen Mobil- und Desktopansicht gewechselt wird.
   */
  // private handleViewCollapse() {
  //   this.subscriptions.push(this.mobileHelperService.masterCollapsedObservable.subscribe((open: boolean) => {
  //     // Falls nichts selektiert ist, sollte die Darstellung beim Wechsel in kleine Media Queries die Masterliste zeigen
  //     if (this.isMobile && !this.luxSelectedDetail && !open) {
  //       open = true;
  //     }
  //     this.luxOpen = open;
  //     this.updateOpen();
  //   }));
  // }

  /**
   * Kümmert sich um Änderungen an dem selektierten Detail.
   * Dabei werden mehrere Zuweisungen an das Detail über throttleTime gebündelt und nur das Aktuellste genommen.
   * Anschließend wird die Komponente angewiesen das neue Detail-Objekt zu rendern.
   */
  private handleDetailUpdate() {
    this.subscriptions.push(
      this.updateDetail$.asObservable().subscribe((detail: any) => {
        if (!detail) {
          this.detailViewContainerRef.clear();
          this.setNewDetail(detail);
        } else {
          if (!this.compareObjects(this.luxSelectedDetail, detail)) {
            this.detailViewContainerRef.clear();

            if (detail) {
              this.detailContext = { $implicit: detail };

              // Den Detail-Wrapper erzeugen und abfangen, wann die Nodes geladen worden sind
              const child = this.cfr.resolveComponentFactory(LuxDetailWrapperAcComponent);
              const childRef = this.detailViewContainerRef.createComponent(child);
              const instance = childRef.instance;
              instance.luxDetailContext = this.detailContext;
              instance.luxDetailTemplate = this.detailView.tempRef;
              this.subscriptions.push(
                instance.luxDetailRendered.subscribe(() => {
                  this.setNewDetail(detail);
                })
              );
              // Die Detailansicht nach dem Wechsel wieder nach oben scrollen lassen
              this.detailViewContainerRef.element.nativeElement.parentNode.scrollTop = 0;

              this.cdr.detectChanges();
            }
          }
        }
      })
    );
  }

  /**
   * Wird aufgerufen, nachdem ein neues Detail-Template gerendert wurde und aktualisiert
   * luxSelectedDetail dementsprechend.
   *
   * @param detail
   */
  private setNewDetail(detail: any) {
    if (!this.compareObjects(this.luxSelectedDetail, detail)) {
      this._luxSelectedDetail = detail;
      this.selectedPosition = this.luxMasterList.indexOf(detail);
      this.luxSelectedDetailChange.emit(this.luxSelectedDetail);
      // Die Master-Liste fokussieren (die Liste gibt es nur einmal, weil wir auf Changes hören, ist sie aber in einer QueryList)
      this.luxMasterQueryList.first.nativeElement.focus();

      if (this.isMobile) {
        this.luxOpen = false;
      }
      // this.mobileHelperService.hasValue = !!this._luxSelectedDetail;
      this.cdr.detectChanges();
    }
  }

  /**
   * Kümmert sich um den Fall, dass die Master-Liste selbst sich ändert.
   */
  private handleMasterListUpdate() {
    this.subscriptions.push(
      this._luxMasterList
        .asObservable()
        .pipe(
          // Workaround um ExpressionChanged-Fehler zu vermeiden
          delay(0),
          tap(() => {
            if (!this.luxMasterList || this.luxMasterList.length === 0) {
              this.luxSelectedDetail = null;
            }
          })
        )
        .subscribe()
    );
  }

  /**
   * Prüft, ob das Header- oder -Footer-Element der Masterliste ca. 50 % der Master-Höhe einnehmen.
   *
   * Wenn ja, wird die Ausrichtung des Master-Empty-Labels und Master-Empty-Icons nicht mehr anhand des Details bestimmt.
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
