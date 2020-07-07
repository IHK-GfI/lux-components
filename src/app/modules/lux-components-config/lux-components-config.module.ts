import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxComponentsConfigParameters } from './lux-components-config-parameters.interface';

// Diesen bitte !nicht! injecten, sondern den LuxComponentsConfigService.
export const LuxConfigTokenService = new InjectionToken<LuxComponentsConfigParameters>('luxConfig');

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class LuxComponentsConfigModule {
  // Den InjectionToken mit der übergebenen Konfiguration überschreiben, damit die Komponenten diese nutzen können
  static forRoot(config: LuxComponentsConfigParameters): ModuleWithProviders<LuxComponentsConfigModule> {
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
