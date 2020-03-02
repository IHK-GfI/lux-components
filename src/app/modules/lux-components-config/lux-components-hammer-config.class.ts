import { GestureConfig } from '@angular/material/core';
import { Injectable } from '@angular/core';

declare var Hammer: any;

/**
 * Anpassung der HammerGestureConfigs für die LuxComponents.
 *
 * Verhindert durch providen den Bug im Safari, dass kein Scrollen mehr möglich ist.
 */
@Injectable()
export class LuxComponentsHammerConfig extends GestureConfig {
  buildHammer(element: HTMLElement) {
    // Wenn es sich um die MD-Component handelt, vertikales Scrolling
    // zusätzlich zu den Swipe-Gesten aktivieren
    if (element.className.indexOf('lux-master-detail') > -1) {
      return new Hammer(element, { touchAction: 'pan-y' });
    } else {
      // Ansonsten einfach die Hammer-Config von Material übernehmen
      return super.buildHammer(element);
    }
  }
}
