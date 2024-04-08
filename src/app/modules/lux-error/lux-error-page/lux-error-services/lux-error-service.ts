import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LuxUtil } from '../../../lux-util/lux-util';
import { ILuxErrorPageConfig } from '../lux-error-interfaces/lux-error-page-config.interface';
import { ILuxError } from '../lux-error-interfaces/lux-error.interface';
import { LuxErrorPageComponent } from '../lux-error-page.component';
import { LuxErrorStoreService } from './lux-error-store.service';

@Injectable({
  providedIn: 'root'
})
export class LuxErrorService {
  constructor(private router: Router, private errorStore: LuxErrorStoreService) {
    this.errorStore.init();
    this.setConfig(null);
  }

  /**
   * Überschreibt die aktuelle Konfiguration für die Fehlerseite.
   * Übernimmt so viele Werte wie möglich aus der übergebenen Konfiguration,
   * sonst werden die Default-Werte genutzt.
   * @param luxErrorPageConfig
   */
  setConfig(luxErrorPageConfig: ILuxErrorPageConfig | null) {
    this.errorStore.safeNewConfig(luxErrorPageConfig);
    // potentielle alte Route zu LuxErrorPageComponent entfernen
    this.router.config = this.router.config.filter((entry) => entry.component !== LuxErrorPageComponent);
    // neue Route eintragen
    this.router.config.unshift({ path: this.errorStore.config.errorPageUrl, component: LuxErrorPageComponent });
  }

  /**
   * Navigiert zur Fehlerkomponente und versucht einen Fehler
   * (wenn mitgegeben) zu sichern.
   * @param error
   * @returns Observable<any>
   */
  navigateToErrorPage(error?: ILuxError): Observable<any> {
    if (error) {
      this.errorStore.error = error;
    }
    const { errorPageUrl, skipLocationChange } = this.errorStore.config;

    LuxUtil.assertNonNull('errorPageUrl', errorPageUrl);

    return of(this.router.navigateByUrl(errorPageUrl!, { skipLocationChange }));
  }
}
