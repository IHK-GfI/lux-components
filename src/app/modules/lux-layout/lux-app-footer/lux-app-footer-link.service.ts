import { Injectable } from '@angular/core';
import { LuxAppFooterLinkInfo } from './lux-app-footer-link-info';

@Injectable({
  providedIn: "root"
})
export class LuxAppFooterLinkService {
  private _linkInfos: LuxAppFooterLinkInfo[] = [];

  get linkInfos(): LuxAppFooterLinkInfo[] {
    return this._linkInfos;
  }

  set linkInfos(value: LuxAppFooterLinkInfo[]) {
    this._linkInfos = value ? value : [];
  }

  pushLinkInfos(...value: LuxAppFooterLinkInfo[]) {
    if (!this._linkInfos) {
      this._linkInfos = [];
    }
    this._linkInfos.push(...value);
  }

  removeLinkInfoAtIndex(i: number) {
    this._linkInfos = this._linkInfos.filter((info, index) => index !== i);
  }

  clearLinkInfos() {
    this._linkInfos = [];
  }
}
