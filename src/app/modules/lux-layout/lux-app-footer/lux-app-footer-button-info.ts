import { LuxActionColorType } from "../../lux-action/lux-action-model/lux-action-component-base.class";

export interface ILuxAppFooterButtonInfo {
  label: string;
  cmd: string;
  color?: LuxActionColorType;
  disabled?: boolean;
  hidden?: boolean;
  raised?: boolean;
  flat?: boolean;
  iconName?: string;
  alwaysVisible?: boolean;
  tooltip?: string;
  onClick?: (that: ILuxAppFooterButtonInfo) => void;
}

export class LuxAppFooterButtonInfo implements ILuxAppFooterButtonInfo {
  label: string;
  color: LuxActionColorType;
  disabled: boolean;
  cmd: string;
  hidden: boolean;
  raised: boolean;
  flat: boolean;
  iconName: string;
  alwaysVisible: boolean;
  tooltip: string;
  onClick: (that: ILuxAppFooterButtonInfo) => void;

  constructor(
    label: string,
    cmd: string,
    color?: LuxActionColorType,
    disabled?: boolean,
    hidden?: boolean,
    raised?: boolean,
    flat?: boolean,
    iconName?: string,
    alwaysVisible?: boolean,
    tooltip?: string,
    onClick?: (that: ILuxAppFooterButtonInfo) => void
  ) {
    this.label = label;
    this.color = color;
    this.disabled = disabled;
    this.cmd = cmd;
    this.hidden = hidden === true ? true : false;
    this.raised = raised === undefined || raised === null || raised === true ? true : false;
    this.flat = flat === undefined || flat === null || flat === true ? true : false;
    this.iconName = iconName;
    this.alwaysVisible =
      alwaysVisible === undefined || alwaysVisible === null || alwaysVisible === false ? false : true;
    this.tooltip = tooltip ? tooltip : '';
    this.onClick = onClick ? onClick : (that: ILuxAppFooterButtonInfo) => {};
  }

  /**
   * Statische Methode um ein Info-Objekt zu generieren.
   * Nimmt ein Objekt vom Typ ILuxAppFooterButtonInfo entgegen.
   *
   * @param data
   * @returns eine Button Info
   */
  static generateInfo(data: ILuxAppFooterButtonInfo): LuxAppFooterButtonInfo {
    const info: LuxAppFooterButtonInfo = new LuxAppFooterButtonInfo(
      data.label,
      data.cmd,
      data.color,
      data.disabled,
      data.hidden,
      data.raised,
      data.flat,
      data.iconName,
      data.alwaysVisible,
      data.tooltip,
      data.onClick
    );

    return info;
  }
}
