import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxComponentsConfigParameters } from './lux-components-config-parameters.interface';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { LuxComponentsHammerConfig } from './lux-components-hammer-config.class';

// Diesen bitte !nicht! injecten, sondern den LuxComponentsConfigService.
export const LuxConfigTokenService = new InjectionToken<LuxComponentsConfigParameters>('luxConfig');

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: LuxComponentsHammerConfig
    }
  ]
})
export class LuxComponentsConfigModule {
  // Den InjectionToken mit der übergebenen Konfiguration überschreiben, damit die Komponenten diese nutzen können
  static forRoot(config: LuxComponentsConfigParameters) {
    return {
      ngModule: LuxComponentsConfigModule,
      providers: [
        {
          provide: LuxConfigTokenService,
          useValue: config
        }
      ]
    };
  }
}
