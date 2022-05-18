import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LuxAppFooterButtonInfo } from './lux-app-footer-button-info';

@Injectable({
  providedIn: 'root'
})
export class LuxAppFooterButtonService implements OnDestroy {
  private buttonInfoSubject = new BehaviorSubject<LuxAppFooterButtonInfo[]>([]);

  get buttonInfos(): LuxAppFooterButtonInfo[] {
    return this.buttonInfoSubject.getValue();
  }

  set buttonInfos(buttonInfos: LuxAppFooterButtonInfo[]) {
    this.buttonInfoSubject.next(buttonInfos ? buttonInfos : []);
  }

  getButtonInfosAsObservable(): Observable<LuxAppFooterButtonInfo[]> {
    return this.buttonInfoSubject.asObservable();
  }

  ngOnDestroy() {
    this.buttonInfoSubject.complete();
  }

  pushButtonInfos(...value: LuxAppFooterButtonInfo[]) {
    this.buttonInfos = [...this.buttonInfos, ...value];
  }

  getButtonInfoByCMD(cmd: string) {
    return this.buttonInfos.find((buttonInfo: LuxAppFooterButtonInfo) => buttonInfo.cmd === cmd);
  }

  removeButtonInfoAtIndex(i: number) {
    this.buttonInfos = this.buttonInfos.filter((info, index) => index !== i);
  }

  removeButtonInfoByCmd(cmd: string) {
    this.buttonInfos = this.buttonInfos.filter((info) => info.cmd !== cmd);
  }

  clearButtonInfos() {
    this.buttonInfos = [];
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
