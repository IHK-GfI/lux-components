export class LuxSnackbarConfig {
  iconName?: string = '';
  iconSize?: string = '3x';
  iconColor?: string = '';
  text?: string = '';
  textColor?: string = '';
  action?: string = '';
  actionColor?: string = '';

  constructor(partial: Partial<LuxSnackbarConfig>) {
    Object.assign(this, partial);
  }
}
