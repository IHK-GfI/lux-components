import { LuxActionColorType } from "../../lux-action/lux-action-model/lux-action-component-base.class";

export interface ILuxAppFooterButtonInfo {
  label: string;
  cmd: string;
  prio: number;
  color?: LuxActionColorType;
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
  color: LuxActionColorType;
  prio: number;
  disabled: boolean;
  cmd: string;
  hidden: boolean;
  raised: boolean;
  iconName?: string;
  alwaysVisible: boolean;
  tooltip: string;
  onClick: (that: ILuxAppFooterButtonInfo) => void;

  constructor(
    label: string,
    cmd: string,
    prio?: number,
    color?: LuxActionColorType,
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
    this.prio = !prio ? 0 : prio;
    this.disabled = disabled ?? false;
    this.cmd = cmd;
    this.hidden = hidden === true;
    this.raised = raised === undefined || raised === null || raised;
    this.iconName = iconName;
    this.alwaysVisible = !(alwaysVisible === undefined || alwaysVisible === null || !alwaysVisible);
    this.tooltip = tooltip ? tooltip : '';
    this.onClick = onClick ? onClick : () => {};
  }

  /**
   * Statische Methode um ein Info-Objekt zu generieren.
   * Nimmt ein Objekt vom Typ ILuxAppFooterButtonInfo entgegen.
   *
   * @param data
   * @returns eine Button Info
   */
  static generateInfo(data: Partial<ILuxAppFooterButtonInfo>): LuxAppFooterButtonInfo {
    const info = new LuxAppFooterButtonInfo(data.label ?? '', data.cmd ?? '');
    Object.assign(info, data);

    return info;
  }

}
