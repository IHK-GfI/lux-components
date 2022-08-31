import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LuxScrollPosition } from './lux-scroll-position';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[luxInfiniteScroll]'
})
export class LuxInfiniteScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  // Zeitgrenze (ms) nach der das neuste Scroll-Event des Subjects genommen wird
  static readonly SCROLL_DEBOUNCE_TIME: number = 200;

  private scrollSubscription: Subscription;
  private scroll$: Subject<void> = new Subject<void>();
  private lastPosition: LuxScrollPosition = { scrollHeight: 0, scrollTop: 0, clientHeight: 0 };

  // Prozentzahl nach der ein scrollCallback ausgelöst wird
  @Input() luxScrollPercent = 85;
  // Direkt bei Initialisierung einen ScrollEvent emitten
  @Input() luxImmediateCallback = true;
  // Flag, ob aktuell Daten geladen werden (aus aufrufender Komponente)
  @Input() luxIsLoading = false;
  // Emitter an den sich andere Komponenten hängen können, um auf den Scroll zu reagieren
  @Output() luxScrolled: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Constructor
   *
   * @param elementRef Ziel-Element dieser Direktive
   */
  constructor(private elementRef: ElementRef) {
    // Die neuen Scroll-Events bündeln und nach der Zeitspanne SCROLL_DEBOUNCE_TIME prüfen, ob ein
    // "luxScrolled" emitten soll oder nicht.
    this.scrollSubscription = this.scroll$
      .pipe(debounceTime(LuxInfiniteScrollDirective.SCROLL_DEBOUNCE_TIME))
      .subscribe(() => {
        this.performScrollCheck();
      });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this), true);
  }

  ngAfterViewInit() {
    // Prüfen, ob ein initiales Laden von Daten starten soll
    if (this.hasScrollbar() && this.luxImmediateCallback && !this.luxIsLoading) {
      this.luxScrolled.emit();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
    this.scrollSubscription.unsubscribe();
  }

  /**
   * Prüft, ob ein Scroll-Event auf dem Zielelement stattgefunden hat.
   * Wenn ja, wird das Subject scroll$ angestoßen.
   *
   * @param event
   */
  onScroll(event: any) {
    const target = event.target ? event.target : event.srcElement;
    if (target === this.elementRef.nativeElement) {
      this.scroll$.next();
    }
  }

  /**
   * Holt die aktuelle Position im Scroll-Bereich und führt
   * einen Event-Emit durch, wenn die Bedingungen erfüllt sind.
   */
  private performScrollCheck() {
    const position: LuxScrollPosition = {
      scrollTop: this.elementRef.nativeElement.scrollTop,
      scrollHeight: this.elementRef.nativeElement.scrollHeight,
      clientHeight: this.elementRef.nativeElement.clientHeight
    };

    // Wenn nach unten gescrollt wird und die angegebene Prozentzahl überschritten wird
    if (this.isUserScrollingDown(position) && this.isScrollExpectedPercent(position) && !this.luxIsLoading) {
      this.luxScrolled.emit();
    }

    this.lastPosition = position;
  }

  /**
   * Prüft, ob der User gerade nach unten scrollt.
   * Vergleicht dabei die scrollTop Position des Users mit der des Elements.
   *
   * @param curPos
   */
  private isUserScrollingDown(curPos: LuxScrollPosition) {
    return this.lastPosition.scrollTop < curPos.scrollTop;
  }

  /**
   * Prüft, ob der Scrollbereich überschritten wurde.
   *
   * @param position
   * @returns boolean
   */
  private isScrollExpectedPercent(position: LuxScrollPosition) {
    return (position.scrollTop + position.clientHeight) / position.scrollHeight > this.luxScrollPercent / 100;
  }

  /**
   * Prüft, ob das Zielelement eine Scrollbar gesetzt hat.
   */
  private hasScrollbar() {
    return this.elementRef.nativeElement.scrollHeight > this.elementRef.nativeElement.clientHeight;
  }
}
