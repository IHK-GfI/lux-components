import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILuxErrorPageConfig } from './lux-error-interfaces/lux-error-page-config.interface';
import { ILuxError } from './lux-error-interfaces/lux-error.interface';
import { LuxErrorStoreService } from './lux-error-services/lux-error-store.service';

@Component({
  selector: 'lux-error-page',
  templateUrl: './lux-error-page.component.html'
})
export class LuxErrorPageComponent {
  get error(): ILuxError | null {
    return this.errorStore.error;
  }

  get errorConfig(): ILuxErrorPageConfig {
    return this.errorStore.config;
  }

  constructor(private router: Router, private errorStore: LuxErrorStoreService) {}

  /**
   * Navigiert über den Router zum eingetragenen Home-Pfad
   */
  clickHomeRedirect() {
    this.router.navigate([this.errorConfig.homeRedirectUrl]);
  }
}
