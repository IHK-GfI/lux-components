import { Injectable } from '@angular/core';
import { LuxAppFooterButtonInfo } from './lux-app-footer-button-info';

@Injectable({
  providedIn: "root"
})
export class LuxAppFooterButtonService {
  private _buttonInfos: LuxAppFooterButtonInfo[] = [];

  get buttonInfos(): LuxAppFooterButtonInfo[] {
    return this._buttonInfos;
  }

  set buttonInfos(buttonInfos: LuxAppFooterButtonInfo[]) {
    this._buttonInfos = buttonInfos ? buttonInfos : [];
  }

  pushButtonInfos(...value: LuxAppFooterButtonInfo[]) {
    if (!this.buttonInfos) {
      this._buttonInfos = [];
    }
    this._buttonInfos.push(...value);
  }

  getButtonInfoByCMD(cmd: string) {
    return this.buttonInfos.find((buttonInfo: LuxAppFooterButtonInfo) => buttonInfo.cmd === cmd);
  }

  removeButtonInfoAtIndex(i: number) {
    this._buttonInfos = this._buttonInfos.filter((info, index) => index !== i);
  }

  removeButtonInfoByCmd(cmd: string) {
    this._buttonInfos = this._buttonInfos.filter(info => info.cmd !== cmd);
  }

  clearButtonInfos() {
    this._buttonInfos = [];
  }

  sendButtonCommand(buttonCommand: string) {
    // Den angeklickten Button erhalten und dessen onClick-Funktion aufrufen.
    // Als Parameter den Button selbst mitgeben (falls dieser bearbeitet werden muss, z.B.).
    const clickedButton = this.getButtonInfoByCMD(buttonCommand);
    if (clickedButton) {
      clickedButton.onClick(clickedButton);
    }
  }
}
