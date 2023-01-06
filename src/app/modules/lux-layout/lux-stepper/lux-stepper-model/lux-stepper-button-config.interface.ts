/**
 * Kennzeichnet die möglichen Optionen, um die Navigations-Buttons des Steppers zu konfigurieren.
 */
import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';

export interface ILuxStepperButtonConfig {
  label?: string;
  color?: LuxThemePalette;
  iconName?: string;
  alignIconWithLabel?: boolean;
}
