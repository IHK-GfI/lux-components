/**
 * Config-Interface für die Dialog-Actions in der LuxDialogPresetComponent.
 */
import { LuxActionColorType } from "../../../lux-action/lux-action-model/lux-action-component-base.class";

export interface ILuxDialogAction {
  label?: string;
  color?: LuxActionColorType;
  raised?: boolean;
  iconName?: string;
  tagId?: string;
  disabled?: boolean;
  rounded?: boolean;
  flat?: boolean;
  outlined?: boolean;
}
