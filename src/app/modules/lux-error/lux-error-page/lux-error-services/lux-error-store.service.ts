import { Injectable } from '@angular/core';
import { ILuxErrorPageConfig } from '../lux-error-interfaces/lux-error-page-config.interface';
import { ILuxError } from '../lux-error-interfaces/lux-error.interface';

/**
 * Dieser Service dient dazu, die aktuellen Fehlermeldungen und die Error-Page Konfiguration zu speichern.
 *
 * Er wird von LuxErrorService und LuxErrorPageComponent benutzt, ohne ihn gäbe es Cycle-Dependency Fehler.
 */
@Injectable({
  providedIn: 'root'
})
export class LuxErrorStoreService {
  /**
   * Enthält die normale Konfiguration der Fehlerseite, kann bei Bedarf mit setConfig überschrieben werden.
   */
  static readonly DEFAULT_CONFIG: ILuxErrorPageConfig = {
    iconName: 'lux-interface-delete-2',
    iconSize: '5x',
    errorText: 'Es ist ein Fehler aufgetreten',
    homeRedirectText: 'Zurück zur Startseite',
    homeRedirectUrl: '',
    errorPageUrl: 'errorpage',
    skipLocationChange: true
  };

  private _config: ILuxErrorPageConfig = {};
  private _error: ILuxError | null = null;
  private _lastErrors: ILuxError[] = [];

  /**
   * Gibt die aktuelle Konfiguration zurück.
   * @returns ILuxErrorPageConfig
   */
  get config() {
    return this._config;
  }

  /**
   * Gibt ein Array der letzten Fehler zurück.
   * @returns Array<ILuxError[]>
   */
  get lastErrors() {
    return Array.of(this._lastErrors);
  }

  /**
   * Gibt den aktuellen Fehler zurück.
   * @returns ILuxError
   */
  get error(): ILuxError | null {
    return this._error;
  }

  /**
   * Sichert den Fehler in der Property und fügt ihn der "lastErrors"-Liste hinzu.
   * @param newError
   */
  set error(newError: ILuxError | null) {
    this._error = newError;

    if (newError) {
      this._lastErrors.push(newError);
    }
  }

  constructor() {}

  /**
   * Initialisiert den Service.
   */
  init() {
    this._lastErrors = [];
    this._error = null;
    this._config = {};
    this.safeNewConfig(LuxErrorStoreService.DEFAULT_CONFIG);
  }

  /**
   * Diese Methode sichert die übergebene Konfiguration.
   * @param luxErrorPageConfig
   */
  safeNewConfig(luxErrorPageConfig: ILuxErrorPageConfig | null) {
    const newConfig: ILuxErrorPageConfig = {};

    Object.assign(newConfig, LuxErrorStoreService.DEFAULT_CONFIG);
    Object.assign(newConfig, luxErrorPageConfig ?? {});

    this._config = newConfig;
  }
}
