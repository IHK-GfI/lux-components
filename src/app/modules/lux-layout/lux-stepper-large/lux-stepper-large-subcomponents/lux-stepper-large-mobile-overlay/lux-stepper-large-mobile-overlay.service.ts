import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { LUX_STEPPER_LARGE_OVERLAY_DEFAULT_CONFIG, LuxStepperLargeMobileOverlayConfig } from './lux-stepper-large-mobile-overlay-config';
import { LUX_STEPPER_LARGE_OVERLAY_DATA } from './lux-stepper-large-mobile-overlay-data';
import { LuxStepperLargeMobileOverlayRef } from './lux-stepper-large-mobile-overlay-ref';
import { LuxStepperLargeMobileOverlayComponent } from './lux-stepper-large-mobile-overlay.component';

@Injectable({ providedIn: 'root' })
export class LuxStepperLargeMobileOverlayService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open(config: LuxStepperLargeMobileOverlayConfig): LuxStepperLargeMobileOverlayRef {
    const previewConfig = { ...LUX_STEPPER_LARGE_OVERLAY_DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(previewConfig);
    const previewRef = new LuxStepperLargeMobileOverlayRef(overlayRef);
    this.attachDialogContainer(overlayRef, previewRef, previewConfig);

    overlayRef.backdropClick().subscribe(() => previewRef.close());

    return previewRef;
  }

  private attachDialogContainer(
    overlayRef: OverlayRef,
    dialogRef: LuxStepperLargeMobileOverlayRef,
    config: LuxStepperLargeMobileOverlayConfig
  ) {
    const injector = this.createInjector(config, dialogRef);
    const containerPortal = new ComponentPortal(LuxStepperLargeMobileOverlayComponent, null, injector);
    const containerRef: ComponentRef<LuxStepperLargeMobileOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(config: LuxStepperLargeMobileOverlayConfig) {
    return this.overlay.create(this.getOverlayConfig(config));
  }

  private createInjector(config: LuxStepperLargeMobileOverlayConfig, dialogRef: LuxStepperLargeMobileOverlayRef): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: LuxStepperLargeMobileOverlayRef, useValue: dialogRef },
        { provide: LUX_STEPPER_LARGE_OVERLAY_DATA, useValue: config.data }
      ]
    });
  }

  private getOverlayConfig(config: LuxStepperLargeMobileOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position().global().right();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
