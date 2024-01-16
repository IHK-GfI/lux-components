import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LuxLocale } from './lux-locale';

@Component({
  selector: 'lux-lang-select',
  templateUrl: './lux-lang-select.component.html'
})
export class LuxLangSelectComponent implements OnInit {
  @Input() luxLocaleSupported = ['de'];
  @Input() luxLocaleBaseHref = '';

  cookieName = 'X-GFI-LANGUAGE';
  cookiePath = '/';

  allSupportedLocaleArr: LuxLocale[] = [
    { code: 'de', label: 'Deutsch', labelSelected: 'DE', path: '' },
    { code: 'en', label: 'English', labelSelected: 'EN', path: '/en' },
    { code: 'fr', label: 'Français', labelSelected: 'FR', path: '/fr' }
  ];

  localeOptions: LuxLocale[] = [];

  selectedLocale = this.allSupportedLocaleArr[0];

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.luxLocaleSupported.forEach((locale) => {
      const foundLocale = this.allSupportedLocaleArr.find((item) => item.code === locale);
      if (foundLocale) {
        this.localeOptions.push(foundLocale);
      }
    });

    let locale = this.cookieService.get(this.cookieName);
    if (!locale || !this.allSupportedLocaleArr.find((item) => item.code === locale)) {
      locale = 'de';
    }
    const newLocale = this.allSupportedLocaleArr.find((item) => item.code === locale);
    if (newLocale) {
      this.selectedLocale = newLocale;
    }
  }

  onLocaleChanged(locale: LuxLocale) {
    this.cookieService.set(this.cookieName, locale.code, undefined, this.cookiePath);
    window.location.href = this.generateNewUrl(locale, window.location.href, window.location.origin);
  }

  generateNewUrl(locale: LuxLocale, href: string, origin: string) {
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
}
