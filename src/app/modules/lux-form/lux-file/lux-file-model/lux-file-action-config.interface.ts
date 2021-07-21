export interface ILuxFileActionConfig {
  hidden: boolean;
  disabled: boolean;
  iconName: string;
  label: string;
  onClick?: ($event?: any) => any | void;
  prio?: number;
}
