import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LuxAppService {
  appEl?: HTMLElement;
  appHeaderEl?: HTMLElement;
  appContentEl?: HTMLElement;
  appFooterEl?: HTMLElement;

  resize$ = new Subject<void>();

  constructor() {}

  getHeaderWidth(): number {
    return this.appHeaderEl ? this.appHeaderEl.getBoundingClientRect().width : 0;
  }

  getHeaderHeight(): number {
    return this.appHeaderEl ? this.appHeaderEl.getBoundingClientRect().height : 0;
  }

  getContentWidth(): number {
    return this.getAppWidth();
  }

  getContentHeight(): number {
    return this.getAppHeight() - this.getHeaderHeight() - this.getFooterHeight();
  }

  getFooterWidth(): number {
    return this.appFooterEl ? this.appFooterEl.getBoundingClientRect().width : 0;
  }

  getFooterHeight(): number {
    return this.appFooterEl ? this.appFooterEl.getBoundingClientRect().height : 0;
  }

  getAppTop(): number {
    return this.appEl ? this.appEl.getBoundingClientRect().top : 0;
  }

  getAppLeft(): number {
    return this.appEl ? this.appEl.getBoundingClientRect().left : 0;
  }

  getAppBottom(): number {
    let bottom = 0;

    if (this.appEl) {
      const boundingBox = this.appEl.getBoundingClientRect();
      bottom = boundingBox.bottom - boundingBox.height;
    }

    return bottom;
  }

  getAppRight(): number {
    let right = 0;

    if (this.appEl) {
      const boundingBox = this.appEl.getBoundingClientRect();
      right = boundingBox.right - boundingBox.width;
    }

    return right;
  }

  getAppHeight(): number {
    return this.appEl ? this.appEl.getBoundingClientRect().height : 0;
  }

  getAppWidth(): number {
    return this.appEl ? this.appEl.getBoundingClientRect().width : 0;
  }

  onResize() {
    this.resize$.next();
  }
}
