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
  private _config: ILuxErrorPageConfig;
  private _error: ILuxError;
  private _lastErrors: ILuxError[];

  /**
   * Enthaelt die normale Konfiguration der Fehlerseite, kann bei Bedarf mit setConfig ueberschrieben werden.
   */
  private readonly _defaultConfig: ILuxErrorPageConfig = {
    iconName: 'lux-interface-delete-2',
    iconSize: '5x',
    errorText: 'Uups... da ist etwas schief gelaufen. Wir kennen die Fehlerdetails bereits und kümmern uns darum.',
    homeRedirectText: 'Zurück zur Startseite',
    homeRedirectUrl: '',
    errorPageUrl: 'errorpage',
    skipLocationChange: true
  };

  /**
   * Gibt die aktuelle Konfiguration zurueck.
   *
   * @returns ILuxErrorPageConfig
   */
  get config() {
    return this._config;
  }

  /**
   * Gibt ein Array der letzten Fehler zurueck.
   *
   * @returns Array<ILuxError[]>
   */
  get lastErrors() {
    return Array.of(this._lastErrors);
  }

  /**
   * Gibt den aktuellen Fehler zurueck.
   *
   * @returns ILuxError
   */
  get error(): ILuxError {
    return this._error;
  }

  /**
   * Sichert den Fehler in der Property und fügt ihn der "lastErrors"-Liste hinzu.
   *
   * @param newError
   */
  set error(newError: ILuxError) {
    this._error = newError;
    this._lastErrors.push(newError);
  }

  constructor() {}

  /**
   * Initialisiert den Service.
   */
  init() {
    this._lastErrors = [];
    this._error = null;
    this._config = {};
    this.safeNewConfig(this._defaultConfig);
  }

  /**
   *
   * @param luxErrorPageConfig
   */
  safeNewConfig(luxErrorPageConfig: ILuxErrorPageConfig) {
    // wenn keine Config übergeben wird, ein leeres Objekt erzeugen
    // das sorgt dafür, dass wenigstens die default-Werte genommen werden
    luxErrorPageConfig = luxErrorPageConfig ? luxErrorPageConfig : {};
    // alle Werte der übergebenen Config prüfen und ggf. default-Werte nutzen
    Object.keys(luxErrorPageConfig).forEach(e => {
      if (luxErrorPageConfig[e] !== undefined && luxErrorPageConfig[e] !== null) {
        this._config[e] = luxErrorPageConfig[e];
      } else {
        this._config[e] = this._defaultConfig[e];
      }
    });
  }
}
