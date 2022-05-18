import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { LuxAppFooterButtonInfo } from "./lux-app-footer-button-info";
import { LuxAppFooterLinkInfo } from './lux-app-footer-link-info';

@Injectable({
  providedIn: 'root'
})
export class LuxAppFooterLinkService {
  private linkInfoSubject = new BehaviorSubject<LuxAppFooterLinkInfo[]>([]);

  get linkInfos(): LuxAppFooterLinkInfo[] {
    return this.linkInfoSubject.getValue();
  }

  set linkInfos(value: LuxAppFooterLinkInfo[]) {
    this.linkInfoSubject.next(value ? value : []);
  }

  getLinkInfosAsObservable(): Observable<LuxAppFooterLinkInfo[]> {
    return this.linkInfoSubject.asObservable();
  }

  pushLinkInfos(...value: LuxAppFooterLinkInfo[]) {
    this.linkInfos = [...this.linkInfos, ...value];
  }

  removeLinkInfoAtIndex(i: number) {
    this.linkInfos = this.linkInfos.filter((info, index) => index !== i);
  }

  clearLinkInfos() {
    this.linkInfos = [];
  }
}
