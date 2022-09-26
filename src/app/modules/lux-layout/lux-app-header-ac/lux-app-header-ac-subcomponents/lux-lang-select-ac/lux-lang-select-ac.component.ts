import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LuxLocaleAc } from './lux-locale-ac';

@Component({
  selector: 'lux-lang-select-ac',
  templateUrl: './lux-lang-select-ac.component.html',
  styleUrls: ['./lux-lang-select-ac.component.scss']
})
export class LuxLangSelectAcComponent implements OnInit {
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref = '';

  menuOpened = false;

  cookieName = 'X-GFI-LANGUAGE';
  cookiePath = '/';

  allSupportedLocaleArr: LuxLocaleAc[] = [
    { code: 'de', label: 'Deutsch', labelSelected: 'DE', path: '' },
    { code: 'en', label: 'English', labelSelected: 'EN', path: '/en' },
    { code: 'fr', label: 'Français', labelSelected: 'FR', path: '/fr' }
  ];

  localeOptions = [];

  selectedLocale: LuxLocaleAc;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.luxLocaleSupported.forEach((locale) => this.localeOptions.push(this.allSupportedLocaleArr.find((item) => item.code === locale)));

    let locale = this.cookieService.get(this.cookieName);
    if (!locale || !this.allSupportedLocaleArr.find((item) => item.code === locale)) {
      locale = 'de';
    }
    this.selectedLocale = this.allSupportedLocaleArr.find((item) => item.code === locale);

  
  }

  onLocaleChanged(locale: LuxLocaleAc) {
    this.cookieService.set(this.cookieName, locale.code, undefined, this.cookiePath);
    window.location.href = this.generateNewUrl(locale, window.location.href, window.location.origin);
  }

  generateNewUrl(locale: LuxLocaleAc, href: string, origin: string) {
    let result = [origin];

    let segments = href.replace(origin, '').split('/');

    // Leereinträge entfernen
    if (segments && segments.length > 1) {
      segments = segments.filter((item) => item !== '');
    }

    // BaseHref-Segmente entfernen
    if (this.luxLocaleBaseHref) {
      const baseHrefSegments = this.luxLocaleBaseHref.split('/').filter((item) => item !== '');

      //
      let errorFound = false;
      for (let i = 0; i < baseHrefSegments.length; i++) {
        if (segments[i] !== baseHrefSegments[i]) {
          errorFound = true;
          console.error(`The url "${href}" starts not with the configured base href "${this.luxLocaleBaseHref}".`);
          break;
        }
      }

      if (!errorFound) {
        segments = segments.splice(baseHrefSegments.length);
        result.push(...baseHrefSegments);
      }
    }

    // Segment mit der alten Locale entfernen
    if (segments[0] === this.selectedLocale.code) {
      segments = segments.slice(1);
    }

    // Neues Segment der neuen Locale hinzufügen, außer bei "de".
    // "de" wird auf Root abgebildet und benötigt kein Segment.
    if (locale.code !== 'de') {
      result.push(locale.code);
    }

    // Restlichen Segmente wieder hinzufügen.
    result.push(...segments);

    return result.join('/');
  }

  onMenuOpened(){
    console.log("Lang-Menu opened")
    this.menuOpened = true;
  }
  onMenuClosed() {
    console.log("lang-menu-closed")
    this.menuOpened = false;
  }
}
