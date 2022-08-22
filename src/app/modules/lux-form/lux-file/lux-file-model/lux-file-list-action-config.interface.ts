import { ILuxFileActionConfig, ILuxFilesActionConfig } from './lux-file-action-config.interface';

export interface ILuxFileListActionConfig extends ILuxFileActionConfig {
  hiddenHeader: boolean;
  disabledHeader: boolean;
  iconNameHeader: string;
  labelHeader: string;
}

export interface ILuxFilesListActionConfig extends ILuxFilesActionConfig {
  hiddenHeader: boolean;
  disabledHeader: boolean;
  iconNameHeader: string;
  labelHeader: string;
}
