import { ILuxDialogAction } from './lux-dialog-action.interface';
import { TemplateRef } from '@angular/core';
import { ILuxDialogConfig } from './lux-dialog-config.interface';

/**
 * Config-Interface für die LuxDialogPresetComponent.
 */
export interface ILuxDialogPresetConfig extends ILuxDialogConfig {
  confirmAction?: ILuxDialogAction;
  declineAction?: ILuxDialogAction;
  title?: string;
  content?: string;
  contentTemplate?: TemplateRef<any>;
}

export const DEFAULT_DIALOG_PRESET_CONF: ILuxDialogPresetConfig = {
  width: 'auto',
  height: 'auto',
  title: '',
  content: '',
  panelClass: [],
  disableClose: true,
  contentTemplate: undefined,
  confirmAction: {
    label: 'Bestätigen',
    raised: true
  },
  declineAction: {
    label: 'Ablehnen',
    raised: true
  }
};
