import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { LuxAppFooterLinkInfo } from './lux-app-footer-link-info';

@Injectable({
  providedIn: 'root'
})
export class LuxAppFooterLinkService {
  private linkInfoSubject = new BehaviorSubject<LuxAppFooterLinkInfo[]>([]);

  get linkInfos(): LuxAppFooterLinkInfo[] {
    return this.linkInfoSubject.getValue();
  }

  set linkInfos(links: LuxAppFooterLinkInfo[]) {
    this.linkInfoSubject.next(links ? links : []);
  }

  getLinkInfosAsObservable(): Observable<LuxAppFooterLinkInfo[]> {
    return this.linkInfoSubject.asObservable();
  }

  pushLinkInfos(...links: LuxAppFooterLinkInfo[]) {
    this.linkInfos = [...this.linkInfos, ...links];
  }

  removeLinkInfoAtIndex(i: number) {
    this.linkInfos = this.linkInfos.filter((info, index) => index !== i);
  }

  clearLinkInfos() {
    this.linkInfos = [];
  }
}
