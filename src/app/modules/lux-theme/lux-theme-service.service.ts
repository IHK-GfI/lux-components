import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { LuxStorageService } from '../lux-util/lux-storage.service';
import { LuxTheme } from './lux-theme';

@Injectable({
  providedIn: 'root'
})
export class LuxThemeServiceService {
  private readonly storageKeyThemeName = 'lux.app.theme.name';
  private readonly themes: LuxTheme[];
  private theme$: BehaviorSubject<LuxTheme>;

  constructor(private sanitizer: DomSanitizer, private storageService: LuxStorageService) {
    this.themes = [
      { name: 'blue', styleUrl: sanitizer.bypassSecurityTrustResourceUrl('assets/themes/luxtheme-blue-min.css') },
      { name: 'orange', styleUrl: sanitizer.bypassSecurityTrustResourceUrl('assets/themes/luxtheme-orange-min.css') },
      { name: 'green', styleUrl: sanitizer.bypassSecurityTrustResourceUrl('assets/themes/luxtheme-green-min.css') }
    ];

    this.theme$ = new BehaviorSubject<LuxTheme>(this.getSelectedTheme());

    console.debug(`LUX-Theme "${this.getTheme().name}" selected. )`);
  }

  getThemeAsObservable(): Observable<LuxTheme> {
    return this.theme$.asObservable();
  }

  getTheme(): LuxTheme {
    return this.theme$.getValue();
  }

  selectTheme(themeName: string) {
    this.theme$.next(this.themes.find((theme) => theme.name === themeName));
    this.storageService.setItem(this.storageKeyThemeName, themeName, false);
  }

  private getSelectedTheme() {
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
