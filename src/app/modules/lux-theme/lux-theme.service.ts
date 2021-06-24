import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { LuxStorageService } from '../lux-util/lux-storage.service';
import { LuxTheme } from './lux-theme';

@Injectable({
  providedIn: 'root'
})
export class LuxThemeService {
  private readonly storageKeyThemeName = 'lux.app.theme.name';
  private themes: LuxTheme[];
  private theme$: BehaviorSubject<LuxTheme>;

  constructor(private sanitizer: DomSanitizer, private storageService: LuxStorageService) {
    this.themes = [
      { name: 'blue', styleUrl: 'assets/themes/luxtheme-blue-min.css' },
      { name: 'orange', styleUrl: 'assets/themes/luxtheme-orange-min.css' },
      { name: 'green', styleUrl: 'assets/themes/luxtheme-green-min.css' }
    ];

    this.theme$ = new BehaviorSubject<LuxTheme>(this.getInitTheme());
  }

  getThemeAsObservable(): Observable<LuxTheme> {
    return this.theme$.asObservable();
  }

  getTheme(): LuxTheme {
    return this.theme$.getValue();
  }

  setTheme(themeName: string) {
    const newTheme = this.themes.find((theme) => theme.name === themeName);
    this.theme$.next(newTheme);
    this.storageService.setItem(this.storageKeyThemeName, themeName, false);
    this.loadTheme();
  }

  setThemes(themes: LuxTheme[]) {
    this.themes = themes;
  }

  loadTheme() {
    this.loadStyle(this.getTheme().styleUrl).then(() => {
      console.debug(`LUX-Theme "${ this.getTheme().name }" selected.`);
    });
  }

  loadStyle(stylesUrl: string, parent: HTMLElement = document.head) {
    return new Promise<HTMLLinkElement>((resolve, reject) => {
      // Zuerst das alte Theme entfernen
      const links = parent.getElementsByTagName('link');
      if (links) {
        for (let i = 0; i < links.length; i++) {
          let hrefAttr = links[ i ].getAttribute('href');
          if (hrefAttr && hrefAttr.indexOf('luxtheme-') >= 0 && hrefAttr.indexOf('.css') >= 0) {
            parent.removeChild(links[ i ]);
          }
        }
      }

      // Das neue Theme hinzufügen
      const link = document.createElement('link') as HTMLLinkElement;
      link.rel = 'stylesheet';
      link.href = stylesUrl;
      link.onerror = reject;
      link.onload = () => resolve(link);
      parent.appendChild(link);
    });
  }

  private getInitTheme() {
    let theme;

    // Prüfe, ob im Storage ein Themename hinterlegt ist.
    const storedThemeName = this.storageService.getItem(this.storageKeyThemeName);
    if (storedThemeName) {
      const selectedTheme = this.themes.find((currentTheme) => currentTheme.name === storedThemeName);
      if (selectedTheme) {
        theme = selectedTheme;
      }
    }

    // Wenn kein Theme hinterlegt wurde, nimm das erste verfügbare Theme.
    if (!theme) {
      theme = this.themes[0];
    }

    return theme;
  }
}