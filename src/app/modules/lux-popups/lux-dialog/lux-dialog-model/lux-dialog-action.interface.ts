/**
 * Config-Interface für die Dialog-Actions in der LuxDialogPresetComponent.
 */
import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';

export interface ILuxDialogAction {
  label?: string;
  color?: LuxThemePalette;
  raised?: boolean;
  iconName?: string;
  tagId?: string;
  disabled?: boolean;
  rounded?: boolean;
  flat?: boolean;
  outlined?: boolean;
}
