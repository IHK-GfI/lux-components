import { LuxStepperLargeMobileOverlayData } from './lux-stepper-large-mobile-overlay-data';

export const LUX_STEPPER_LARGE_OVERLAY_DEFAULT_CONFIG: LuxStepperLargeMobileOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'lux-stepper-large-mobile-overlay-backdrop',
  panelClass: 'lux-stepper-large-mobile-overlay-panel'
};

export interface LuxStepperLargeMobileOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: LuxStepperLargeMobileOverlayData;
}
