import { ILuxFileActionConfig } from './lux-file-action-config.interface';

export interface ILuxFileListActionConfig extends ILuxFileActionConfig {
  hiddenHeader: boolean;
  disabledHeader: boolean;
  iconNameHeader: string;
  labelHeader: string;
}
