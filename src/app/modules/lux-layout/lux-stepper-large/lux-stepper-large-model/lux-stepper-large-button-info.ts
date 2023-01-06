import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';

export const LUX_STEPPER_LARGE_DEFAULT_PREV_BTN_CONF: LuxStepperLargeButtonInfo = {
  label: $localize`:@@luxc.stepper.back.btn:Zurück`,
  color: undefined,
  iconName: 'lux-interface-arrows-left',
  iconShowRight: false
};

export const LUX_STEPPER_LARGE_DEFAULT_NEXT_BTN_CONF: LuxStepperLargeButtonInfo = {
  label: $localize`:@@luxc.stepper.next.btn:Weiter`,
  color: 'primary',
  iconName: 'lux-interface-arrows-right',
  iconShowRight: true
};

export const LUX_STEPPER_LARGE_DEFAULT_FIN_BTN_CONF: LuxStepperLargeButtonInfo = {
  label: $localize`:@@luxc.stepper.finish.btn:Abschließen`,
  color: 'primary',
  iconName: undefined,
  iconShowRight: false
};

export class LuxStepperLargeButtonInfo {
  label?: string;
  color?: LuxThemePalette;
  iconName?: string;
  iconShowRight?: boolean;
  alignIconWithLabel?: boolean;
}
