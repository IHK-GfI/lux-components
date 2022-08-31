import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';

@Injectable({
  providedIn: "root"
})
export class LuxMasterDetailMobileHelperService implements OnDestroy {
  private _mdRegistered$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _masterCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _hasValue$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subscription: Subscription;
  mobileView: boolean;

  constructor(private mediaObserver: LuxMediaQueryObserverService) {
    this.mobileView = this.mediaObserver.isXS() || this.mediaObserver.isSM();

    this.subscription = this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
      setTimeout(() => {
        this.mobileView = this.mediaObserver.isXS() || this.mediaObserver.isSM();
        this.handleMasterCollapseState();
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get masterCollapsed$(): boolean {
    return this._masterCollapsed$.getValue();
  }

  public get masterCollapsedObservable(): Observable<boolean> {
    return this._masterCollapsed$.asObservable();
  }

  public get isRegisteredObservable(): Observable<boolean> {
    return this._mdRegistered$.asObservable();
  }

  public get isRegistered(): boolean {
    return this._mdRegistered$.getValue();
  }

  public get hasValueObservable(): Observable<boolean> {
    return this._hasValue$.asObservable();
  }

  public get hasValue(): boolean {
    return this._hasValue$.getValue();
  }

  public set hasValue(hasValue: boolean) {
    this._hasValue$.next(hasValue);
  }

  /**
   * Sendet über den masterCollapsed$-Subject ein Event mit dem Wert true.
   * Kennzeichnet das der Master geöffnet werden soll.
   */
  public openMaster(): void {
    this._masterCollapsed$.next(true);
  }

  /**
   * Sendet über den masterCollapsed$-Subject ein Event mit dem Wert false.
   * Kennzeichnet das der Master geschlossen werden soll.
   */
  public closeMaster(): void {
    this._masterCollapsed$.next(false);
  }

  /**
   * Gibt zurück, ob eine Media-Query für XS oder SM aktuell aktiv ist.
   *
   * @returns boolean
   */
  public isMobile(): boolean {
    return this.mobileView;
  }

  /**
   * Meldet eine Master-Detail-Komponente für diesen Service an.
   */
  public register() {
    if (!this.isRegistered) {
      this._mdRegistered$.next(true);
    } else {
      console.error(
        'Fehler: Ein Master-Detail-Helper-Service kann nur eine registrierte Master-Detail-Komponente haben.'
      );
    }
  }

  /**
   * Meldet die aktuelle Master-Detail-Komponente dieses Services ab.
   */
  public unregister() {
    if (this.isRegistered) {
      this._mdRegistered$.next(false);
    }
  }

  /**
   * Sendet ein Event, um den Master zu öffnen bzw. zu schliessen,
   * wenn sich der Zustand der Media-Query geändert hat.
   */
  private handleMasterCollapseState(): void {
    setTimeout(() => {
      if (this.hasValue && (this.mediaObserver.isXS() || this.mediaObserver.isSM())) {
        this.closeMaster();
      } else {
        this.openMaster();
      }
    });
  }
}
