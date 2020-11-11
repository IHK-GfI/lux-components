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
  // Fallback-Konfiguration, falls sonst keine gefunden werden konnte
  public static readonly DEFAULT_CONFIG: LuxComponentsConfigParameters = {
    displayLuxConsoleLogs: false,
    generateLuxTagIds: false,
    lookupServiceUrl: '/lookup/',
    nachrichtServiceURL: '/nachricht/',
    labelConfiguration: {
      allUppercase: true,
      notAppliedTo: ['lux-link', 'lux-side-nav-item', 'lux-menu-item']
    },
    cardExpansionAnimationActive: true,
    displayBindingDebugHint: true,
    rippleConfiguration: {
      exitDuration: 500,
      enterDuration: 500
    }
  };

  // Subject mit dem aktuellen Konfig-Wert, welcher ausgelesen werden kann
  private config$: BehaviorSubject<LuxComponentsConfigParameters> = new BehaviorSubject<LuxComponentsConfigParameters>(
    null
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
    // Wenn keine Konfiguration geladen werden konnte, Standard-Konfig benutzen und eine Warnung ausgeben.
    if (!config) {
      console.warn(
        'Achtung: Es wurde keine Konfiguration für die LuxComponents definiert.\n',
        'Benutze Standard-Konfiguration:',
        LuxComponentsConfigService.DEFAULT_CONFIG
      );
      this.config$.next(LuxComponentsConfigService.DEFAULT_CONFIG);
    } else {
      this.config$.next(this.mergeDefaultData(config));
    }
  }

  /**
   * Gibt zurück, ob die Labels als Uppercase gekennzeichnet sind und ob
   * die übergebenen Selektoren in den Ausnahmen geführt sind.
   * @param selector
   */
  isLabelUppercaseForSelector(selector: string): boolean {
    const config = this.config$.value;
    return config.labelConfiguration.allUppercase && config.labelConfiguration.notAppliedTo.indexOf(selector) === -1;
  }

  /**
   * Ersetzt die aktuelle Konfiguration mit der übergebenen (wenn gültiger Wert).
   * @param config
   */
  updateConfiguration(config: LuxComponentsConfigParameters) {
    if (!config) {
      console.warn('Die übergebene Konfiguration ist undefined/null und wird nicht übernommen.');
    } else {
      this.config$.next(this.mergeDefaultData(config));
    }
  }

  /**
   * Kombiniert die übergebene Konfiguration mit der Standard-Konfig.
   *
   * Übernimmt die Werte aus der Standard-Konfig, die nicht im übergebenen gesetzt wurden.
   * @param config
   */
  private mergeDefaultData(config: LuxComponentsConfigParameters): LuxComponentsConfigParameters {
    const mergedConfig = {};
    Object.keys(config).forEach((key: string) => {
      mergedConfig[key] = config[key];
    });
    Object.keys(LuxComponentsConfigService.DEFAULT_CONFIG).forEach((key: string) => {
      if (mergedConfig[key] === undefined || mergedConfig[key] === null) {
        mergedConfig[key] = LuxComponentsConfigService.DEFAULT_CONFIG[key];
      }
    });
    return mergedConfig as LuxComponentsConfigParameters;
  }
}
