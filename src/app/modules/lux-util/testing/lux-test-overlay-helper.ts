import { OverlayContainer } from '@angular/cdk/overlay';
import { inject } from '@angular/core/testing';

export class LuxOverlayHelper {
  private overlayContainer!: OverlayContainer;
  private htmlElement!: HTMLElement;

  constructor() {
    inject([OverlayContainer], (oc: OverlayContainer) => {
      this.overlayContainer = oc;
      this.htmlElement = oc.getContainerElement();
    })();
  }

  public selectAllFromOverlay(query: string) {
    return this.htmlElement.querySelectorAll(query) as NodeListOf<HTMLElement>;
  }

  public selectOneFromOverlay(query: string) {
    return this.htmlElement.querySelector(query) as HTMLElement;
  }
}
