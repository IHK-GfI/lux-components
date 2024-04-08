export interface ILuxAppFooterLinkInfo {
  label: string;
  path: string;
  alwaysVisible?: boolean;
  blank?: boolean;
}

export class LuxAppFooterLinkInfo implements ILuxAppFooterLinkInfo {
  label: string;
  path: string;
  alwaysVisible: boolean;
  blank: boolean;

  constructor(label: string, path: string, alwaysVisible?: boolean, blank?: boolean) {
    this.label = label;
    this.path = path;
    this.alwaysVisible = alwaysVisible ?? false;
    this.blank = blank ?? false;
  }

  /**
   * Statische Methode um ein Info-Objekt zu generieren.
   * Nimmt ein Objekt vom Typ ILuxAppFooterLinkInfo entgegen.
   * @param data
   * @returns eine Link Info
   */
  static generateInfo(data: ILuxAppFooterLinkInfo): LuxAppFooterLinkInfo {
    return new LuxAppFooterLinkInfo(data.label, data.path, data.alwaysVisible);
  }
}
