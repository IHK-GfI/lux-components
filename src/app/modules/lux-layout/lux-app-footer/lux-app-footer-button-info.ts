import { LuxThemePalette } from '../../lux-util/lux-colors.enum';

export interface ILuxAppFooterButtonInfo {
  label: string;
  cmd: string;
  prio: number;
  color?: LuxThemePalette;
  disabled?: boolean;
  hidden?: boolean;
  raised?: boolean;
  flat?: boolean;
  stroked?: boolean;
  iconName?: string;
  alwaysVisible?: boolean;
  tooltip?: string;
  onClick?: (that: ILuxAppFooterButtonInfo) => void;
}

export class LuxAppFooterButtonInfo implements ILuxAppFooterButtonInfo {
  label: string;
  color: LuxThemePalette;
  prio: number;
  disabled: boolean;
  cmd: string;
  hidden: boolean;
  raised: boolean;
  flat: boolean;
  stroked: boolean;
  iconName?: string;
  alwaysVisible: boolean;
  tooltip: string;
  tooltipMenu: string;
  onClick: (that: ILuxAppFooterButtonInfo) => void;

  constructor(
    label: string,
    cmd: string,
    prio?: number,
    color?: LuxThemePalette,
    disabled?: boolean,
    hidden?: boolean,
    raised?: boolean,
    flat?: boolean,
    stroked?: boolean,
    iconName?: string,
    alwaysVisible?: boolean,
    tooltip?: string,
    tooltipMenu?: string,
    onClick?: (that: ILuxAppFooterButtonInfo) => void
  ) {
    this.label = label;
    this.color = color;
    this.prio = !prio ? 0 : prio;
    this.disabled = disabled ?? false;
    this.cmd = cmd;
    this.hidden = hidden === true;
    this.raised = raised === undefined || raised === null || raised;
    this.flat = flat === true;
    this.stroked = stroked === true;
    this.iconName = iconName;
    this.alwaysVisible = !(alwaysVisible === undefined || alwaysVisible === null || !alwaysVisible);
    this.tooltip = tooltip ? tooltip : '';
    this.tooltipMenu = tooltipMenu ? tooltipMenu : '';
    this.onClick = onClick ? onClick : () => {};
  }

  /**
   * Statische Methode um ein Info-Objekt zu generieren.
   * Nimmt ein Objekt vom Typ ILuxAppFooterButtonInfo entgegen.
   * @param data
   * @returns eine Button Info
   */
  static generateInfo(data: Partial<ILuxAppFooterButtonInfo>): LuxAppFooterButtonInfo {
    const info = new LuxAppFooterButtonInfo(data.label ?? '', data.cmd ?? '');
    Object.assign(info, data);

    return info;
  }
}
