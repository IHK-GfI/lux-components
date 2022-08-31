import { ILuxFileObject } from './lux-file-object.interface';

export interface ILuxFileActionBaseConfig {
  hidden: boolean;
  disabled: boolean;
  iconName: string;
  label: string;
  prio?: number;
}

export interface ILuxFileActionConfig extends ILuxFileActionBaseConfig {
  onClick?: (file: ILuxFileObject) => void;
}

export interface ILuxFilesActionConfig extends ILuxFileActionBaseConfig {
  onClick?: (files: ILuxFileObject[]) => void;
}
