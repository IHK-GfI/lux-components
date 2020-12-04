export interface ILuxAppFooterButtonInfo {
  label: string;
  cmd: string;
  color?: string;
  disabled?: boolean;
  hidden?: boolean;
  raised?: boolean;
  iconName?: string;
  alwaysVisible?: boolean;
  tooltip?: string;
  onClick?: (that: ILuxAppFooterButtonInfo) => void;
}

export class LuxAppFooterButtonInfo implements ILuxAppFooterButtonInfo {
  label: string;
  color: string;
  disabled: boolean;
  cmd: string;
  hidden: boolean;
  raised: boolean;
  iconName: string;
  alwaysVisible: boolean;
  tooltip: string;
  onClick: (that: ILuxAppFooterButtonInfo) => void;

  constructor(
    label: string,
    cmd: string,
    color?: string,
    disabled?: boolean,
    hidden?: boolean,
    raised?: boolean,
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
    this.iconName = iconName;
    this.alwaysVisible =
      alwaysVisible === undefined || alwaysVisible === null || alwaysVisible === false ? false : true;
    this.tooltip = tooltip ? tooltip : '';
    this.onClick = onClick ? onClick : (that: ILuxAppFooterButtonInfo) => {};
  }

  /**
   * Statische Methode um ein Info-Objekt zu generieren.
   * Nimmt ein Objekt vom Typ ILuxAppFooterButtonInfo entgegen.
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
      data.iconName,
      data.alwaysVisible,
      data.tooltip,
      data.onClick
    );

    return info;
  }
}
