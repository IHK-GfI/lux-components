import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Mock-Service für den Mobile-Helper, der das Ein- und Ausklappen der Master/Detail-Ansicht steuert
 */
export class LuxMockMasterDetailMobileHelperService {
  mockMobile = false;
  private _masterCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {}

  public get masterCollapsedObservable(): Observable<boolean> {
    return this._masterCollapsed.asObservable();
  }

  /**
   * Sendet über den masterCollapsed$-Subject ein Event mit dem Wert true.
   * Kennzeichnet das der Master geöffnet werden soll.
   */
  public openMaster(): void {
    this._masterCollapsed.next(true);
  }

  /**
   * Sendet über den masterCollapsed$-Subject ein Event mit dem Wert false.
   * Kennzeichnet das der Master geschlossen werden soll.
   */
  public closeMaster(): void {
    this._masterCollapsed.next(false);
  }

  public isMobile(): boolean {
    return this.mockMobile;
  }

  public register() {}

  public unregister() {}
}
