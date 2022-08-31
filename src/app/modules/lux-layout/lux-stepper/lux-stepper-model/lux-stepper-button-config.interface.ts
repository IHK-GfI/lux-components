import { LuxActionColorType } from '../../../lux-action/lux-action-model/lux-action-component-base.class';

/**
 * Kennzeichnet die möglichen Optionen, um die Navigations-Buttons des Steppers zu konfigurieren.
 */
export interface ILuxStepperButtonConfig {
  label?: string;
  color?: LuxActionColorType;
  iconName?: string;
  alignIconWithLabel?: boolean;
}
