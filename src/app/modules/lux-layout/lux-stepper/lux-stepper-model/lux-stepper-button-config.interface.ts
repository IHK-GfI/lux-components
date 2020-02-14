/**
 * Kennzeichnet die möglichen Optionen, um die Navigations-Buttons des Steppers zu konfigurieren.
 */
export interface ILuxStepperButtonConfig {
  label?: string;
  color?: 'primary' | 'accent' | 'warn' | undefined | null;
  iconName?: string;
  alignIconWithLabel?: boolean;
}
