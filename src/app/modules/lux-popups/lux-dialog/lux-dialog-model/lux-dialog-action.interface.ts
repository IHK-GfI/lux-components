/**
 * Config-Interface für die Dialog-Actions in der LuxDialogPresetComponent.
 */
export interface ILuxDialogAction {
  label?: string;
  color?: 'primary' | 'accent' | 'warn' | 'default' | '';
  raised?: boolean;
  iconName?: string;
  tagId?: string;
  disabled?: boolean;
  rounded?: boolean;
}
