import { Inject, Injectable, Optional } from '@angular/core';
import { LuxConfigTokenService } from './lux-components-config.module';
import { LuxComponentsConfigParameters } from './lux-components-config-parameters.interface';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Dieser Service wird dazu verwendet, auf die Konfiguration der LuxComponents zuzugreifen und diese auszulesen bzw.
 * auch zu aktualisieren.
 */
@Injectable({
  providedIn: 'root'
})
export class LuxComponentsConfigService {

  public static readonly DEFAULT_CONFIG = {
    displayLuxConsoleLogs: false,
    generateLuxTagIds: false,
    lookupServiceUrl: '/lookup/',
    labelConfiguration: {
      allUppercase: false,
      notAppliedTo: []
    },
    cardExpansionAnimationActive: true,
    rippleConfiguration: {
      exitDuration: 500,
      enterDuration: 500
    },
    buttonConfiguration: {
      throttleTimeMs: 600
    }
  };

  private config$: BehaviorSubject<LuxComponentsConfigParameters> = new BehaviorSubject<LuxComponentsConfigParameters>(
    LuxComponentsConfigService.DEFAULT_CONFIG
  );

  /**
   * Gibt das Observable mit der aktuell gesetzten Konfiguration zurück.
   */
  get config(): Observable<LuxComponentsConfigParameters> {
    return this.config$.asObservable();
  }

  /**
   * Gibt die aktuell gesetzte Konfiguration direkt zurück.
   */
  get currentConfig(): LuxComponentsConfigParameters {
    return this.config$.getValue();
  }

  constructor(@Inject(LuxConfigTokenService) @Optional() config: LuxComponentsConfigParameters) {
    // Wenn keine Konfiguration geladen werden konnte, Standard-Konfig benutzen und eine Info ausgeben.
    if (!config) {
      this.config$.next(LuxComponentsConfigService.DEFAULT_CONFIG);
    } else {
      this.config$.next(this.mergeDefaultData(config));
    }
  }

  /**
   * Gibt zurück, ob die Labels als Uppercase gekennzeichnet sind und ob
   * die übergebenen Selektoren in den Ausnahmen geführt sind.
   *
   * @param selector
   */
  isLabelUppercaseForSelector(selector: string): boolean {
    const config = this.config$.value;
    return (
      !!config.labelConfiguration &&
      config.labelConfiguration.allUppercase &&
      config.labelConfiguration.notAppliedTo.indexOf(selector) === -1
    );
  }

  /**
   * Ersetzt die aktuelle Konfiguration mit der übergebenen (wenn gültiger Wert).
   *
   * @param config
   */
  updateConfiguration(config: LuxComponentsConfigParameters) {
    if (!config) {
      console.warn('The new configuration is undefined or null and was ignored.');
    } else {
      this.config$.next(this.mergeDefaultData(config));
    }
  }

  /**
   * Kombiniert die übergebene Konfiguration mit der Standard-Konfig.
   *
   * Übernimmt die Werte aus der Standard-Konfig, die nicht im übergebenen gesetzt wurden.
   *
   * @param config
   */
  private mergeDefaultData(config: LuxComponentsConfigParameters): LuxComponentsConfigParameters {
    return { ...LuxComponentsConfigService.DEFAULT_CONFIG, ...config };
  }
}
